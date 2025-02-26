import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coach } from '../types';

interface CoachListProps {
  coaches: Coach[];
}

export const CoachList: React.FC<CoachListProps> = ({ coaches }) => {
  const navigate = useNavigate();

  const handleCoachSelection = (coachId: number) => {
    navigate(`/coach/${coachId}`);
  };

  return (
    <div>
      <h1>Coach Calendar</h1>
      <p>Select coach to see calendar</p>
      <ul>
        {coaches.map(coach => (
          <li key={coach.id}>
            <span>{coach.name}</span>
            <button
              onClick={() => handleCoachSelection(coach.id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};