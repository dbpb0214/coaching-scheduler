import { useState, useEffect } from 'react';
import { getAppointmentNotes } from '../../services/api';
import { Note } from '../types';

interface UseAppointmentNotesReturn {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  setNotes: (slot: Note[]) => void;
}

export const useAppointmentNotes = (appointmentId: number): UseAppointmentNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentNotes = async (appointmentId: number) => {
      if (appointmentId === undefined) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getAppointmentNotes(Number(appointmentId));
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch appointments notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentNotes(appointmentId);
  }, [appointmentId]);

  return { notes, isLoading, error, setNotes };
};