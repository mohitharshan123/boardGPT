from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Board, Task, Card
from accounts.models import BoardUser
from cards.models import Board
from .serializers import BoardSerializer, CardSerializer, TaskSerializer

# Create your views here.


class BoardView(viewsets.ModelViewSet):
    model = Board
    serializer_class = BoardSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Board.objects.filter(created_by=user)
        else:
            return Board.objects.none()

    def get_object(self):
        return self.get_queryset().get(created_by=self.request.user)
       


class TaskCreateView(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskUpdateView(UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CardCreateView(CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardUpdateView(UpdateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer