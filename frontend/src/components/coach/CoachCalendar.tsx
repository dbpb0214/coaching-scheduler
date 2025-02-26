import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCoachSlots } from './useCoachSlots';
import { AddNewDateForm } from './AddNewSlotForm';
import { Slot } from '../types';
import { deleteSlotById } from '../../services/api';
import { useAppointments } from './useAppointments';
import { useNavigate } from 'react-router-dom';

export const CoachCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { coachId } = useParams<{ coachId: string }>();
  const { slots, setSlots, isLoading, error } = useCoachSlots(coachId);
  const { appointments, setAppointments, isLoadingAppointments, errorAppointments } = useAppointments(coachId, "booked")
  const [ showForm, setShowForm ] = useState(false);
  if (!coachId) return <div>Coach ID not found</div>;
  if (isLoading || isLoadingAppointments) return <div>Loading...</div>
  if (error || errorAppointments) return <div>Error: {error}</div>
  
  const handleNotesSelection = (appointmentId: number) => {
    navigate(`/appointment/${appointmentId}/notes`);
  };

  const showAddNewDateForm = () => {
    setShowForm(!showForm)
  };

  const handleSlotCreated = (newSlot: Slot) => {
    const updatedSlots: Slot[] = [...slots, newSlot];
    setSlots(updatedSlots);
  }

  const removeAvailableSlot = async (slotId: number) => {
    const removeSlotResponse = await deleteSlotById(Number(coachId), slotId)
    const updatedSlots: Slot[] = slots.filter(slot => slot.id !== slotId);
    setSlots(updatedSlots);
  }

  return (
    <div>
      <h1>Coach Calendar</h1>
      <h3>Dates available for booking: </h3>
      <ul>
        {slots.filter(slot => slot.status !== "booked").length > 0 ? (
          <ul>
            {slots.filter(slot => slot.status !== "booked").map(slot => (
              <div key={slot.id}>
                <li>
                  {slot.date}: {slot.status} at {slot.start_time}
                </li>
                <button onClick={() => removeAvailableSlot(slot.id)}>Remove</button>
              </div>
            ))}
          </ul>
        ) : (
          <div>No available appointments at this time.</div>
        )}
      </ul>

      <h3>Appointments scheduled with students:</h3>
      {
        appointments.map(appointment => (
          <div key={appointment.id}>
            Appt id: {appointment.id} scheduled with Student id {appointment.student_id} and phone number {appointment.phone_number}
            <button onClick={() => handleNotesSelection(Number(appointment.id))}>Add Notes</button>
          </div>
        ))
      }

      {!showForm && <button
        onClick={() => showAddNewDateForm()}
      >
        Add new date
      </button>}

        { showForm && 
          (<AddNewDateForm 
              coachId={coachId}
              showForm={showForm}
              setShowForm={setShowForm} 
              onSlotCreated={handleSlotCreated}
          />)
        }

    </div>
  );
};