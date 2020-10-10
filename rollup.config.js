import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'cjs',
        file: 'package/index.cjs.js',
        sourcemap: false
      },
      {
        format: 'es',
        file: 'package/index.es.js',
        sourcemap: false
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
