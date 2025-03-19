import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: ['node_modules/'],
    extends: ['next', 'prettier', 'next/core-web-vitals', 'next/typescript', 'eslint:recommended'],
    plugins: ['import'],
    rules: {
      // 상대 경로 사용 금지
      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     patterns: ['.*'],
      //   },
      // ],

      // HTML 엔티티 사용 가능
      'react/no-unescaped-entities': 'off',

      // 페이지 전용 폰트 방지
      '@next/next/no-page-custom-font': 'off',

      // 선언은 했지만 사용되지 않은 변수
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // any 타입 사용 금지
      '@typescript-eslint/no-explicit-any': 'error',

      // 모듈 정렬
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
          pathGroups: [
            {
              pattern: 'react', // React 관련
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next', // Next.js 관련
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'next/font/google', // Next.js 폰트 관련
              group: 'external',
              position: 'after',
            },
            {
              pattern: 'configs/**', // configs 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'hooks/**', // hooks 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'libs/**', // libs 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'services/**', // services 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'stores/**', // stores 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'types/**', // types 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'utils/**', // utils 폴더
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@tanstack/**', // @tanstack 관련 라이브러리
              group: 'internal',
              position: 'after', // 가장 마지막에 배치
            },
            {
              pattern: 'embla-carousel-autoplay', // embla-carousel-autoplay 라이브러리
              group: 'internal',
              position: 'after', // 가장 마지막에 배치
            },
          ],
          pathGroupsExcludedImportTypes: ['@tanstack', 'embla-carousel-autoplay'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
