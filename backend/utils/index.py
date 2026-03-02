import os

def checkfile(file):
    """Validate a Werkzeug FileStorage object.

    Returns a tuple (is_valid, error_message) where is_valid is False if
    the file fails any check (extension or size) and error_message describes
    the problem.
    """
    # extension check
    filename = file.filename or ""
    if "." not in filename:
        return False, "Invalid file name"
    ext = filename.rsplit('.', 1)[1].lower()
    if ext not in ["jpg", "jpeg", "png"]:
        return False, f"Unsupported file type {ext}"

    # size check
    try:
        file.stream.seek(0, os.SEEK_END)
        size = file.stream.tell()
        file.stream.seek(0)
        if size > 5 * 1024 * 1024:
            return False, "File too large (max 5MB)"
    except Exception:
        # if we can't determine size, skip size check
        pass

    return True, None