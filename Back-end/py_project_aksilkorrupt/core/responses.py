from rest_framework.response import Response


def error_response(message, status_code=400, errors=None):
    """
    Standardized error response format.
    
    Args:
        message: Main error message
        status_code: HTTP status code
        errors: Optional dict of field errors (from serializer.errors)
    """
    data = {
        'success': False,
        'message': message,
    }
    
    if errors:
        data['errors'] = errors
    
    return Response(data, status=status_code)


def success_response(data=None, message="Success", status_code=200):
    """
    Standardized success response format.
    
    Args:
        data: Response data (can be None)
        message: Optional success message
        status_code: HTTP status code
    """
    response = {
        'success': True,
        'message': message,
    }
    
    if data is not None:
        response['data'] = data
    
    return Response(response, status=status_code)
