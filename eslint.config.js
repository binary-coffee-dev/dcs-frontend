const { defineConfig, globalIgnores } = require('eslint/config');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier');
const jest = require('eslint-plugin-jest');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  globalIgnores([
    '**/dist',
    '**/coverage',
    '**/node_modules',
    '**/tmp',
    '**/polyfills.ts',
    '**/test-setup.ts',
    '**/main.ts',
    '**/environment*.ts',
    '**/jest.config.ts'
  ]),
  {
    files: ['apps/**/*.ts', 'libs/**/*.ts'],

    ignores: ['**/*.spec.ts'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json', 'apps/*/tsconfig.json', 'libs/*/tsconfig.json'],
        createDefaultProgram: true
      }
    },

    plugins: {
      // prettier,
      '@typescript-eslint': tsPlugin
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:import/typescript',
      // 'plugin:prettier/recommended',
      'plugin:@rxlint/recommended',
      'eslint-config-prettier'
    ),

    settings: {
      'import/internal-regex': '^@dcs-libs/'
    },

    rules: {
      // Angular rules
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: '',
          style: 'kebab-case',
          type: 'element'
        }
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: '',
          style: 'camelCase',
          type: 'attribute'
        }
      ],
      '@angular-eslint/prefer-standalone': 'off',

      // Rxjs rules
      '@rxlint/no-nested-subscribe': 'warn',
      '@rxlint/no-subject-unsubscribe': 'off',
      '@rxlint/no-unsafe-takeuntil': 'error',
      '@rxlint/no-ignored-takewhile-value': 'off',
      '@rxlint/no-implicit-any-catch': 'off',
      '@rxlint/prefer-observer': ['error', { allowNext: true }],

      // ESLint rules
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      // 'prettier/prettier': 'error',
      'no-empty': 'off',
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'off', // todo: see how to fix if enable
      'no-constant-condition': 'off', // todo: see how to fix if enable

      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            ['internal', 'parent', 'sibling', 'index'],
            ['object', 'type', 'unknown']
          ],
          pathGroups: [
            {
              pattern: '@angular/**',
              group: 'builtin'
            },
            {
              pattern: '@prod-business-cpoc-ui/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'internal'],
          distinctGroup: false,
          'newlines-between': 'always'
        }
      ],
      'import/no-unresolved': 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-this-alias': 'off', // todo: see how to fix if enable
      '@typescript-eslint/no-unsafe-function-type': 'off'
    }
  },
  {
    files: ['**/*.spec.ts'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.base.json', 'apps/*/tsconfig.spec.json', 'libs/*/tsconfig.spec.json'],
        createDefaultProgram: true
      }
    },
    rules: {
      'jest/no-disabled-tests': 'error',
      'no-unused-vars': 'error'
    }
  },
  {
    files: ['e2e/**/*.ts', 'playwright.*.ts', 'regression-tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.base.json'],
        createDefaultProgram: true
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: compat.extends('plugin:@angular-eslint/template/recommended'),
    rules: {
      '@angular-eslint/template/no-negated-async': 'off'
    }
  }
]);
