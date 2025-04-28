'use client';

import router from 'next/router';

import { cookieManager } from 'libs/cookie-manager';

import { postRefresh } from 'services/auth/auth-api';

import { ErrorResponse } from 'types/global';

import { errorCode as constantsErrorCode } from 'constants/error-code';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const defaultOptions: Record<Method, RequestInit> = {
  GET: {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  },
  POST: {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  PUT: {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  },
  PATCH: {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  },
  DELETE: {
    method: 'DELETE',
  },
};

const refreshToken = async (): Promise<boolean> => {
  try {
    const response = await postRefresh();

    cookieManager.set('accessToken', response.accessToken);
    cookieManager.set('refreshToken', response.refreshToken);

    return true;
  } catch {
    router.replace('/login');
    return false;
  }
};

const fetcher = async <T>(
  method: Method,
  url: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;
  const requestUrl = `${BASE_URL}${url}`;

  const makeRequest = async (): Promise<Response> => {
    const accessToken = cookieManager.get('accessToken'); // 최신 토큰 사용

    const headers: HeadersInit = {
      ...defaultOptions[method].headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    // ✅ options 안에 있는 오래된 headers는 제외하고 직접 구성
    const combinedOptions: RequestInit = {
      ...defaultOptions[method],
      // ...(options ?? {}), ❌ 기존 headers를 복사하면 안 됨
      body: options?.body, // body는 유지
      headers,
    };

    return fetch(requestUrl, combinedOptions);
  };

  try {
    const response = await makeRequest();
    const json = await response.json();

    if (!response.ok || json.success === false) {
      const errorCode = json.errorCode ?? '';
      const status = json.status ?? response.status;

      if (status === 401 && !isRetry) {
        // 토큰 만료
        if (errorCode === constantsErrorCode.TOKEN_EXPIRED) {
          const refreshed = await refreshToken();

          // 토큰 재발급 성공시 기존 요청 재요청
          if (refreshed) {
            return fetcher<T>(method, url, options, true);
          } else {
            router.replace('/login');
          }
        }
        // 인증 오류 -> 로그인 페이지로 이동
        else if (
          errorCode === constantsErrorCode.UNAUTHORIZED ||
          errorCode === constantsErrorCode.TOKEN_REFRESH_ERROR
        ) {
          router.replace('/login');
          console.log('인증오류');
        }
      }

      const error: ErrorResponse = {
        errorCode: errorCode || 'UNKNOWN_ERROR',
        status,
        message: json.message ?? '알 수 없는 오류가 발생했습니다.',
        success: false,
      };
      throw error;
    }

    return json.data as T;
  } catch (error) {
    if ((error as ErrorResponse).success === false) {
      throw error;
    }

    const fallbackError: ErrorResponse = {
      errorCode: 'CLIENT_FETCH_ERROR',
      status: 500,
      message: error instanceof Error ? error.message : 'Client-side Fetching Error',
      success: false,
    };

    throw fallbackError;
  }
};

// ✅ body가 선택적인 POST/PUT/PATCH 처리
const clientFetcher = {
  get: <T>(url: string, options?: RequestInit): Promise<T> => fetcher<T>('GET', url, options),

  post: <T>(url: string, body?: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('POST', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  put: <T>(url: string, body?: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('PUT', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  patch: <T>(url: string, body?: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('PATCH', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  delete: <T>(url: string, options?: RequestInit): Promise<T> => fetcher<T>('DELETE', url, options),
};

export default clientFetcher;
