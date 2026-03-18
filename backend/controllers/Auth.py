
import jwt 
from datetime import timedelta , datetime , timezone
import os
from models.Admin import AdminRegister
import bcrypt

def adminlogin(data): 
    try: 
        useremail = data.get("useremail" , None)
        password = data.get("password" , None)

        if not useremail or not password or useremail.strip() == "" or  password.strip() == "":
             return {"success": False , "error" : "All fields are required!" , "code" : 400}
        
        find_user = AdminRegister.query.filter_by(username = useremail).first()
        if not find_user: 
            return {"success": False , "error" : "Invalid username or password!" , "code" : 403}
        
        encode_pwd = password.encode("utf-8")
        get_hash_password = find_user.password.encode("utf-8")

        check_pwd = bcrypt.checkpw(encode_pwd , get_hash_password)
        if not check_pwd:
             return {"success": False , "error" : "Invalid username or password!" , "code" : 403}


        token = jwt.encode({'admin_session':  useremail, 'exp': datetime.now(timezone.utc) + timedelta(hours=1)},
                           os.getenv("JWT_SECRET"), algorithm="HS256")
        

        
        return {"success" : True, "message" : "Admin login successfull!" , "code": 200 , "token" : token}

    except Exception as e: 
        print(e)
        return {"success": False , "error" : "Internal server error!" , "code" : 500}