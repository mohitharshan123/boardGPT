from rest_framework import serializers

from .models import BoardUser
from accounts.models import BoardUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardUser
        fields = ["id", "openai_secret"]


 