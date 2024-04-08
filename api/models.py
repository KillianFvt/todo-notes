from account.models import User
from django.db import models


# Create your models here.
class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    title = models.CharField(max_length=50, null=False, default="New note")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.body
