from ..extensions import db;

class Slots(db.Model):
    __tablename__ = 'slots'
    id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'coach_id': self.coach_id,
            'date': self.date.strftime('%Y-%m-%d') if self.date else None,
            'start_time': self.start_time.strftime('%H:%M') if self.start_time else None,
            'status': self.status
        }