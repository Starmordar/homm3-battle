import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['**/node_modules/**', 'legacy/**'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
        },
      ],
    },
  },
  tseslint.configs.recommended,
  prettierPluginRecommended,
]);
