import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCustomFetch = <T>(url: string, dependency: unknown[] = [],) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [err, setErr] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setErr(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependency]);

  return { data, isLoading, err };
};