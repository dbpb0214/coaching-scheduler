import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { CoachList } from './components/coach/CoachList';
import { CoachCalendar } from './components/coach/CoachCalendar';
import { useCoaches } from './components/coach/useCoaches';
import { useStudents } from './components/student/useStudents';
import { StudentList } from './components/student/StudentList';
import { StudentAppointments } from './components/student/StudentAppointments';
import { useNavigate } from 'react-router-dom';
import { AppointmentNotes } from './components/coach/AppointmentNotes';


const App: React.FC = () => {
  const navigate = useNavigate();
  const { coaches, isCoachesLoading, coachError } = useCoaches();
  const { students, isStudentsLoading, studentError } = useStudents(); 
  const [ currentView, setCurrentView ] = React.useState<string>('coaches')
  if (isCoachesLoading || isStudentsLoading) return <div>Loading...</div>
  if (coachError || studentError) return <div>Coach error: {coachError}. Student Error: {studentError}</div>
  
  const handleViewSelection = () => {
    const newView = currentView === 'coaches' ? 'students' : 'coaches';
    setCurrentView(newView);
    navigate(`/${newView}`);
  };

  return (
      <div className="App">
        <button
        onClick={() => handleViewSelection()}
      >
        View {currentView === 'coaches' ? 'Students' : 'Coaches'}
      </button>
        <Routes>
          <Route path="/" element={<CoachList coaches={coaches} />} />
          <Route path="/coaches" element={<CoachList coaches={coaches} />} />
          <Route path="/students" element={<StudentList students={students}/>} />
          <Route path="/student/:studentId" element={<StudentAppointments/>}/>
          <Route path="/coach/:coachId" element={<CoachCalendar/>} />
          <Route path="/appointment/:appointmentId/notes" element={<AppointmentNotes/>} />
        </Routes>
      </div>
  )

}

export default App;
