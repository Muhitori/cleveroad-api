module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
    loggerFn: () => {
      // Override logger function with noop, to avoid unsupported typescript version warnings.
    }
  },
  plugins: ['@typescript-eslint', 'prettier', 'standard', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier-standard/lib/base',
    'plugin:jest/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        printWidth: 80,
        tabWidth: 2,
        parser: 'typescript',
        trailingComma: 'none',
        jsxBracketSameLine: false,
        endOfLine: 'auto',
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-useless-constructor': 'off'
  }
}
