'use client';

import { ErrorResponse } from 'types/global';

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

const fetcher = async <T>(method: Method, url: string, options?: RequestInit): Promise<T> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;
  const requestUrl = `${BASE_URL}${url}`;

  const combinedOptions: RequestInit = {
    ...defaultOptions[method],
    ...options,
  };

  try {
    const response = await fetch(requestUrl, combinedOptions);
    const json = await response.json();

    if (!response.ok || json.success === false) {
      const error: ErrorResponse = {
        errorCode: json.errorCode ?? 'UNKNOWN_ERROR',
        status: json.status ?? response.status,
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

const clientFetcher = {
  get: <T>(url: string, options?: RequestInit): Promise<T> => fetcher<T>('GET', url, options),

  post: <T>(url: string, body: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('POST', url, {
      ...options,
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('PUT', url, {
      ...options,
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body: unknown, options?: RequestInit): Promise<T> =>
    fetcher<T>('PATCH', url, {
      ...options,
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: RequestInit): Promise<T> => fetcher<T>('DELETE', url, options),
};

export default clientFetcher;
