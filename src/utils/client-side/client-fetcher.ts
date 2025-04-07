'use client';

import router from 'next/router';

import { cookieManager } from 'libs/cookie-manager';

import { APIResponse, ErrorResponse, SuccessResponse } from 'types/global';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const defaultOptions: Record<Method, RequestInit> = {
  GET: { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  POST: { method: 'POST', headers: { 'Content-Type': 'application/json' } },
  PUT: { method: 'PUT', headers: { 'Content-Type': 'application/json' } },
  PATCH: { method: 'PATCH', headers: { 'Content-Type': 'application/json' } },
  DELETE: { method: 'DELETE' },
};

// 토큰 재발급
// !TODO 외부 auth-api로 나눌 예정
const refreshToken = async (): Promise<boolean> => {
  try {
    const storedRefreshToken = cookieManager.get('refreshToken');

    if (!storedRefreshToken) {
      router.replace('/login');
      return false;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BFF_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refreshToken: storedRefreshToken }),
    });

    const data = await res.json();

    if (res.ok && data.success && data.data?.accessToken) {
      cookieManager.set('accessToken', data.data.accessToken);
      return true;
    }
  } catch (e) {
    console.error('Token refresh failed:', e);
  }

  return false;
};

/**
 * 인증 관련 에러 핸들러
 * @param method
 * @param url
 * @param options
 * @param responseJson
 * @returns
 */
const handleAuthError = async <T>(
  method: Method,
  url: string,
  options?: RequestInit,
  responseJson?: {
    errorCode?: string;
    status?: number;
    message?: string;
    success?: boolean;
  },
): Promise<APIResponse<T>> => {
  const errorCode = responseJson?.errorCode;

  // 액세스 토큰 만료 -> 재발급
  if (errorCode === 'TOKEN_EXPIRED') {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetcher<T>(method, url, options); // 🔁 accessToken 재발급 후 재요청
    }
  }

  // 리프레시 토큰이 유효하지 않거나 기타 인증 오류
  if (errorCode === 'INVALID_REFRESH_TOKEN' || errorCode === 'UNAUTHORIZED') {
    cookieManager.delete('accessToken');
    cookieManager.delete('refreshToken');
    router.replace('/login');
  }

  return {
    errorCode: errorCode ?? 'UNAUTHORIZED',
    status: responseJson?.status ?? 401,
    message: responseJson?.message ?? '인증 오류',
    success: false,
  } as ErrorResponse;
};

const resolver = async <T>(
  method: Method,
  url: string,
  options: RequestInit,
  response: Response,
): Promise<APIResponse<T>> => {
  const json = (await response.json()) as APIResponse<T>;

  // 에러 핸들링
  if (!response.ok || !json.success) {
    // 인증 에러일 경우
    if (response.status === 401) {
      return handleAuthError<T>(method, url, options, json);
    }

    return {
      errorCode: 'UNKNOWN_ERROR',
      status: response.status,
      message: response.statusText,
      success: false,
    } as ErrorResponse;
  }

  // 정상 응답 반환
  return {
    data: json.data,
    status: json.status,
    message: json.message,
    success: true,
  } as SuccessResponse<T>;
};

const fetcher = async <T>(
  method: Method,
  url: string,
  options?: RequestInit,
): Promise<APIResponse<T>> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;
  const requestUrl = `${BASE_URL}${url}`;

  let accessToken: string | null = null;
  if (typeof window !== 'undefined') {
    accessToken = cookieManager.get('accessToken');
  }

  // 헤더 설정
  const headers: HeadersInit = {
    ...defaultOptions[method].headers,
    ...(options?.headers ?? {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  // 옵션 병합
  const combinedOptions: RequestInit = {
    ...defaultOptions[method],
    ...options,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(requestUrl, combinedOptions);
    return await resolver<T>(method, url, combinedOptions, response);
  } catch (error) {
    return {
      errorCode: 'CLIENT_FETCH_ERROR',
      status: 500,
      message: error instanceof Error ? error.message : 'Client-side Fetching Error',
      success: false,
    } as ErrorResponse;
  }
};

const clientFetcher = {
  get: async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('GET', url, options);
  },

  post: async <T>(url: string, body?: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('POST', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  },

  put: async <T>(url: string, body?: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('PUT', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  },

  patch: async <T>(url: string, body?: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('PATCH', url, {
      ...options,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  },

  delete: async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('DELETE', url, options);
  },
};

export default clientFetcher;
