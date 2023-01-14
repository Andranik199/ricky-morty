module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  'extends': ['plugin:react/recommended', 'google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': ['off'],
    'quote-props': ['error', 'as-needed', { keywords: true }],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-alert': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    camelcase: 'off',
    'new-cap': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'object-curly-spacing': ['error', 'always'],
    'no-return-assign': ['error', 'always'],
    'no-use-before-define': 'error',
    'space-before-blocks': 'error',
  },
};
