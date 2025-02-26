from ..extensions import db;

class Appointments(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    slot_id = db.Column(db.Integer, db.ForeignKey('slots.id'), nullable=False)
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    status = db.Column(db.String(20), nullable=False) # scheduled / completed
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'slot_id': self.slot_id,
            'coach_id': self.coach_id,
            'student_id': self.student_id,
            'phone_number': self.phone_number,  
            'status': self.status,
        }

    