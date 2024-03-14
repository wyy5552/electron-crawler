
// config eslint for nodejs
module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    // airbnb style guide
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-constant-condition': 'warn',

    // personal preference
    'comma-dangle': ['error', 'only-multiline'],
    'no-else-return': 'error',
    'no-restricted-syntax': 'warn',
    'no-underscore-dangle': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'error',
    'prefer-destructuring': 'error',

    // airbnb style guide
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'consistent-this': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'func-name-matching': 'error',
    'func-names': 'error',
    'func-style': 'error',
    'function-paren-newline': 'error',
    'implicit-arrow-linebreak': 'error',
    'indent': ['error', 2],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': 'error',
    'lines-between-class-members': 'error',
    'max-len': 'error',
    'multiline-ternary': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': 'error',
    'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'error',
    'no-console': 'off'
  }
}
