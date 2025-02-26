from sqlalchemy import CheckConstraint
from sqlalchemy.orm import validates
from ..extensions import db;


class Notes(db.Model):
    __tablename__ = 'notes'
    __table_args__ = (
        CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    )

    id = db.Column(db.Integer, primary_key=True)
    appointment_id = db.Column(db.Integer, db.ForeignKey("appointments.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)

    @validates('rating')
    def validate_rating(self, key, rating):
        if not 1 <= rating <= 5:
            raise ValueError("Rating must be between 1 and 5")
        return rating

    def to_dict(self):
        return {
            'id': self.id,
            'appointment_id': self.appointment_id,
            'rating': self.rating,
            'notes': self.notes,
            'phone_number': self.phone_number,
        }