// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {
    'ENV': true,
    'process': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'react'
  ],
  // add your custom rules here
  'rules': {
    'linebreak-style': [
      "error",
      "unix"
    ],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': 2,
    'react/jsx-uses-vars': [2],
    'react/jsx-uses-react': 'error'
  }
}
