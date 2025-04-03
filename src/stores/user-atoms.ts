import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { User } from 'types/auth';

export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
export const refreshTokenAtom = atomWithStorage<string | null>('refreshToken', null);
export const userAtom = atomWithStorage<User | null>('user', null);

export const isLoggedInAtom = atom(get => !!get(accessTokenAtom));
