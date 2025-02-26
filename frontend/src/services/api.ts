import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface SlotPayload {
    coachId: number;
    date: string;
    startTime: string;
    duration: number;
    status: string;
}

interface AppointmentPayload {
    slotId: number;
    coachId: number;
    studentId: number;
}

interface NotePayload {
    appointmentId: number;
    note: string;
    rating: number;
    phone_number: string;
}

export const getCoaches = async () => {
    const response = await axios.get(`${API_URL}/coaches`);
    return response.data;
}

export const getStudents = async () => {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
}

export const getCoachAppointments = async (coachId: number, status?: string) => {
    const response = await axios.get(`${API_URL}/coach/${coachId}/appointments${status ? `?status=${status}` : null}`);
    return response.data;
}

export const getAppointmentNotes = async (appointmentId: number) => {
    const response = await axios.get(`${API_URL}/appointment/${appointmentId}/notes`);
    return response.data;
}

export const postAppointmentNote = async (payload: NotePayload) => {
    const appointmentId = payload.appointmentId;
    const response = await axios.post(`${API_URL}/appointment/${appointmentId}/note`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const getCoachById = async (coachId: number) => {
    const response = await axios.get(`${API_URL}/coach/${coachId}`);
    return response.data;
}

export const getCoachSlotsById = async (coachId: number) => {
    const response = await axios.get(`${API_URL}/coach/${coachId}/slots`)
    return response.data;
}

export const getAllCoachesSlots = async (slotStatus?: string) => {
    const response = await axios.get(`${API_URL}/coaches/slots${slotStatus ? `?${slotStatus}` : ''}`);
    return response.data;
}

export const postNewSlotByCoachId = async (payload: SlotPayload) => {
    const response = await axios.post(
        `${API_URL}/coach/${payload.coachId}/slots`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data;
}

export const deleteSlotById = async (coachId: number, slotId: number) => {
    const response = await axios.delete(
        `${API_URL}/coach/${coachId}/slot/${slotId}`
    )
    return response.data;
}

export const getStudentAppointmentsById = async (studentId: number) => {
    const response = await axios.get(`${API_URL}/student/${studentId}/appointments`);
    return response.data;
}

export const postNewAppointment = async (payload: AppointmentPayload) => {
    const response = await axios.post(
        `${API_URL}/appointment`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data;
}