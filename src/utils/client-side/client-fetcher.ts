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
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status}, Response: ${errorText}`);
  }

  const json = await response.json();

  return {
    data: json,
    status: response.status,
    message: response.statusText || 'Success',
  };
};

const fetcher = async <T>(
  method: Method,
  url: string,
  options?: RequestInit,
): Promise<APIResponse<T>> => {
  const combinedOptions = {
    ...defaultOptions[method],
    ...options,
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;
  const requestUrl = `${BASE_URL}${url}`;

  console.log(`Environment: ${typeof window !== 'undefined' ? 'Client' : 'Server'}`);
  console.log('Request URL:', requestUrl);

  try {
    const response = await fetch(requestUrl, combinedOptions);
    return await resolver<T>(response);
  } catch (error) {
    // 에러 발생 시 APIResponse 형식으로 반환
    throw {
      data: null as T,
      status: 500,
      message: error instanceof Error ? error.message : 'Client-side Fetching Error',
    } as APIResponse<T>;
  }
};

const clientFetcher = {
  get: async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('GET', url, options);
  },
  post: async <T>(url: string, body: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('POST', url, { ...options, body: JSON.stringify(body) });
  },
  put: async <T>(url: string, body: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('PUT', url, { ...options, body: JSON.stringify(body) });
  },
  patch: async <T>(url: string, body: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('PATCH', url, { ...options, body: JSON.stringify(body) });
  },
  delete: async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
    return fetcher<T>('DELETE', url, options);
  },
};

export default clientFetcher;
