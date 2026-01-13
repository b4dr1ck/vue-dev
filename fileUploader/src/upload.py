#!/usr/bin/python3

import urllib.parse
import json
import os
import sys
import datetime
import base64


def print_headers():
    print(f"Content-Type: application/json")
    print("Access-Control-Allow-Origin: *")
    print("Access-Control-Allow-Methods: GET, POST, OPTIONS")
    print("Access-Control-Allow-Headers: Content-Type")
    print()


# Directory to save uploaded files
UPLOAD_DIR = "/usr/lib/cgi-bin/uploads"

# Ensure the upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Read the JSON payload from stdin
content_length = int(os.environ.get("CONTENT_LENGTH", 0))
if content_length == 0:
    # No payload provided, list all files in UPLOAD_DIR
    print_headers()
    try:
        files = os.listdir(UPLOAD_DIR)
        files_info = [
            {"filename": f, "size": os.path.getsize(os.path.join(UPLOAD_DIR, f))}
            for f in files
        ]
        print(json.dumps({"status": "success", "files": files_info}))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
    sys.exit(0)

raw_payload = sys.stdin.read(content_length)

try:
    payload = json.loads(raw_payload)
except json.JSONDecodeError as e:
    print_headers()
    print(json.dumps({"status": "error", "message": f"Invalid JSON payload: {str(e)}"}))
    sys.exit(1)

# Extract the filename and content
filename = payload.get(
    "filename", "uploaded_file" + datetime.datetime.now().strftime("%Y%m%d%H%M%S")
)
file_content = payload.get("content", "")
delete = payload.get("delete", False)

# delete a file is requested
if delete:
    os.remove(os.path.join(UPLOAD_DIR, delete))
    files = os.listdir(UPLOAD_DIR)
    files_info = [
        {"filename": f, "size": os.path.getsize(os.path.join(UPLOAD_DIR, f))}
        for f in files
    ]

    print_headers()
    print(
        json.dumps(
            {
                "status": "success",
                "message": f"File {filename} deleted.",
                "files": files_info,
            }
        )
    )
    sys.exit(0)


# Decode the content if it's base64-encoded
if file_content.startswith("data:"):
    # Strip the data URL prefix and decode the base64 content
    file_content = file_content.split(",", 1)[1]
    file_content = base64.b64decode(file_content)

# Save the file to the upload directory
file_path = os.path.join(UPLOAD_DIR, filename)
with open(file_path, "wb") as file:
    file.write(file_content)


# Respond with success
print_headers()
files = os.listdir(UPLOAD_DIR)
files_info = [
    {"filename": f, "size": os.path.getsize(os.path.join(UPLOAD_DIR, f))} for f in files
]
print(
    json.dumps(
        {
            "status": "success",
            "message": f"File saved as {filename}",
            "files": files_info,
        }
    )
)
