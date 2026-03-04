from models.Admin import Items, Category
from db.db import db
from aws.index import upload_file
from utils.index import checkfile
import os
import uuid
import tempfile


# ===================== CATEGORY FUNCTIONS =====================

def CreateCategory(data):
    """Create a new item category"""
    try:
        name = data.get("name")

        if not name or name.strip() == "":
            return {"success": False, "error": "Category name is required", "code": 400}

        name = name.strip()

        
        existing_category = Category.query.filter_by(name=name).first()
        if existing_category:
            return {"success": False, "error": "Category already exists", "code": 400}

        new_category = Category(name=name)
        db.session.add(new_category)
        db.session.commit()

        return {
            "success": True,
            "message": "Category created successfully",
            "data": new_category.to_dict(),
            "code": 201
        }

    except Exception as e:
        print("DB error:", e)
        db.session.rollback()
        return {"success": False, "error": "An error occurred!", "code": 500}


def UpdateCategory(category_id, data):
    """Update an existing category"""
    try:
        category = Category.query.get(category_id)
        
        if not category:
            return {"success": False, "error": "Category not found", "code": 404}

        name = data.get("name")

        if name:
            name = name.strip()
            if name == "":
                return {"success": False, "error": "Category name cannot be empty", "code": 400}
            
            # Check if new name already exists (excluding current category)
            existing_category = Category.query.filter(
                Category.name == name,
                Category.id != category_id
            ).first()
            if existing_category:
                return {"success": False, "error": "Category name already exists", "code": 400}
            
            category.name = name

        db.session.commit()

        return {
            "success": True,
            "message": "Category updated successfully",
            "data": category.to_dict(),
            "code": 200
        }

    except Exception as e:
        print("DB error:", e)
        db.session.rollback()
        return {"success": False, "error": "An error occurred!", "code": 500}


def DeleteCategory(category_id):
    """Delete a category"""
    try:
        category = Category.query.get(category_id)
        
        if not category:
            return {"success": False, "error": "Category not found", "code": 404}

        # Check if category has items
        items_count = Items.query.filter_by(category=category_id).count()
        if items_count > 0:
            return {
                "success": False,
                "error": f"Cannot delete category with {items_count} associated items",
                "code": 400
            }

        db.session.delete(category)
        db.session.commit()

        return {
            "success": True,
            "message": "Category deleted successfully",
            "code": 200
        }

    except Exception as e:
        print("DB error:", e)
        db.session.rollback()
        return {"success": False, "error": "An error occurred!", "code": 500}


def GetAllCategories():
    
    try:
        categories = Category.query.all()
        return {
            "success": True,
            "data": [cat.to_dict() for cat in categories],
            "code": 200
        }
    except Exception as e:
        print("DB error:", e)
        return {"success": False, "error": "An error occurred!", "code": 500}


def GetCategory(category_id):
    
    try:
        category = Category.query.get(category_id)
        
        if not category:
            return {"success": False, "error": "Category not found", "code": 404}

        return {
            "success": True,
            "data": category.to_dict(),
            "code": 200
        }
    except Exception as e:
        print("DB error:", e)
        return {"success": False, "error": "An error occurred!", "code": 500}


# ===================== ITEM FUNCTIONS =====================

def GetItemsWithCategories():
    """Get all items with their category information"""
    try:
        items = Items.query.all()
        items_data = []
        
        for item in items:
            category = Category.query.get(item.category)
            item_dict = {
                "id": item.id,
                "name": item.name,
                "desc": item.desc,
                "price": item.price,
                "quantity": item.quantity,
                "discount": item.discount,
                "status": item.status,
                "uniqueid": item.uniqueid,
                "category": category.to_dict() if category else None,
                "images": item.images if item.images else []
            }
            items_data.append(item_dict)
        
        return {
            "success": True,
            "data": items_data,
            "code": 200
        }
    except Exception as e:
        print("DB error:", e)
        return {"success": False, "error": "An error occurred!", "code": 500}

def AddItem(data, files=None):
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

        if name.strip() == "" or desc.strip() == "" or status.strip() == "":
            return {"success": False, "error": "Fields cannot be empty", "code": 400}

        try:
            price = float(price)
            quant = int(quant)
            category = int(category)
        except:
            return {"success": False, "error": "Invalid numeric values", "code": 400}

        if price <= 0:
            return {"success": False, "error": "Price must be greater than 0", "code": 400}

        category_obj = Category.query.get(category)
        if not category_obj:
            return {"success": False, "error": "Category does not exist", "code": 400}

        if discount and str(discount).strip() == "":
            return {"success": False, "error": "Discount value is empty", "code": 400}

        # process files if provided
        urls = []
        if files:
            bucket = os.getenv("S3_BUCKET_NAME")
            for f in files:
                valid, err = checkfile(f)
                if not valid:
                    return {"success": False, "error": err, "code": 400}
                # rename and save locally
                ext = f.filename.rsplit('.',1)[1].lower()
                newname = f"{uuid.uuid4()}.{ext}"
                tmp_path = os.path.join(tempfile.gettempdir(), newname)
                f.save(tmp_path)
                # upload to s3
                success = upload_file(tmp_path, f"items/{newname}" , f.content_type )
                try:
                    os.remove(tmp_path)
                except Exception:
                    pass
                if not success:
                    return {"success": False, "error": "Failed to upload file", "code": 500}
                
                if bucket:
                    urls.append(f"/items/{newname}")
                else:
                    return {"success" : False, "error" : "Internal server error!" , "code" : 500}

        # create item including image urls
        create_item = Items(
            name=name,
            desc=desc,
            price=price,
            quantity=quant,
            status=status,
            discount=discount if discount else 0,
            category=category,
            images=urls if urls else None
        )

        db.session.add(create_item)
        db.session.commit()

        return {"success": True, "message": "Item added!", "code": 200}

    except Exception as e:
        print("DB error:", e)
        db.session.rollback()
        return {"success": False, "error": "An error occurred!", "code": 500}


    