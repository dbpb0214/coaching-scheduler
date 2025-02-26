import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


from faker import Faker
from app.models.coaches import Coaches
from app.models.slots import Slots
from app.extensions import db;
from app import create_app

def create_slot_data(slot_count=4):
    fake = Faker()

    try:
        coaches = db.session.query(Coaches).all()
        if coaches:
            for coach in coaches:
                for _ in range(slot_count):
                    slot = Slots(
                        coach_id=coach.id,
                        date=fake.date_between(start_date='today', end_date='+30d'),
                        start_time=fake.time(),
                        status="available"
                    )
                db.session.add(slot)
        db.session.commit()
        print(f"Successfully added {slot_count} test slots for each coach.")
    except Exception as e:
        db.session.rollback()
        print(f"Error adding test data: {e}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_slot_data()