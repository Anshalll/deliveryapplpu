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

# ===================== CATEGORY ROUTES =====================

@app.route("/api/category", methods=["POST"])
def createCategory():
    """Create a new category"""
    try:
        data = request.get_json()
        resp = Admin.CreateCategory(data)

        if resp["success"]:
            return jsonify(success=True, message=resp["message"], data=resp.get("data")), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500


@app.route("/api/category", methods=["GET"])
def getAllCategories():
    """Get all categories"""
    try:
        resp = Admin.GetAllCategories()

        if resp["success"]:
            return jsonify(success=True, data=resp["data"]), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500


@app.route("/api/getitems" , methods=["POST"])
def getitemsbycategory():
    try: 
        
        data = request.get_json()
        resp  = Admin.getItemWithCategory(data)
        if resp["success"]: 
            return jsonify(success=True, message=resp["message"] , data=resp["data"] ) , resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]
        

    except Exception as e: 
        print(e)
        return jsonify(error="Inernal server error!" , success=False) , 500

@app.route("/api/category/<int:category_id>", methods=["GET"])
def getCategory(category_id):
    """Get a specific category"""
    try:
        resp = Admin.GetCategory(category_id)

        if resp["success"]:
            return jsonify(success=True, data=resp["data"]), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500


@app.route("/api/category/<int:category_id>", methods=["PUT"])
def updateCategory(category_id):
    """Update a category"""
    try:
        data = request.get_json()
        resp = Admin.UpdateCategory(category_id, data)

        if resp["success"]:
            return jsonify(success=True, message=resp["message"], data=resp.get("data")), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500


@app.route("/api/category/<int:category_id>", methods=["DELETE"])
def deleteCategory(category_id):
    """Delete a category"""
    try:
        resp = Admin.DeleteCategory(category_id)

        if resp["success"]:
            return jsonify(success=True, message=resp["message"]), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500

# ===================== ITEM ROUTES =====================

@app.route("/api/items", methods=["GET"])
def getItemsWithCategories():
    """Get all items with their categories"""
    try:
        resp = Admin.GetItemsWithCategories()

        if resp["success"]:
            return jsonify(success=True, data=resp["data"]), resp["code"]
        else:
            return jsonify(success=False, error=resp["error"]), resp["code"]

    except Exception as e:
        print("Route error:", e)
        return jsonify(success=False, error="Internal server error!"), 500


@app.route("/api/uploaditem", methods=["POST"])
def uploadItem():
    try:
        # support multipart/form-data: fields in request.form, files in request.files
        form = request.form
        files = request.files.getlist('images')

        # convert form (ImmutableMultiDict) to a simple dict-like object
        data = form
        print(data)
        print(files)
        resp = Admin.AddItem(data, files)

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