from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from db.db import db
from urllib.parse import quote_plus 
from db.checkconnection import check
from controllers import Admin

app = Flask(__name__)

load_dotenv()


db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host =  os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{db_user}:{quote_plus(db_password)}@{db_host}:{db_port}/{db_name}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

CORS(app)


@app.route('/', methods=['GET'])
def hello():
    return jsonify(message='Hello, World!')

@app.route("/api/uploaditem", methods=["POST"])
def uploadItem():
    try:
        data = request.get_json()

        resp = Admin.AddItem(data)

        if not resp:
            return jsonify(success=False , error="Unexpected error"), 500

        if resp["success"]:
            return jsonify(success=True, message=resp["message"]), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500
    

if __name__ == '__main__':
    check(app)
    with app.app_context():
        db.create_all()
    app.run( host='0.0.0.0', port=5000 , debug=True)