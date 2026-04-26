import uuid

from django.db import models
from django.conf import settings


class Question(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    question = models.TextField()
    tracking_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )
    def generate_tracking_number(self):
        return f"QST-{uuid.uuid4().hex[:8].upper()}"


    def save(self, *args, **kwargs):
        if not self.tracking_number:
            self.tracking_number = self.generate_tracking_number()
        super().save(*args, **kwargs)

    answer = models.TextField(null=True, blank=True)

    status = models.CharField(max_length=20, default='open')

    created_at = models.DateTimeField(auto_now_add=True)