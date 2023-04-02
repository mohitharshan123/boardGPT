
from django.db import models
from accounts.models import BoardUser


class Board(models.Model):
    created_by = models.ForeignKey(BoardUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Task(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    prompt = models.TextField(max_length=320)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Card(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.TextField(max_length=320)
    completion = models.TextField(null=True, blank=True, max_length=800)
    order = models.IntegerField()

