import json

from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import User, Person, GroupAssignment, Mark
from app.serializers import UserSerializer, PersonSerializer, GroupAssignmentSerializer, MarkSerializer, \
    PresenceSerializer

APPLICATION_JSON = 'application/json'


@api_view(['POST'])
def create_user(request):
    serializer = PersonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def group_assignment(request):
    serializer = GroupAssignmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(True, status=status.HTTP_201_CREATED)
    else:
        return Response(False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def all_users():
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def user_login(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except ObjectDoesNotExist:
        return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)
    if user.password != request.data['password']:
        return Response("Incorrect password was used", status=status.HTTP_406_NOT_ACCEPTABLE)
    person = Person.objects.filter(user__username=request.data['username'])
    result = {'userId': person[0].user.id, 'user_type': person[0].user.user_type}
    return Response(json.loads(json.dumps(result)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST'])
def find_user_by_surname_and_name(request):
    try:
        if request.data['name'] == '':
            users = Person.objects.filter(Q(surname=request.data['surname']))
        elif request.data['surname'] == '':
            users = Person.objects.filter(Q(name=request.data['name']))
        else:
            users = Person.objects.filter(Q(name=request.data['name']) & Q(surname=request.data['surname']))
        users_to_return = serializers.serialize("json", users)
    except ObjectDoesNotExist:
        return Response("Object does not exist", status=status.HTTP_404_NOT_FOUND)
    return Response(json.loads(users_to_return), status=status.HTTP_200_OK)


@api_view(['POST'])
def check_if_person_is_assigned(request):
    if GroupAssignment.objects.filter(Q(person=request.data['person']) & Q(group=request.data['group'])).exists():
        return Response(True, status=status.HTTP_200_OK)
    else:
        return Response(False, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_type_of_user(request):
    types = User.objects.filter(Q(username=request.data['username']) & Q(password=request.data['password']))
    result = {'user_type': types[0].user_type}
    return Response(json.loads(json.dumps(result)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_person(request):
    Person.objects.filter(id=request.data['id']).update(surname=request.data['surname'],
                                                        name=request.data['name'],
                                                        mobile_number=request.data['mobile_number'],
                                                        address=request.data['address'])
    return Response("updated", content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_user_data(request):
    person = Person.objects.filter(id=request.data['id'])
    result = serializers.serialize('json', person)
    return Response(json.loads(result), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST'])
def groups_assigned_to_user(request):
    groups = GroupAssignment.objects.filter(person_id=request.data['id'])
    result = []
    for group in groups:
        result.append({'room': group.group.room, 'date_hour': str(group.group.date_hour),
                       'date_day': str(group.group.date_day), 'language_name': group.group.language.name,
                       'language_level': group.group.language.level, 'id': group.group.id,
                       'cost': group.group.cost})
    return Response(json.loads(json.dumps(result)), content_type='application/json', status=status.HTTP_200_OK)


@api_view(['POST'])
def create_presence(request):
    serializer = PresenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(True, status=status.HTTP_201_CREATED)
    else:
        return Response(False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_mark(request):
    serializer = MarkSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def get_marks_by_person_and_group(request):
    ga = GroupAssignment.objects.filter(Q(person_id=request.data['person']) & Q(group_id=request.data['group'])).last()
    marks = Mark.objects.filter(Q(group_assignment__group=request.data['group'])
                                & Q(group_assignment__person=request.data['person']))
    result = []
    result = {'person_id': ga.person.id, 'name': ga.person.name, 'surname': ga.person.surname,
              'group_id': ga.group.id, 'marks': []}
    result['marks'] = [{'mark_id': mark.id, 'description': mark.description, 'value': int(mark.value)}
                       for mark in marks]
    return Response(json.loads(json.dumps(result)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_marks_by_group(request):
    marks = Mark.objects.filter(group_assignment__group=request.data['group'])
    persons = []
    for mark in marks:
        if not is_person_id_in_list(mark.group_assignment.person.id, persons):
            persons.append(
                {'person_id': mark.group_assignment.person.id, 'surname': mark.group_assignment.person.surname,
                 'name': mark.group_assignment.person.name, 'group_id': mark.group_assignment.group.id,
                 'marks': []})
    for person in persons:
        person['marks'] = [{'mark_id': mark.id, 'description': mark.description, 'value': int(mark.value)}
                           for mark in marks if mark.group_assignment.person.id == person['person_id']]

    return Response(json.loads(json.dumps(persons)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


def is_person_id_in_list(id, list):
    for i in list:
        if i['person_id'] == id:
            return True
    return False


@api_view(['POST'])
def get_students_by_group_id(request):
    students = GroupAssignment.objects.filter(Q(group_id=request.data['group'])
                                              & Q(person__user__user_type="STUDENT"))
    result = []
    for student in students:
        result.append({'person_id': student.person.id, 'name': student.person.name,
                       'surname': student.person.surname, 'group_assignment': student.pk})
    return Response(json.loads(json.dumps(result)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)
