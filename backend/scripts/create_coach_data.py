
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


from faker import Faker
from app.models.coaches import Coaches
from app.extensions import db;
from app import create_app

def create_coach_data(coach_count=5):
    fake = Faker()

    try:
        for _ in range(coach_count):
            coach = Coaches(
                name=fake.name()[:15],
                phone_number=fake.phone_number()[:15]
            )
            db.session.add(coach)
        db.session.commit()
        print(f"Successfully added {coach_count} test coaches.")
    except Exception as e:
        db.session.rollback()
        print(f"Error adding test data: {e}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_coach_data()