import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next/types';

import { UninterceptedApiError } from '@/types/api';
const context = <GetServerSidePropsContext>{};

export const baseURL = process.env.NEXT_PUBLIC_API_URL;
const KEY = process.env.NEXT_PUBLIC_API_KEY;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: false,
});

api.defaults.withCredentials = false;
const isBrowser = typeof window !== 'undefined';

api.interceptors.request.use(function (config) {
  if (config.headers) {
    if (!isBrowser) {
      if (!context)
        throw 'Api Context not found. You must call `setApiContext(context)` before calling api on server-side';
    }

    config.headers.Authorization = `Bearer ${KEY}`;
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (Object.values(error.response.data.message)[0] as any[0]),
          },
        },
      });
    }
    return Promise.reject(error);
  },
);
export default api;
