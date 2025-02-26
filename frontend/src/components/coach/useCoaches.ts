import { useState, useEffect } from 'react';
import { getCoaches } from '../../services/api';
import { Coach } from '../types';

interface UseCoachesReturn {
  coaches: Coach[];
  isCoachesLoading: boolean;
  coachError: string | null;
}

export const useCoaches = (): UseCoachesReturn => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isCoachesLoading, setIsLoading] = useState(true);
  const [coachError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches();
        setCoaches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coaches');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return { coaches, isCoachesLoading, coachError };
};