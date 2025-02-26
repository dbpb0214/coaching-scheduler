import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
}

export const StudentList: React.FC<StudentListProps> = ({ students }) => {
  const navigate = useNavigate();

  const handleStudentSelection = (student_id: number) => {
    navigate(`/student/${student_id}`);
  };

  return (
    <div>
      <h1>Student List</h1>
      <p>Select student to see their appointments</p>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <span className="student-name">{student.name}</span>
            <button
              onClick={() => handleStudentSelection(student.id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};