import { cookieManager } from 'libs/cookie-manager';

/**
 * 유저 관련 데이터를 제거하는 함수
 * - 로그아웃시 유저 관련 토큰 정보, 스토리지 정보등을 초기화
 */
export const resetUserData = () => {
  // 토큰 관련 쿠키 삭제
  cookieManager.delete('accessToken');
  cookieManager.delete('refreshToken');

  // 유저 정보 삭제
  localStorage.removeItem('user');
};
