from rest_framework import serializers

from app.models import Person
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'is_student', 'is_teacher', 'is_customer_assistant', 'is_admin')
        extra_kwargs = {'password': {'write_only': True}}


class PersonSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Person
        fields = ('user', 'name', 'surname', 'mobile_number', 'address')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        person, created = Person.objects.update_or_create(user=user, name=validated_data.pop('name'),
                                                          surname=validated_data.pop('surname'),
                                                          mobile_number=validated_data.pop('mobile_number'),
                                                          address=validated_data.pop('address'))
        return person


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password')
