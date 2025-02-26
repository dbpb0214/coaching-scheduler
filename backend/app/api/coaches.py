from app.api import bp
from app.models.coaches import Coaches
from flask import jsonify, request

@bp.route('/coaches', methods=['GET'])
def get_coaches():
    try:
        coaches = Coaches.query.all()
        return jsonify([item.to_dict() for item in coaches])
    except Exception as e:
        print(f"Error fetching coaches: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/coach/<int:coach_id>/appointments', methods=['GET'])
def get_coaches_appointments_by_id(coach_id):
    try:
        coach = Coaches.query.filter_by(id=coach_id).one_or_none()
        if coach is None:
            return jsonify([])
        
        appointments = coach.appointments
        if 'booked' in request.args:
            appointments = [appointment for appointment in appointments if appointment.status == 'booked']
            
        
        return jsonify([appt.to_dict() for appt in appointments])
    except Exception as e:
        print(f"Error fetching coach appointments: {str(e)}")
        return jsonify({"error": str(e)}), 500
