from sqlalchemy import text
from db.db import db

def check(app): 
    with app.app_context():
        try:
            db.session.execute(text("SELECT 1"))
            print("✅ DB Connected")
        except Exception as e:
            print("❌ DB Connection failed:", e)