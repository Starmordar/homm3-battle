import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['**/node_modules/**', 'legacy/**'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 100,
        },
      ],
    },
  },
  {
    files: ['sprite-extractor/src/**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: '/sprite-extractor' },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
    },
  },
  {
    files: ['app/src/**/*.{ts,tsx}'],
    extends: [],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: '/app' },
    },
    settings: {
      'import/resolver': { typescript: { project: './app/tsconfig.json' } },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
    },
  },
  tseslint.configs.recommended,
  prettierPluginRecommended,
  importPlugin.flatConfigs.recommended,
]);
