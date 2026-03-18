import jwt
import os
from models.Admin import AdminRegister

def check_admin_status(request): 

    token =  request.cookies.get("session")
    
    if not token: 
        return {"success" : False, "error" : "An error occured!" , "code": 403}

    data = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=["HS256"])
    if not data or not data["admin_session"]: 
        return {"success" : False, "error" : "An error occured!" , "code": 403}
            
    check_user = AdminRegister.query.filter_by(username = data["admin_session"]).first()

    if not check_user: 
        return {"success" : False, "error" : "An error occured!" , "code": 403}
        

def check_is_logged_admin(request): 
    try: 
        
        if request.path.startswith("/api/admin") and request.path != "/api/admin/login" and request.path != "/api/admin/getloggedadminstatus": 
           
            check_admin_status(request)

        if  request.path == "/api/admin/login": 

            token =  request.cookies.get("session")

            if token: 
                return {"success": True , "message" : "Admin already loggedin!" , "code" : 200}

    except Ellipsis as e:
        print(e)
        return {"success" : False, "error" : "Internal server error!" , "code": 500}