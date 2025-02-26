
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.slots import Slots
from app.models.students import Students

from faker import Faker
from app.models.appointments import Appointments
from app.models.notes import Notes
from app.extensions import db;
from app import create_app

def create_appointment_data(coach_id=1):
    fake = Faker()
    # Assumes coach with id 1 exists in the database
    try:
        # 1. check for any appointments in db
        status_of_fixture = None
        all_appointments = Appointments.query.all()
        if all_appointments:
            # 1.1 if appointments we can make notes for those
            for appointment in all_appointments:
                notes = Notes(
                    appointment_id=appointment.id,
                    rating=1,
                    notes=fake.text(max_nb_chars=250),
                    phone_number=fake.phone_number()[:15],
                )
                db.session.add(notes)
            status_of_fixture = "added 1 note for each existing appointment"
        else:
            # 1.2 if no appointments, we will need to create at least 1  slot and 1 appointment
            slot = Slots(
                coach_id=coach_id,
                date=fake.date_between(start_date='today', end_date='+30d'),
                start_time=fake.time(),
                status="booked"
            )
            student = Students(
                name=fake.name()[:15],
                phone_number=fake.phone_number()[:15],
            )
            db.session.add(slot)
            db.session.add(student)
            db.session.flush()

            appointment = Appointments(
                slot_id=slot.id,
                coach_id=coach_id,
                student_id=student.id,
                phone_number=fake.phone_number()[:15],
                status="booked"
            )
            Notes(
                appointmentId=appointment.id,
                rating=1,
                notes=fake.text(max_nb_chars=250),
                phone_number=fake.phone_number()[:15],
            )
            db.session.add(notes)
            status_of_fixture = "created 1 new slot, 1 new appointment and 1 new note added to the appointment"
        db.session.add(appointment)
        db.session.commit()
        print(f"Successfully {status_of_fixture}")
    except Exception as e:
        db.session.rollback()
        print(f"Error adding appointment test data: {e}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_appointment_data()