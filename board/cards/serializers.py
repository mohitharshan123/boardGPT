from rest_framework import serializers

from .models import Board, Card, Task
from accounts.models import BoardUser


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'completion', 'text', 'task', 'order']


class TaskSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, source="card_set")

    class Meta:
        model = Task
        fields = ['id', 'prompt','cards']


class BoardSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=BoardUser.objects.all())

    class Meta:
        model = Board
        fields = ['id', 'tasks', 'created_by']

 