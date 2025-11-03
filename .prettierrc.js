module.exports = {
  printWidth: 140,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  importOrder: ['<THIRD_PARTY_MODULES>', '', '^@(.*)$', '', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports']
};
