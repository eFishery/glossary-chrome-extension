const { swc, defineRollupSwcOption } = require('rollup-plugin-swc3')
const { copy } = require('@web/rollup-plugin-copy')
const { resolve } = require('path')

module.exports = {
  input: {
    background: resolve(__dirname, './src/background.ts'),
    content: resolve(__dirname, './src/content.ts'),
  },
  output: {
    dir: resolve(__dirname, './dist'),
    format: 'es'
  },
  plugins: [
    copy({
      patterns: '**/*.{ico,png,json}',
      rootDir: resolve(__dirname, './public')
    }),
    swc(defineRollupSwcOption({
      // All options are optional
      include: /\.[jt]sx?$/, // default
      exclude: /node_modules/, // default
      // tsconfig: './tsconfig.json', // default
      // And add your swc configuration here!
      // "filename" will be ignored since it is handled by rollup
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: true,
        },
        target: 'es5'
      }
    }))
  ]
}