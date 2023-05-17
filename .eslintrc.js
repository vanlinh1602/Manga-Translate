module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'unused-imports',
    'react-hooks',
    'prettier'
  ],
  rules: {
    'function-paren-newline': 0,
    'no-empty': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'no-underscore-dangle': ['error', { allow: ['_t', '_id'] }],
    'no-useless-escape': 0,
    'no-restricted-globals': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'object-curly-newline': ['error', { consistent: true }],
    'comma-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/comma-dangle': 0,
    indent: 'off',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/require-default-props': 0,
    'react/jsx-curly-newline': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'warn',
    'react/jsx-one-expression-per-line': 0,
    'react/function-component-definition': 0,
    'react/jsx-wrap-multilines': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-import-module-exports': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0
  }
}