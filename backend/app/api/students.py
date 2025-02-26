from app.api import bp
from flask import jsonify
from app.models.students import Students


@bp.route('/students', methods=['GET'])
def get_students():
    try:
        students = Students.query.all()
        return jsonify([student.to_dict() for student in students])
    except Exception as e:
        print(f"Error fetching students: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@bp.route('/student/<int:student_id>', methods=['GET'])
def get_student_by_id(student_id):
    try:
        student = Students.query.filter_by(id=student_id).all()
        return jsonify([student.to_dict() for student in student])
    except Exception as e:
        print(f"Error fetching student: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/student/<int:student_id>/appointments', methods=['GET'])
def get_student_appointments_by_id(student_id):
    try:
        student = Students.query.filter_by(id=student_id).one_or_none()
        if student is None:
            return jsonify([])
        
        appointments = student.appointments.all()
        if appointments is None:
            return jsonify([])
        return jsonify([appt.to_dict() for appt in appointments])
    except Exception as e:
        print(f"Error fetching student appointments: {str(e)}")
        return jsonify({"error": str(e)}), 500
