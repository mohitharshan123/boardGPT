# accounts/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class BoardUser(AbstractUser):
    openai_secret = models.CharField(max_length=300, null=True)
