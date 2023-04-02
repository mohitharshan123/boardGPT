from django.shortcuts import render
from django.http import StreamingHttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import api_view
from rest_framework_simplejwt.backends import TokenBackend

from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Board, Task, Card, BoardUser
from accounts.models import BoardUser
from cards.models import Board
from .serializers import BoardSerializer, CardSerializer, TaskSerializer

import openai
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

@authentication_classes((JWTAuthentication,))
def stream(request):
    def event_stream():
        try:
            token = request.headers.get('Authorization', '').split(' ')[1]
            valid_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
            user = BoardUser.objects.get(id=valid_data['user_id'])
            openai.api_key = user.openai_secret
            task_id = request.GET.get("task_id")
            card_id = request.GET.get("card_id")
            if not task_id or not card_id:
                raise ValueError("Missing task_id or card_id")
            task = Task.objects.get(id=task_id)
            card = Card.objects.get(id=card_id)
            completion = openai.Completion.create(
                engine="text-davinci-003",
                prompt=task.prompt + " " + card.text,
                stream=True,
                max_tokens=1000,
                temperature=0
            )
            for line in completion:
                yield 'data: %s\n\n' % line.choices[0].text
        except IndexError:
            yield 'data: Authorization header is missing or invalid\n\n'
        except (KeyError, ValueError, TokenBackendError, BoardUser.DoesNotExist, Task.DoesNotExist, Card.DoesNotExist):
            yield 'data: Invalid request parameters\n\n'
        except OpenAIError as e:
            yield 'data: OpenAI API error: %s\n\n' % str(e)
        except Exception as e:
            yield 'data: Internal server error: %s\n\n' % str(e)
            raise

    try:
        response = StreamingHttpResponse(event_stream(), content_type='text/event-stream')
        response['Cache-Control'] = 'no-cache'
        return response
    except Exception as e:
        return HttpResponseServerError(str(e))
