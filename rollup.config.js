import babel from 'rollup-plugin-babel'
import remove from 'rollup-plugin-delete'
import { terser } from 'rollup-plugin-terser'

const options = {
  format: 'umd',
  name: 'VuexStoreModule'
}

export default {
  input: 'src/vuexStoreModule.js',

  output: [
    {
      file: 'dist/vuexStoreModule.js',
      ...options
    },
    {
      file: 'dist/vuexStoreModule.min.js',
      plugins: [terser()],
      sourcemap: true,
      ...options
    }
  ],

  plugins: [
    remove({ targets: 'dist/*' }),
    babel({ exclude: 'node_modules/**' })
  ]
}
