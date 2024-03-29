from django.db.models import Q
from rest_framework import serializers, permissions

from app.models import Person, GroupAssignment, Mark, Presence, User
from school.models import Language
from school.serializers import FindGroupSerializer, FindLessonSerializer
from . import models
from django.contrib.auth.hashers import make_password, check_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('username', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     try:
    #         user, created = User.objects.create(username=validated_data['username'],
    #                                                   password=make_password(validated_data['password']),
    #                                                   user_type=validated_data['user_type'])
    #         return user
    #     except Exception as e:
    #         print(e)


class PersonSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    user = UserSerializer(required=False)

    class Meta:
        model = Person
        fields = ('user', 'name', 'surname', 'mobile_number', 'address')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(user_data['password'])
        print(user_data['password'])
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
    permission_classes = (permissions.AllowAny,)
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


class FindGroupAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupAssignment
        fields = ('id',)

    def find(self, validated_data):
        return GroupAssignment.objects.get(id=validated_data['id'])


class FindGroupAssignmentByPersonAndGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupAssignment
        fields = ('person', 'group', )

    def find(self, validated_data):
        return GroupAssignment.objects.filter(Q(person_id=validated_data['person'])
                                              & Q(group_id=validated_data['group'])).first()


class PresenceSerializer(serializers.ModelSerializer):
    group_assignment = FindGroupAssignmentByPersonAndGroupSerializer(required=True)

    class Meta:
        model = Presence
        fields = ('present', 'group_assignment',)

    def create(self, validated_data):
        ga_data = validated_data.pop('group_assignment')
        group_assignment = FindGroupAssignmentByPersonAndGroupSerializer\
            .find(FindGroupAssignmentByPersonAndGroupSerializer(), validated_data=ga_data)
        try:
            Presence.objects.create(present=validated_data.pop('present'),
                                    group_assignment=group_assignment)
            return True
        except Exception:
            print("Exception occurred")


class MarkSerializer(serializers.ModelSerializer):
    teacher = FindPersonSerializer(required=True)
    group_assignment = FindGroupAssignmentByPersonAndGroupSerializer(required=True)
    lesson = FindLessonSerializer(required=True)

    class Meta:
        model = Mark
        fields = ('value', 'description', 'lesson', 'group_assignment', 'teacher',)

    def create(self, validated_data):
        teacher_data = validated_data.pop('teacher')
        teacher = FindPersonSerializer.find(FindPersonSerializer(), validated_data=teacher_data)
        group_assignment_data = validated_data.pop('group_assignment')
        group_assignment = FindGroupAssignmentByPersonAndGroupSerializer\
            .find(FindGroupAssignmentByPersonAndGroupSerializer(),
                                                              validated_data=group_assignment_data)
        lesson_data = validated_data.pop('lesson')
        lesson = FindLessonSerializer.find(FindLessonSerializer(), validated_data=lesson_data)
        mark, created = Mark.objects.update_or_create(value=validated_data.pop('value'),
                                                      description=validated_data.pop('description'),
                                                      lesson=lesson,
                                                      group_assignment=group_assignment,
                                                      teacher=teacher)
        return created
