from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from school.models import Group
from school.serializers import GroupSerializer


@api_view(['POST'])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.error_messages, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def all_groups(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data)