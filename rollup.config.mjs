import { rollup, plugin, config } from '@brixtol/rollup-config';

export default rollup(
  {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'index.js',
      sourcemap: false,
      exports: 'named'
    },
    {
      format: 'es',
      file: 'index.mjs',
      sourcemap: false,
      exports: 'named'
    }
  ],
  external: [ ...config.external, 'path'],
  plugins: [
    plugin.commonjs(),
    plugin.esbuild(),
    plugin.esminify()
  ]
}
);
