import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    // settings: {
    //   react: {
    //     version: 'detect'
    //   },
    //   'import/resolver': {
    //     node: {
    //       paths: [path.resolve(__dirname)],
    //       extensions: ['.js', ',jsx', '.tsx', '.ts']
    //     }
    //   }
    // },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      eslintPluginPrettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'eslintPluginPrettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    }
  }
)
