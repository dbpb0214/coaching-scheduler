import { useState, useEffect } from 'react';
import { Student } from '../types';
import { getStudents } from '../../services/api';

interface UseStudentsReturn {
  students: Student[];
  isStudentsLoading: boolean;
  studentError: string | null;
}


export const useStudents = (): UseStudentsReturn => {
  const [students, setstudents] = useState<Student[]>([]);
  const [isStudentsLoading, setIsLoading] = useState(true);
  const [studentError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchstudents = async () => {
      try {
        const data = await getStudents();
        setstudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch students');
      } finally {
        setIsLoading(false);
      }
    };

    fetchstudents();
  }, []);

  return { students, isStudentsLoading, studentError };
};