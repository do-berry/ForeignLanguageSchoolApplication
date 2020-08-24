import json

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
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def all_groups(request):
    groups = Group.objects.all()
    result = []
    for group in groups:
        result.append({'id': group.id, 'room': group.room, 'date_hour': str(group.date_hour),
                       'date_day': str(group.date_day), 'language_name': group.language.name,
                       'language_level': group.language.level, 'language_cost': group.language.cost})
    return Response(json.loads(json.dumps(result)), content_type='application/json', status=status.HTTP_200_OK)

