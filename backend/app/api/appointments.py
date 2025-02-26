from app.api import bp
from flask import jsonify, request
from ..extensions import db
from app.models.coaches import Coaches
from app.models.appointments import Appointments
from app.models.students import Students
from app.models.slots import Slots


@bp.route('/appointment', methods=['POST'])
def post_new_appointment():
    try:
        data = request.get_json()
        required_fields = ['slotId', 'coachId', 'studentId']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        coach = Coaches.query.get(data['coachId'])
        if not coach:
            return jsonify({'error': 'Coach not found'}), 404
        
        student = Students.query.get(data['studentId'])
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        slot = Slots.query.get(data['slotId'])
        if not slot:
            return jsonify({'error': 'Slot not found'}), 404

        if slot.status != 'available':
            return jsonify({'error': 'Slot is not available'}), 400
        
        new_appointment = Appointments(
            slot_id=data['slotId'],
            coach_id=data['coachId'],
            student_id=data['studentId'],
            phone_number=student.phone_number,
            status='booked'
        )

        slot.status = 'booked'

        db.session.add(new_appointment)
        db.session.commit()

        return jsonify(new_appointment.to_dict()), 201
    except Exception as e:
        print(f"Error creating appointment: {str(e)}")
        return jsonify({"error": str(e)}), 500
