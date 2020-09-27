from rest_framework import serializers, permissions

from app.models import Person, GroupAssignment
from school.models import Language
from school.serializers import GroupSerializer, FindGroupSerializer
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}


class PersonSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    user = UserSerializer(required=False)

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


class FindPersonByNameAndSurname(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'surname')


class FindPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id',)

    def find(self, validated_data):
        return Person.objects.get(id=validated_data['id'])


class FindLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id',)

    def find(self, validated_data):
        return Language.objects.get(id=validated_data['id'])


class GroupAssignmentSerializer(serializers.ModelSerializer):
    person = FindPersonSerializer()
    group = FindGroupSerializer()

    class Meta:
        model = models.GroupAssignment
        fields = ('person', 'group',)

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = FindPersonSerializer.find(FindPersonSerializer(), person_data)
        group_data = validated_data.pop('group')
        group = FindGroupSerializer.find(FindGroupSerializer(), group_data)
        assignment, created = GroupAssignment.objects.update_or_create(person=person,
                                                                       group=group)
        return assignment.person.name


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password')
