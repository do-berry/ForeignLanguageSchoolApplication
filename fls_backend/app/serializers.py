from rest_framework import serializers
from rest_framework.serializers import Serializer

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
        fields = ('id', 'user', 'name', 'surname', 'mobile_number', 'address')
        extra_kwargs = {'id': {'read_only': True}}

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        person, created = Person.objects.update_or_create(user=user, name=validated_data.pop('name'),
                                                          surname=validated_data.pop('surname'),
                                                          mobile_number=validated_data.pop('mobile_number'),
                                                          address=validated_data.pop('address'))
        return person


class TeacherAssignmentSerializer(Serializer):
    class Meta:
        model = Person
        fields = ('pk',)

    def assignTeacherWithId(self, id):
        p = Person()
        p.pk = id
        return p


# todo
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('name', 'surname',)


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password')
