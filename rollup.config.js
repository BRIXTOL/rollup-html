import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: 'package/index.js',
        sourcemap: false,
        exports: 'named'
      },
      {
        format: 'es',
        file: 'package/index.mjs',
        sourcemap: false,
        exports: 'named'

      }
    ],
    plugins: [
      commonjs(),
      terser({
        ecma: 6
        , warnings: 'verbose'
        , compress: { passes: 2 }
      })
    ]
  }
]
