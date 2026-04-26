import uuid
from django.db import models
from django.conf import settings


class Request(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_review', 'In Review'),
        ('resolved', 'Resolved'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_requests'
    )
    ALLOWED_TRANSITIONS = {
    'pending': ['in_review'],
    'in_review': ['resolved'],
    
}
    asigned_manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_requests'
    )

    title = models.CharField(max_length=255)
    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    tracking_number = models.CharField(
    max_length=20,
    unique=True,
    editable=False
)
    def generate_tracking_number(self):
     return f"REQ-{uuid.uuid4().hex[:8].upper()}"
    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.status}"
    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = self.generate_tracking_number()
        super().save(*args, **kwargs)
class RequestEvidence(models.Model):

    request = models.ForeignKey(
        'Request',
        on_delete=models.CASCADE,
        related_name='evidences'
    )

    file = models.FileField(upload_to='request_evidence/')

    file_type = models.CharField(
        max_length=20,
        choices=[
            ('image', 'Image'),
            ('audio', 'Audio'),
            ('video', 'Video'),
            ('document', 'Document'),
        ]
    )