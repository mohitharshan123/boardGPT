
from django.db import models
from accounts.models import BoardUser


class Task(models.Model):
    prompt = models.TextField(max_length=320)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Card(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.TextField(max_length=320)
    completion = models.TextField(null=True, blank=True)
    order = models.IntegerField()

class Board(models.Model):
    created_by = models.ForeignKey(BoardUser, on_delete=models.CASCADE)
    tasks = models.ManyToManyField(Task)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)