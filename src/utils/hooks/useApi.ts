import { useState, useCallback } from 'react';
import { IApiResponse, IErrorResponse } from '../../types/api/posts';

type ApiFunction<T, P extends any[]> = (...params: P) => Promise<IApiResponse<T>>;

export const useApi = <T, P extends any[]>(
  apiFunction: ApiFunction<T, P>,
  initialData: T | null = null
) => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorResponse | null>(null);

  const execute = useCallback(
    async (...params: P): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...params);
        setData(response.data);
        return response.data;
      } catch (err) {
        const error = err as IErrorResponse;
        setError(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
};