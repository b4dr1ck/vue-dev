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


def list_files():
    files = os.listdir(UPLOAD_DIR)
    files_info = [
        {"filename": f, "size": os.path.getsize(os.path.join(UPLOAD_DIR, f))}
        for f in files
    ]
    return files_info


def get_total_directory_size(directory):
    """Calculate the total size of all files in the directory."""
    total_size = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            total_size += os.path.getsize(os.path.join(root, file))
    return total_size


# Directory to save uploaded files
UPLOAD_DIR = "/usr/lib/cgi-bin/uploads"
MAX_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_FILETYPE = ["image/png", "image/jpeg", "application/pdf", "text/plain"]
TOTAL_SIZE_LIMIT = 100 * 1024 * 1024  # 100 MB total size limit for all files

# Ensure the upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Read the JSON payload from stdin
content_length = int(os.environ.get("CONTENT_LENGTH", 0))
raw_payload = sys.stdin.read(content_length)

# No payload provided, list all files in UPLOAD_DIR
if content_length == 0:
    print_headers()
    try:
        print(json.dumps({"status": "success", "files": list_files()}))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
    sys.exit(0)

# Parse the JSON payload
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
download = payload.get("download", False)
file_size = payload.get("size", None)
file_type = payload.get("type", None)

if download:
    file_path = os.path.join(UPLOAD_DIR, download)
    if not os.path.exists(file_path):
        print_headers()
        print(
            json.dumps(
                {
                    "status": "error",
                    "message": f"File {download} does not exist.",
                    "files": list_files(),
                }
            )
        )
        sys.exit(1)

    with open(file_path, "rb") as file:
        file_data = file.read()
        encoded_content = base64.b64encode(file_data).decode("utf-8")

    print_headers()
    print(
        json.dumps(
            {
                "status": "success",
                "filename": download,
                "content": f"data:;base64,{encoded_content}",
                "files": list_files(),
            }
        )
    )
    sys.exit(0)

# delete a file if requested
if delete:
    os.remove(os.path.join(UPLOAD_DIR, delete))
    print_headers()
    print(
        json.dumps(
            {
                "status": "success",
                "message": f"File {filename} deleted.",
                "files": list_files(),
            }
        )
    )
    sys.exit(0)

# check file-type
if file_type and file_type not in ALLOWED_FILETYPE:
    print_headers()
    print(
        json.dumps(
            {
                "status": "error",
                "message": f"Unsupported file type: {file_type}",
                "files": list_files(),
            }
        )
    )
    sys.exit(1)

# check file-size
if file_size and file_size > MAX_SIZE:  # 10 MB limit
    print_headers()
    print(
        json.dumps(
            {
                "status": "error",
                "message": f"File size exceeds the 10 {MAX_SIZE} limit.",
                "files": list_files(),
            }
        )
    )
    sys.exit(1)

# Check the total size of files in the directory
current_total_size = get_total_directory_size(UPLOAD_DIR)
if current_total_size + len(file_content) > TOTAL_SIZE_LIMIT:
    print_headers()
    print(
        json.dumps(
            {
                "status": "error",
                "message": f"Total size of files in the upload directory exceeds the limit of {TOTAL_SIZE_LIMIT / (1024 * 1024)} MB",
            }
        )
    )
    sys.exit(1)

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
print(
    json.dumps(
        {
            "status": "success",
            "message": f"File saved as {filename}",
            "files": list_files(),
        }
    )
)
