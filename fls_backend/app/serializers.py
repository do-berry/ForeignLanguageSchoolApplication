from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'is_student', 'is_teacher', 'is_customer_assistant', 'is_admin')
        extra_kwargs = {'password': {'write_only': True}}


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password')
