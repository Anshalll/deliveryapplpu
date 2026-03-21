from models.Admin import Items , Category


def getallitems(): 
    try: 
        get_cats = Category.query.limit(5).all()
        data = []
        for cat in get_cats:
           
            items = Items.query.filter_by(category=cat.id).all()
           
            item_data = [item.to_dict(include_items=True , include_category=True) for item in items]
            
            data.append(item_data)

        return {"success": True, "data": data}

    except Exception as e: 
        print(e)
        return {"success": False , "message": "Failed to fetch top categories and items"}