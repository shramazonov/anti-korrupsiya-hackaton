from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from .models import Question
from .serializers import (
    QuestionSerializer,
    CreateQuestionSerializer,
    AnswerSerializer
)

from users.permissions import IsUser, IsManager
from core.responses import error_response, success_response


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsUser])
def api_create_question(request):
    """Create a new question."""
    serializer = CreateQuestionSerializer(data=request.data)

    if serializer.is_valid():
        question = serializer.save(user=request.user)
        return success_response(
            data=QuestionSerializer(question).data,
            message="Question created successfully",
            status_code=201
        )

    return error_response(
        message="Failed to create question",
        status_code=400,
        errors=serializer.errors
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_list_questions(request):
    """List questions based on user role."""
    if request.user.role == 'user':
        qs = Question.objects.filter(user=request.user)

    elif request.user.role == 'manager':
        qs = Question.objects.all()

    else:
        return error_response(
            message="Access forbidden",
            status_code=403
        )

    serializer = QuestionSerializer(qs, many=True)

    return success_response(data=serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManager])
def api_answer_question(request, tracking_number):
    """Answer a question (manager only)."""
    question = get_object_or_404(Question, tracking_number=tracking_number)

    serializer = AnswerSerializer(data=request.data)

    if serializer.is_valid():

        question.answer = serializer.validated_data['answer']
        question.status = 'answered'
        question.save()

        return success_response(
            data=QuestionSerializer(question).data,
            message="Question answered successfully"
        )

    return error_response(
        message="Failed to answer question",
        status_code=400,
        errors=serializer.errors
    )