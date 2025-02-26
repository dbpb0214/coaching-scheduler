from ..extensions import db;

class Coaches(db.Model):
    __tablename__ = 'coaches'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    appointments = db.relationship('Appointments', backref='coach', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number
        }
    

    