from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.http import FileResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Request, RequestEvidence
from .serializers import RequestSerializer, RequestEvidenceSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_create_request(request):

    serializer = RequestSerializer(data=request.data)

    if serializer.is_valid():
        req = serializer.save(user=request.user)
        return Response(RequestSerializer(req).data)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_evidence(request, evidence_id):

    evidence = get_object_or_404(RequestEvidence, id=evidence_id)
    req = evidence.request

    if not (
        request.user == req.user or
        request.user == req.assigned_employee
        
    ):
        return Response({"error": "Forbidden"}, status=403)

    response = FileResponse(evidence.file.open(), as_attachment=True)
    return response
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_my_requests(request):

    reqs = Request.objects.filter(user=request.user).order_by('-created_at')

    serializer = RequestSerializer(reqs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_request_detail(request, tracking_number):

    req = get_object_or_404(Request, tracking_number=tracking_number)

    serializer = RequestSerializer(req)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_manager_queue(request):

    reqs = Request.objects.filter(status='pending').order_by('created_at')

    serializer = RequestSerializer(reqs, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_take_request(request, tracking_number):

    req = get_object_or_404(Request, tracking_number=tracking_number)

    if req.assigned_manager is not None:
        return Response({"error": "Already taken"}, status=400)

    req.assigned_manager = request.user
    req.status = 'in_review'
    req.save()

    return Response({"message": "Request assigned"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_update_status(request, tracking_number):

    req = get_object_or_404(Request, tracking_number=tracking_number)

    decision = request.data.get('decision')
    decision_note = request.data.get('decision_note')

    if not decision_note or not decision_note.strip():
        return Response({"error": "decision_note required"}, status=400)

    req.status = 'resolved'
    req.decision = decision
    req.decision_note = decision_note
    req.reviewed_at = timezone.now()
    req.save()

    return Response(RequestSerializer(req).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_upload_evidence(request, tracking_number):

    req = get_object_or_404(Request, tracking_number=tracking_number)

    serializer = RequestEvidenceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(request=req)
        return Response(serializer.data)

    return Response(serializer.errors, status=400)