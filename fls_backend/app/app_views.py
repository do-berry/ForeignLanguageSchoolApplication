from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import User, Person
from app.serializers import UserSerializer, PersonSerializer, GroupAssignmentSerializer


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
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
    return Response("OK", status=status.HTTP_200_OK)


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
    return Response(users_to_return, content_type="text/json-comment-filtered", status=status.HTTP_200_OK)
