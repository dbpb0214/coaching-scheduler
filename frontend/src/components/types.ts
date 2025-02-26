export interface Coach {
    id: number;
    name: string;
    phone_number: string;
  }

export interface Slot {
  id: number;
  coach_id: number;
  date: string;
  start_time: string;
  status: 'available' | 'booked'
}

export interface Appointment {
  id: number;
  slot_id: number;
  coach_id: number;
  student_id: number;
  phone_number: string;
  status: string;
}

export interface Student {
  id: number;
  name: string;
  phone_number: string;
}

export interface Note {
  id: number;
  appointment_id: number;
  rating: number;
  notes: string;
}