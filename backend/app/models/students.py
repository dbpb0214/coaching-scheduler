from ..extensions import db;

class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    appointments = db.relationship('Appointments', backref='student', lazy='dynamic')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number
        }
    

    