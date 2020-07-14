from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import User
from app.serializers import UserSerializer


@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
