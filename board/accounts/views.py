from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import BoardUser
from cards.models import Board
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserSerializer

class RegisterView(generics.GenericAPIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            try:
                user = BoardUser.objects.create(username=username, password=password)
                Board.objects.create(created_by=user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }, status=status.HTTP_201_CREATED)
            except:
                return Response({'message': 'Unable to create user'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Missing username or password'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):  
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class UserUpdateView(generics.RetrieveUpdateAPIView):
    authentication_classes = [JWTAuthentication]
    serializer_class = UserSerializer

    def get_object(self):
        username = self.request.user.username
        print(self.request.user)
        return get_object_or_404(BoardUser, username=username)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)