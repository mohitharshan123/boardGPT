from django.urls import path
from .views import RegisterView, LoginView, UserUpdateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserUpdateView.as_view(), name='login'),
]