'use client';

import router from 'next/router';

import { cookieManager } from 'libs/cookie-manager';

import { APIResponse } from 'types/global';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const defaultOptions: Record<Method, RequestInit> = {
  GET: { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  POST: { method: 'POST', headers: { 'Content-Type': 'application/json' } },
  PUT: { method: 'PUT', headers: { 'Content-Type': 'application/json' } },
  PATCH: { method: 'PATCH', headers: { 'Content-Type': 'application/json' } },
  DELETE: { method: 'DELETE' },
};

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

  // 토큰 만료
  if (errorCode === 'TOKEN_EXPIRED') {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetcher<T>(method, url, options); // 재시도
    }
  }

  // 유효하지 않은 리프레시 토큰 -> 재로그인 필요
  if (errorCode === 'INVALID_REFRESH_TOKEN') {
    cookieManager.delete('accessToken');
    cookieManager.delete('refreshToken');

    router.replace('/login');
  }

  return {
    errorCode: errorCode ?? 'UNAUTHORIZED',
    status: responseJson?.status ?? 401,
    message: responseJson?.message ?? '인증 오류',
    success: false,
  };
};

const resolver = async <T>(
  method: Method,
  url: string,
  options: RequestInit,
  response: Response,
): Promise<APIResponse<T>> => {
  const json = await response.json();

  if (!response.ok || !json.success) {
    if (response.status === 401) {
      return handleAuthError<T>(method, url, options, json);
    }

    return {
      errorCode: json?.errorCode ?? 'UNKNOWN_ERROR',
      status: json?.status ?? response.status,
      message: json?.message ?? response.statusText,
      success: false,
    };
  }

  return {
    data: json.data,
    status: json.status,
    message: json.message,
    success: true,
  };
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

  const headers: HeadersInit = {
    ...defaultOptions[method].headers,
    ...(options?.headers ?? {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

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
    };
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
