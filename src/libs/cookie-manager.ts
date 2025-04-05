/**
 * 클라이언트 측 쿠키 유틸리티
 * - set: 쿠키 설정
 * - get: 쿠키 읽기
 * - delete: 쿠키 삭제
 */

type CookieOptions = {
  expires?: number; // 초 단위
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

export const cookieManager = {
  /**
   * 쿠키 설정
   */
  set: (name: string, value: string, options: CookieOptions = {}) => {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const d = new Date();
      d.setTime(d.getTime() + options.expires * 1000); // 초 → 밀리초
      cookieStr += `; expires=${d.toUTCString()}`;
    }

    cookieStr += `; path=${options.path ?? '/'}`;

    if (options.secure) {
      cookieStr += '; Secure';
    }

    if (options.sameSite) {
      cookieStr += `; SameSite=${options.sameSite}`;
    }

    document.cookie = cookieStr;
  },

  /**
   * 쿠키 가져오기
   */
  get: (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(^| )${encodeURIComponent(name)}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  },

  /**
   * 쿠키 삭제
   */
  delete: (name: string, path: string = '/') => {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=${path}`;
  },
};
