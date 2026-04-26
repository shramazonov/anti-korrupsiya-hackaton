from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'question',
            'answer',
            'status',
            'created_at'
        ]
        read_only_fields = [
            'id',
            'answer',
            'status',
            'created_at'
        ]


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question']


class AnswerSerializer(serializers.Serializer):
    answer = serializers.CharField()