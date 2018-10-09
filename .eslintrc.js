// 0 - turn the rule off
// 1 - show warning
// 2 - show error

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'standard',
  globals: {
      window : true,
      log : true
  },
  rules: {
    "no-new": 0
    //"indent": [0, 4]
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ]
}
