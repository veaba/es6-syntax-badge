import { defineConfig } from 'tsdown'

export default defineConfig({

  format: ['cjs'],
  unbundle: false,
  exports: false,
  sourcemap: true,
  external: ['reactive-vscode', 'vscode'],
  outExtensions: () => {
    return {
      js: '.js',
    }
  },
},
)
