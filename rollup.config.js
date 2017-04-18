import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  plugins: [ buble() ]
}
