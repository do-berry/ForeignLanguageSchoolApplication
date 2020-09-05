import json

from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import User, Person, GroupAssignment
from app.serializers import UserSerializer, PersonSerializer, GroupAssignmentSerializer

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
def all_users(request):
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
    person = Person.objects.get(user__username=request.data['username'])
    result = serializers.serialize('json', [person, ])
    return Response(json.loads(result), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


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
    types = User.objects.filter(Q(username=request.data['username']) & Q(password=request.data['password'])) \
        .values_list('is_student', 'is_teacher', 'is_customer_assistant', 'is_admin')
    types_dict = {'student': types[0][0], 'teacher': types[0][1], 'customer_assistant': types[0][2],
                  'admin': types[0][3]}
    tmp = {key: value for key, value in types_dict.items() if value == True}
    return Response(json.loads(json.dumps(tmp)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


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
                       'language_level': group.group.language.level})
    return Response(json.loads(json.dumps(result)), content_type='application/json', status=status.HTTP_200_OK)
