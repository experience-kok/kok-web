import { atomWithStorage } from 'jotai/utils';

import { User } from 'types/auth';

// localStorage에 저장될 키
const STORAGE_KEY = {
  USER: 'user',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// 유저 정보 atom
export const userAtom = atomWithStorage<User | null>(STORAGE_KEY.USER, null);

// 토큰 atom
export const accessTokenAtom = atomWithStorage<string | null>(STORAGE_KEY.ACCESS_TOKEN, null);
export const refreshTokenAtom = atomWithStorage<string | null>(STORAGE_KEY.REFRESH_TOKEN, null);
