import type { Badge } from '../constants'

interface ArrayConfig {
  isStaticMethod: boolean
  isInstanceMethod: boolean
  description: string
  badge: Badge
  /**
   * 使用实例
   */
  example: string
  /**
   * @desc mdn 链接
   */
  mdn: string
}

export const arrayFromMethod: ArrayConfig = {
  isStaticMethod: true,
  isInstanceMethod: false,
  description: '静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。',
  badge: 'ES6',
  example: 'Array.from(document.querySelectorAll(\'p\'))',
  mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from',
}

export const arrayOfMethod: ArrayConfig = {
  isStaticMethod: true,
  isInstanceMethod: false,
  description: '将一组值转为数组',
  badge: 'ES6',
  example: 'Array.of(1, 2, 3)',
  mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of',
}

export const es6ArrayKeywords: string[] = ['Array.from', 'Array.of']

export const es6Array: Readonly<Record<string, ArrayConfig>> = {
  'Array.from': arrayFromMethod,
  'Array.of': arrayOfMethod,
}
