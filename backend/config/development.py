import os
from config.base import BaseConfig


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    def __init__(self):
        super().__init__()
        self.SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
        self.ENV = os.getenv("FLASK_ENV")