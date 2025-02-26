from app.api import bp
from flask import jsonify, request
from ..extensions import db

from app.models.notes import Notes
from app.models.appointments import Appointments

@bp.route('/appointment/<int:appointmentId>/notes', methods=['GET'])
def get_appointment_notes(appointmentId):
    try:
        appointment = Appointments.query.filter_by(id=appointmentId).one()
        print("appointment: ", appointment)
        if appointment is None:
            return jsonify({"error": "Appointment not found"}), 404
        
        notes = Notes.query.filter_by(appointment_id=appointmentId).all()
        return jsonify([note.to_dict() for note in notes])
    
    except Exception as e:
        print(f"Error fetching appointment notes: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@bp.route('/appointment/<int:appointmentId>/note', methods=['POST'])
def post_appointment_note(appointmentId):
    try:
        data = request.get_json()
        required_fields = ['appointmentId', 'note', 'rating', 'phone_number']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        appointment = Appointments.query.filter_by(id=appointmentId).one()
        if appointment is None:
            return jsonify({"error": "Appointment not found"}), 404
        
        new_note = Notes(
            appointment_id=appointmentId,
            rating=data['rating'],
            notes=data['note'],
            phone_number=data['phone_number']
        )
        db.session.add(new_note)
        db.session.commit()

        return jsonify(new_note.to_dict(), 201)
    except Exception as e:
        print(f"Error fetching appointment notes: {str(e)}")
        return jsonify({"error": str(e)}), 500