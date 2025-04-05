'use client';

import { APIResponse } from 'types/global';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const defaultOptions: Record<Method, RequestInit> = {
  GET: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  POST: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  PUT: {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  PATCH: {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  DELETE: {
    method: 'DELETE',
  },
};

const resolver = async <T>(response: Response): Promise<APIResponse<T>> => {
  const json = await response.json();

  if (!response.ok || !json.success) {
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

  // 브라우저 환경에서 accessToken을 로드
  let accessToken: string | null = null;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken')?.replace(/"/g, '') ?? null;
  }

  console.log(`Bearer ${accessToken}`);
  // 기본 헤더 + Authorization 헤더 병합
  const headers: HeadersInit = {
    ...defaultOptions[method].headers,
    ...(options?.headers ?? {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const combinedOptions: RequestInit = {
    ...defaultOptions[method],
    ...options,
    headers,
  };

  // console.log(`Environment: ${typeof window !== 'undefined' ? 'Client' : 'Server'}`);
  // console.log('Request URL:', requestUrl);
  // console.log('AccessToken:', accessToken);

  try {
    const response = await fetch(requestUrl, combinedOptions);
    return await resolver<T>(response);
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
