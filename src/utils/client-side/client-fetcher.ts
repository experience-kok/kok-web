'use client';

import router from 'next/router';
import { toast } from 'sonner';

import { cookieManager } from 'libs/cookie-manager';

import { postRefresh } from 'services/auth/auth-api';

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
    const response = await postRefresh();

    if (response.success && response.data?.accessToken) {
      cookieManager.set('accessToken', response.data.accessToken);
      cookieManager.set('refreshToken', response.data.refreshToken);
      return true;
    }

    return false;
  } catch (e) {
    router.replace('/login');

    toast.error('인증이 만료되어 로그인 페이지로 이동했어요.');
    return false;
  }
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
  console.log('s');

  // 액세스 토큰 만료 -> 재발급
  if (errorCode === 'TOKEN_EXPIRED') {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetcher<T>(method, url, options);
    }
  }

  // 리프레시 토큰이 유효하지 않거나 기타 인증 오류
  if (errorCode === 'INVALID_REFRESH_TOKEN' || errorCode === 'UNAUTHORIZED') {
    cookieManager.delete('accessToken');
    cookieManager.delete('refreshToken');
    router.replace('/login');

    toast.error('인증이 만료되어 로그인 페이지로 이동했어요.');
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
  // 먼저 상태 코드 체크
  if (response.status === 401) {
    const json = (await response.json()) as APIResponse<T>;
    return handleAuthError<T>(method, url, options, json);
  }

  const json = (await response.json()) as APIResponse<T>;

  // 에러 핸들링
  if (!response.ok || !json.success) {
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
