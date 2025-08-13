import type { DecorationOptions, TextDocument } from 'vscode'
import { defineExtension } from 'reactive-vscode'
import { MarkdownString, OverviewRulerLane, Range, window, workspace } from 'vscode'
import { es6Array, es6ArrayKeywords } from './es6/array'

// 根据关键字获取不同颜色
function getKeywordColor(keyword: string) {
  const colors: Record<string, string> = {
    map: '#FFD700', // 金色
    filter: '#87CEFA', // 浅蓝色
    reduce: '#98FB98', // 浅绿色
    find: '#FFA07A', // 浅橙色
    some: '#EE82EE', // 紫色
    every: '#FF6347', // 番茄色
  }
  return colors[keyword] || '#FFD700' // 默认金色
}

const { activate, deactivate } = defineExtension((ctx) => {
  // 创建装饰类型
  const decorationType = window.createTextEditorDecorationType({
    gutterIconPath: ctx.asAbsolutePath('icons/es6-badge.svg'),
    gutterIconSize: 'contain',
    overviewRulerLane: OverviewRulerLane.Right,
    overviewRulerColor: 'rgba(255,165,0,0.5)',
    after: {
      contentText: 'ES6',
      margin: '0 4px 2 4px',
      color: '#000000',
      backgroundColor: '#FFD700',
      fontWeight: 'bold',
      height: '1.2em',
    },
  })

  // 更新装饰的函数
  const updateDecorations = (document: TextDocument) => {
    const editor = window.activeTextEditor
    if (!editor || editor.document !== document)
      return

    const decorations: DecorationOptions[] = []
    const text = document.getText()

    es6ArrayKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')

      while (true) {
        const match = regex.exec(text)
        if (match === null) {
          break
        }
        const startPos = document.positionAt(match.index)
        // const endPos = document.positionAt(match.index + match[0].length)
        // 扩展范围以包含后面的空格，这样悬浮提示会覆盖整个区域
        const extendedEndPos = document.positionAt(match.index + match[0].length + 1)
        // const range = new Range(startPos, endPos)
        const extendedRange = new Range(startPos, extendedEndPos)

        // 创建详细的悬浮提示
        const hoverMessage = new MarkdownString()
        hoverMessage.appendMarkdown(`### ${keyword} (ES6方法)\n`)
        hoverMessage.appendMarkdown(`**描述**: ${es6Array[keyword].description}\n\n`)

        // 添加语法示例
        if (es6Array[keyword].example) {
          hoverMessage.appendMarkdown('**示例**:\n')
          hoverMessage.appendCodeblock(es6Array[keyword].example, 'javascript')
        }

        // 添加MDN文档链接
        if (es6Array[keyword].mdn) {
          hoverMessage.appendMarkdown(`[查看MDN文档](${es6Array[keyword].mdn})`)
        }

        hoverMessage.isTrusted = true

        decorations.push({
          range: extendedRange, // 使用扩展后的范围
          hoverMessage, // 悬浮提示设置在扩展范围上
          renderOptions: {
            after: {
              contentText: 'ES6',
              backgroundColor: getKeywordColor(keyword),
            },
          },
        })
      }
    })

    editor.setDecorations(decorationType, decorations)
  }

  // 监听文档变化
  const disposable1 = workspace.onDidChangeTextDocument((event) => {
    if (event.document) {
      updateDecorations(event.document)
    }
  })

  // 初始化当前活动文档的装饰
  if (window.activeTextEditor) {
    updateDecorations(window.activeTextEditor.document)
  }

  // 监听活动编辑器变化
  const disposable2 = window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateDecorations(editor.document)
    }
  })

  // 返回清理函数
  return () => {
    disposable1.dispose()
    disposable2.dispose()
    decorationType.dispose()
  }
})

export { activate, deactivate }