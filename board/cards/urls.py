from django.urls import path
from .views import (BoardView, TaskCreateView, CardCreateView, 
                    TaskUpdateView, CardUpdateView, stream
)

urlpatterns = [
    path('boards/', BoardView.as_view({'get': 'list'}), name='board'),
    path('board/', BoardView.as_view({'get': 'retrieve'}), name='board-detail'),
    path('task/', TaskCreateView.as_view(), name='task-create'),
    path('card/', CardCreateView.as_view(), name='card-create'),
    path('task/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('card/<int:pk>/', CardUpdateView.as_view(), name='card-update'),
    path('stream/', stream, name="chat-response")
]