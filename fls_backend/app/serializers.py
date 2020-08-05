from rest_framework import serializers

from app.models import Person, GroupAssignment
from school.serializers import GroupSerializer
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'is_student', 'is_teacher', 'is_customer_assistant', 'is_admin')
        extra_kwargs = {'password': {'write_only': True}}


class PersonSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Person
        fields = ('id', 'user', 'name', 'surname', 'mobile_number', 'address')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        person, created = Person.objects.update_or_create(validated_data)
        return person

    def find(self, validated_data):
        return Person.objects.get(id=validated_data['id'])


class GroupAssignmentSerializer(serializers.ModelSerializer):
    person = PersonSerializer()
    group = GroupSerializer()

    class Meta:
        model = models.GroupAssignment
        fields = ('person', 'group',)

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = PersonSerializer.find(PersonSerializer(), person_data)
        group_data = validated_data.pop('group')
        group = GroupSerializer.find(GroupSerializer(), group_data)
        assignment, created = GroupAssignment.objects.update_or_create(person=person,
                                                                       group=group)
        return assignment


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password')
