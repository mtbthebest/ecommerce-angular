from flask import Flask, render_template
from flask_cors import CORS
from config import Config

cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.jinja_env.auto_reload = True
    cors.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app