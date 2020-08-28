module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content', 'include', 'if', 'each'] }],
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*'],
};
