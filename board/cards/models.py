
from django.db import models
from accounts.models import BoardUser

class Card(models.Model):
    user = models.ForeignKey(BoardUser, on_delete=models.CASCADE)
    prompt = models.TextField(max_length=320)
    content = models.TextField()
    completion = models.TextField()