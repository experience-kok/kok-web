'use client';

import { APIResponse } from 'types/global';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const fetcher = async <T>(
  method: Method,
  url: string,
  options?: RequestInit,
): Promise<APIResponse<T>> => {};
