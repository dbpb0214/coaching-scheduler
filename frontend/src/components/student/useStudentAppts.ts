import { useEffect, useState } from "react";
import { Appointment } from "../types";
import { getStudentAppointmentsById } from "../../services/api";

interface UseStudentApptReturn {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  setAppointments: (slot: Appointment[]) => void;
}

export const useStudentAppts = (student_id: string | undefined): UseStudentApptReturn => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentApptsById = async (student_id: string | undefined) => {

      if (student_id === undefined) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getStudentAppointmentsById(Number(student_id));
        setAppointments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch coach Appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentApptsById(student_id);
  }, [student_id]);

  return { appointments, isLoading, error, setAppointments };
};