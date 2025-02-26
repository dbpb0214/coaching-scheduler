from datetime import datetime, timedelta
from app.api import bp
from app.models.slots import Slots
from app.models.coaches import Coaches
from flask import jsonify, request
from ..extensions import db;


@bp.route('/coaches/slots', methods=['GET'])
def get_coaches_slots():
    try:
        if 'available' in request.args:
            slots = Slots.query.filter_by(status='available').all()
        else:
            slots = Slots.query.all()
        return jsonify([slot.to_dict() for slot in slots])
    except Exception as e:
        print(f"Error fetching all slots: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/coach/<int:coach_id>/slots', methods=['GET'])
def get_coach_slots_by_id(coach_id):
    try:
        slots = Slots.query.filter_by(coach_id=coach_id).all()
        return jsonify([slot.to_dict() for slot in slots])
    except Exception as e:
        print(f"Error fetching slots: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/coach/<int:coach_id>/slot/<int:slot_id>', methods=['DELETE'])
def delete_coach_slot_by_id(coach_id, slot_id):
    try:
        coach = Coaches.query.get(coach_id)
        if not coach:
            return jsonify({'error': 'Coach not found'}), 404
        
        existing_slot = Slots.query.get(slot_id)

        db.session.delete(existing_slot)
        db.session.commit()

        return jsonify({"message": "Slot deleted successfully"})
    except Exception as e:
        print(f"Error deleting slot: {str(e)}")
        return jsonify({"error": str(e)}), 500


@bp.route('/coach/<int:coach_id>/slots', methods=['POST'])
def post_coach_slots_by_id(coach_id):
    try:
        data = request.get_json()
        required_fields = ['coachId', 'date', 'startTime', 'status']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        coach = Coaches.query.get(coach_id)
        if not coach:
            return jsonify({'error': 'Coach not found'}), 404
        
        new_slot = Slots(
            coach_id=coach_id,
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            start_time=datetime.strptime(data['startTime'], '%H:%M').time(),
            status=data['status']
        )

        existing_slots = Slots.query.filter_by(
            coach_id=coach_id,
            date=new_slot.date
        ).all()

        for slot in existing_slots:
            new_slot_end = (datetime.combine(new_slot.date, new_slot.start_time) + 
                          timedelta(minutes=120))
            existing_slot_end = (datetime.combine(slot.date, slot.start_time) + 
                               timedelta(minutes=120))
            
            if (new_slot.start_time < existing_slot_end.time() and 
                new_slot_end.time() > slot.start_time):
                return jsonify({
                    'error': 'Time slot overlaps with existing appointment'
                }), 409
            
        db.session.add(new_slot)
        db.session.commit()

        return jsonify(new_slot.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': f'Invalid date/time format: {str(e)}'}), 400
    except Exception as e:
        print(f"Error creating slot: {str(e)}")
        return jsonify({"error": str(e)}), 500
