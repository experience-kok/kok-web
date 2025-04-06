import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { User } from 'types/auth';

export const userAtom = atomWithStorage<User | null>('user', null);

export const isLoggedInAtom = atom(() => {
  if (typeof document === 'undefined') return false;

  const cookies = document.cookie.split(';');
  const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  return !!accessTokenCookie;
});
