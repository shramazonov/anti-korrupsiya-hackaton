from rest_framework import serializers
from .models import Request, RequestEvidence


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = [
            'id',
            'title',
            'description',
            'status',
            'assigned_manager',
            'created_at',
            'updated_at'
        ]
        read_only_fields = [
            'id',
            'status',
            'assigned_manager',
            'created_at',
            'updated_at'
        ]


class CreateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['title', 'description']

class RequestEvidenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = RequestEvidence
        fields = ['id', 'file', 'file_type', 'uploaded_at']

class ManagerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = [
            'id',
            'title',
            'description',
            'status',
            'created_at'
        ]


class TakeRequestSerializer(serializers.Serializer):
    request_id = serializers.IntegerField()


class UpdateStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['pending', 'in_review', 'resolved'])