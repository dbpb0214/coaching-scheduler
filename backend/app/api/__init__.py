from flask import Blueprint

bp = Blueprint('api', __name__, url_prefix='/api')

from app.api import coaches, slots, students, appointments, notes  # Import routes after creating blueprint