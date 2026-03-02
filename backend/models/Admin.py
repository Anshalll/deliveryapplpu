from db.db import db
import uuid

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    
    # Relationship to items
    items = db.relationship('Items', backref='category_ref', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class Items(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True , autoincrement=True)
    name = db.Column(db.String(255) , nullable=False)
    desc = db.Column(db.String(255) , nullable=False)
    price = db.Column(db.String(255) , nullable=False)
    quantity = db.Column(db.String(255) , nullable=False)
    discount = db.Column(db.String(255) , nullable=False)
    status = db.Column(db.String(255) , nullable=False)
    category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    uniqueid = db.Column(db.String(255) , nullable=False  ,  default=lambda: str(uuid.uuid4()))
    images = db.Column(db.JSON, nullable=True)  # store list of image URLs

    def to_dict(self , include_items=False , include_category=False): 
        data = {
                "name" : self.name,
                "desc": self.desc,
                "price": self.price,
                "status": self.status,
                "category": self.category,
                "uniqueid": self.uniqueid,
                "quantity": self.quantity,
                "discount": self.discount,
                "images": self.images if self.images else []
            }
        if include_items: 
            

            return data
        
        if include_category:
            data["category"] = self.category
    