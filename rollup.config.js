import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import globals from 'rollup-plugin-node-globals'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
// import serve from 'rollup-plugin-serve'
import uglify from 'rollup-plugin-uglify'

import cssnano from 'cssnano'
import cssnext from 'postcss-cssnext'
import nested from 'postcss-nested'
import simplevars from 'postcss-simple-vars'

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    commonjs(),
    globals(),
    buble({ target: { node: 4 } }),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
      ],
      extensions: [ '.css' ],
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers' ],
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    (process.argv.indexOf('--live') !== -1 && livereload('./dist')),
  ],
}
