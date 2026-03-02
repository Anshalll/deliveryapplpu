import logging
import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

load_dotenv()

BUCKET=os.getenv("S3_BUCKET_NAME")

def upload_file(file_name, object_name=None):

    if object_name is None:
        object_name = os.path.basename(file_name)
        print(object_name)

    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, BUCKET, object_name)
        print(response)

    except ClientError as e:
        logging.error(e)
        return False
    return True