import { useState, useEffect } from 'react';
import { getCoachSlotsById } from '../../services/api';
import { Slot } from '../types';

interface UseCoachSlotReturn {
  slots: Slot[];
  isLoading: boolean;
  error: string | null;
  setSlots: (slot: Slot[]) => void;
}

export const useCoachSlots = (coach_id: string | undefined): UseCoachSlotReturn => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoachSlotsById = async (coach_id: string | undefined) => {

      if (coach_id === undefined) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getCoachSlotsById(Number(coach_id));
        setSlots(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coach slots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoachSlotsById(coach_id);
  }, [coach_id]);

  return { slots, isLoading, error, setSlots };
};