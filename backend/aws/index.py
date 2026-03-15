import logging
import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

load_dotenv()

BUCKET=os.getenv("S3_BUCKET_NAME")

def upload_file(file_name, object_name=None , contentT = None):

    if object_name is None:
        object_name = os.path.basename(file_name)
        

    s3_client = boto3.client('s3')
    content_type = contentT
    try:
        response = s3_client.upload_file(file_name, BUCKET, object_name , 

                ExtraArgs={
                    "ContentType": content_type
                }                             

        )
        print(response)

    except ClientError as e:
        logging.error(e)
        return False
    return True


def delete_file(object_name):
    """Delete a file from S3 bucket.
    
    Args:
        object_name: The S3 object key/path to delete (e.g., '/items/filename.jpg')
    
    Returns:
        True if successful, False otherwise
    """
    if not object_name:
        return False
    
    s3_client = boto3.client('s3')
    try:
        # Remove leading slash if present
        key = object_name.lstrip('/')
        s3_client.delete_object(Bucket=BUCKET, Key=key)
        print(f"Deleted {key} from S3")
        return True
    except ClientError as e:
        logging.error(f"Error deleting file from S3: {e}")
        return False