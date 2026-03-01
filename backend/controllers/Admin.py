from models.Admin import Items
from db.db import db

def AddItem(data):
    try:
        name = data.get("name")
        desc = data.get("desc")
        price = data.get("price")
        quant = data.get("quantity")
        category = data.get("category")
        status = data.get("status")
        discount = data.get("discount")

        if not name or not desc or not price or not quant or not category or not status:
            return {"success": False, "error": "Missing required fields", "code": 400}

        if name.strip() == "" or desc.strip() == "" or category.strip() == "" or status.strip() == "":
            return {"success": False, "error": "Fields cannot be empty", "code": 400}

        try:
            price = float(price)
            quant = int(quant)
        except:
            return {"success": False, "error": "Invalid numeric values", "code": 400}

        if price <= 0:
            return {"success": False, "error": "Price must be greater than 0", "code": 400}

        if discount and str(discount).strip() == "":
            return {"success": False, "error": "Discount value is empty", "code": 400}

        create_item = Items(
            name=name,
            desc=desc,
            price=price,
            quantity=quant,
            status=status,
            discount=0,
            category=1
        )

        db.session.add(create_item)
        db.session.commit()

        return {"success": True, "message": "Item added!", "code": 200}

    except Exception as e:
        print("DB error:", e)
        db.session.rollback()
        return {"success": False, "error": "An error occurred!", "code": 500}


    