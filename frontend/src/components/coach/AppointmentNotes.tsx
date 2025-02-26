import React, { useState } from 'react';
import { useAppointmentNotes } from './useAppointmentNotes';
import { useParams } from 'react-router-dom';
import { postAppointmentNote } from '../../services/api';

interface AppointmentNoteProps {
  appointmentId?: number;
}

export const AppointmentNotes: React.FC<AppointmentNoteProps> = (props) => {
    const { appointmentId: urlAppointmentId } = useParams();
    const appointmentId = parseInt(urlAppointmentId || '0', 10);
    const [newNoteText, setNewNoteText] = useState<string>('');
    const [newNoteRating, setNewNoteRating] = useState<number>(0)
    const [newNotePhoneNumber, setNewNotePhoneNumber] = useState<string>('')

    const { notes, setNotes, isLoading, error } = useAppointmentNotes(appointmentId);

    const handleAddNote = async () => {
        if (!newNoteText.trim()) return;
        
        try {
            const response = await postAppointmentNote({appointmentId, note: newNoteText, rating: newNoteRating, phone_number: newNotePhoneNumber});
            const updatedNotes = [...notes, response[0]];
            setNotes(updatedNotes);
        
        } catch (err) {
            console.error('Failed to add note:', err);
        }
        
        setNewNoteText('');
        setNewNoteRating(0);
        setNewNotePhoneNumber('')
    }

    return (
        <div>
            <h1>Notes for Appointment Id: {appointmentId} </h1>
            <ul>
                { notes.length > 0 ? notes.map((note, idx) => (
                <li key={note.id}>
                    Note {idx + 1}: {note.notes} - Rating: {note.rating}
                </li>
                )): <div>No notes found</div>}
            </ul>
            <h2>Add New Note</h2>
            <div>
                <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter a new note"
                />
                <div>
                    <label htmlFor="new-note-rating">Rating (1-5): </label>
                    <select 
                        id="new-note-rating"
                        value={newNoteRating}
                        onChange={(e) => setNewNoteRating(Number(e.target.value))}
                    >
                        <option value="0">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="phone-number">Phone number</label>
                    <input
                        id="phone-number"
                        name="phone-number"
                        type="phone-number"
                        value={newNotePhoneNumber}
                        onChange={(e) => setNewNotePhoneNumber(e.target.value)}
                        placeholder="Enter a phone number"
                        required
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                </div>
                <button 
                    onClick={handleAddNote}
                    disabled={!newNoteText.trim()}
                >
                    Add Note
                </button>
            </div>
        </div>
    );
};