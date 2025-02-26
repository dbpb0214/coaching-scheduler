import React, { useState } from 'react';
import { postNewSlotByCoachId } from '../../services/api';

interface AddNewSlotFormProps {
  coachId: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onSlotCreated: (newSlot: any) => void;
  onSuccess?: () => void;
}

interface FormData {
  date: string;
  startTime: string;
}

export const AddNewDateForm: React.FC<AddNewSlotFormProps> = ({ 
  coachId,
  setShowForm,
  onSuccess,
  onSlotCreated,
}) => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    startTime: '',
  });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic validation
    if (!formData.date || !formData.startTime) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(`${formData.date}T${formData.startTime}`);
    if (selectedDate < new Date()) {
      setError('Cannot schedule slots in the past');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        coachId: Number(coachId),
        date: formData.date,
        startTime: formData.startTime,
        duration: 120,
        status: 'available'
      }
      const newSlotResponse = await postNewSlotByCoachId(payload)
      onSlotCreated(newSlotResponse);
      setShowForm(false)
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred when submitting new slot for coach');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Available Slot</h2>
      
      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div>
        <label htmlFor="startTime">Start Time</label>
        <input
          id="startTime"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <p>Duration 2 hours</p>
      </div>

      <div>
        <button 
          type="button" 
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Slot'}
        </button>
      </div>
    </form>
  );
};