import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { User } from 'types/auth';

export const userAtom = atomWithStorage<User | null>('user', null);

export const isLoggedInAtom = atom(get => {
  const user = get(userAtom);
  return !!user; // user 객체가 있으면 로그인 상태
});
