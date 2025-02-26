import { useState, useEffect } from 'react';
import { getCoachAppointments } from '../../services/api';
import { Appointment } from '../types';

interface UseAppointmentsReturn {
  appointments: Appointment[];
  isLoadingAppointments: boolean;
  errorAppointments: string | null;
  setAppointments: (slot: Appointment[]) => void;
}

export const useAppointments = (coach_id: string | undefined, status: string): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async (coach_id: string | undefined, status: string) => {

      if (coach_id === undefined) {
        setIsLoadingAppointments(false);
        return;
      }

      try {
        const data = await getCoachAppointments(Number(coach_id), status);
        setAppointments(data);
      } catch (err) {
        setErrorAppointments(err instanceof Error ? err.message : 'Failed to fetch coach appointments');
      } finally {
        setIsLoadingAppointments(false);
      }
    };

    fetchAppointments(coach_id, status);
  }, [coach_id]);

  return { appointments, isLoadingAppointments, errorAppointments, setAppointments };
};