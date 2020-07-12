from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'
