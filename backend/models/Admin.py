from db.db import db
import uuid

class Items(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True , autoincrement=True)
    name = db.Column(db.String(255) , nullable=False)
    desc = db.Column(db.String(255) , nullable=False)
    price = db.Column(db.String(255) , nullable=False)
    quantity = db.Column(db.String(255) , nullable=False)
    discount = db.Column(db.String(255) , nullable=False)
    status = db.Column(db.String(255) , nullable=False)
    category = db.Column(db.Integer , nullable=False)
    uniqueid = db.Column(db.String(255) , nullable=False  ,  default=lambda: str(uuid.uuid4()))


    def to_dict(self , include_items=False): 
        if include_items: 
            data = {
                "name" : self.name,
                "desc": self.desc,
                "price": self.price,
                "status": self.status,
                "category": self.category,
                "uniqueid": self.uniqueid,
                "quantity": self.quantity,
                "discount": self.discount
                

            }
    
            return data
     
    