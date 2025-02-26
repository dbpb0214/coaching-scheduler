import { useParams } from "react-router-dom";
import { useStudentAppts } from "./useStudentAppts";
import { useState } from "react";
import { useAllCoachSlots } from "../coach/useAllCoachesSlots";
import { postNewAppointment } from "../../services/api";

interface BookSlotParams {
  slotId: number;
  coachId: number;
  studentId: number;
}

export const StudentAppointments: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const { appointments, setAppointments, isLoading, error } = useStudentAppts(studentId);
    const { allSlots , setAllSlots, isLoadingAllSlots, errorAllSlots } = useAllCoachSlots("available");
    const [ showForm, setShowForm ] = useState(false);
    if (!studentId) return <div>Student ID not found</div>;
    if (isLoading || isLoadingAllSlots) return <div>Loading...</div>
    if (error || errorAllSlots) return <div>Error: {error}</div>
    
    const showAddNewDateForm = () => {
      setShowForm(!showForm)
    };

    const bookSlotForStudent = async ({ slotId, coachId, studentId }: BookSlotParams) => {
      const addNewAppointmentResponse = await postNewAppointment({slotId, coachId, studentId})
      setAppointments([...appointments, addNewAppointmentResponse])
      const updatedSlots = allSlots.filter(slot => slot.id !== slotId);
      setAllSlots(updatedSlots);
    }
  
    return (
      <div>
        <h1>Student {studentId} Appointments</h1>
        <ul>
          { appointments.length > 0 ? appointments.map( appt => (
            <div>
              <li key={appt.id}>
                Appointment {appt.id}: Student Id - {appt.student_id} with Coach Id - {appt.coach_id} and phone {appt.phone_number}
              </li>

            </div>
          )) : <div>No appointments scheduled for student {studentId} at this time.</div> }
        </ul>
  
        {!showForm && <button
          onClick={() => showAddNewDateForm()}
        >
          See Available Coach Slots
        </button>}
  
          { showForm && 
            <ul>
              {
                allSlots.length > 0 ?
                allSlots.map(slot => (
                  <li key={slot.id}>
                    Open slot: {slot.date} at {slot.start_time} with Coach Id - {slot.coach_id}
                    <button onClick={() => bookSlotForStudent({slotId: slot.id, coachId: slot.coach_id, studentId: Number(studentId)})}>Book Appointment</button>
                  </li>
                )) : <div>No slots available with any coaches at this time.</div>
              }
            </ul>
          }
  
      </div>
    );
  };