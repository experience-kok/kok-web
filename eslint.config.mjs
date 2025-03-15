import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: ['node_modules/'],
    extends: ['next', 'prettier', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',

      // 선언은 했지만 사용되지 않은 변수
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }),
];

export default eslintConfig;
