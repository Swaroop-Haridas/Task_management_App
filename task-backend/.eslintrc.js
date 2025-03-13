module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off', // Disable Prettier errors
    '@typescript-eslint/no-unused-vars': 'off', // Disable unused variables errors
  },
};
