from dotenv import load_dotenv
from flask import Flask
from app.extensions import db
from config.development import DevelopmentConfig
from app.api import bp


from app.models.appointments import Appointments
from app.models.coaches import Coaches
from app.models.notes import Notes
from app.models.slots import Slots
from app.models.students import Students

def create_app(config_class=DevelopmentConfig):
    load_dotenv()

    app = Flask(__name__)
    app.register_blueprint(bp)
    app.config.from_object(config_class())

    db.init_app(app)

    if app.config['ENV'] == 'development':
        with app.app_context():
            db.create_all()

    return app
