import { useState, useEffect } from 'react';
import { getAllCoachesSlots } from '../../services/api';
import { Slot } from '../types';

interface UseAllCoachSlotReturn {
  allSlots: Slot[];
  isLoadingAllSlots: boolean;
  errorAllSlots: string | null;
  setAllSlots: (slot: Slot[]) => void;
}

export const useAllCoachSlots = (status: string = ''): UseAllCoachSlotReturn => {
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [isLoadingAllSlots, setIsLoadingAllSlots] = useState(true);
  const [errorAllSlots, setErrorSlots] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCoachSlots = async (status: string = '') => {

      try {
        const data = await getAllCoachesSlots(status);
        setAllSlots(data);
      } catch (err) {
        setErrorSlots(err instanceof Error ? err.message : 'Failed to fetch all coach slots');
      } finally {
        setIsLoadingAllSlots(false);
      }
    };

    fetchAllCoachSlots(status);
  }, [status]);

  return { allSlots, isLoadingAllSlots, errorAllSlots, setAllSlots };
};