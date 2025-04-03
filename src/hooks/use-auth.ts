import { useAtomValue } from 'jotai';

import { accessTokenAtom, isLoggedInAtom, refreshTokenAtom, userAtom } from 'stores/user-atoms';

/**
 * auth 커스텀훅
 */
export function useAuth() {
  const accessToken = useAtomValue(accessTokenAtom);
  const refreshToken = useAtomValue(refreshTokenAtom);
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return {
    isLoggedIn,
    accessToken,
    refreshToken,
    user,
  };
}
