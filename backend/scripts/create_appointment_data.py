
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.slots import Slots
from app.models.students import Students

from faker import Faker
from app.models.appointments import Appointments
from app.extensions import db;
from app import create_app

def create_appointment_data(appt_count=2, coach_id=1):
    fake = Faker()
    # Assumes coach with id 1 exists in the database
    # - create the booked slots for this coach
    # - create the student that booked these slots
    # - create the appointments for these with student, coach, and slot ids
    try:
        # 1. create booked slots
        slots = []
        for _ in range(appt_count):
            slot = Slots(
                coach_id=coach_id,
                date=fake.date_between(start_date='today', end_date='+30d'),
                start_time=fake.time(),
                status="booked"
            )
            db.session.add(slot)
            slots.append(slot)
        db.session.flush()

        # 2. create student
        student = Students(
            name=fake.name()[:15],
            phone_number=fake.phone_number()[:15],
        )
        db.session.add(student)
        db.session.flush()
        student_id = student.id
        
        # 3. create booked appointments
        for slot in slots:
            appointment = Appointments(
                slot_id=slot.id,
                coach_id=coach_id,
                student_id=student_id,
                phone_number=fake.phone_number()[:15],
                status="booked"
            )
            db.session.add(appointment)
        db.session.commit()
        print(f"Successfully added {appt_count} test appointments for coach id {coach_id} and student id {student_id}.")
    except Exception as e:
        db.session.rollback()
        print(f"Error adding appointment test data: {e}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_appointment_data()