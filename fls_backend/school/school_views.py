import datetime
import json
import sys

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core import serializers

from app.app_views import APPLICATION_JSON
from school.models import Group, Note, Lesson
from school.serializers import GroupSerializer, LessonSerializer, NoteSerializer


@api_view(['POST'])
def create_group(request):
    try:
        serializer = GroupSerializer(data=request.data)
    except AttributeError:
        print(sys.exc_info()[0])
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
                       'language_level': group.language.level, 'cost': group.cost})
    return Response(json.loads(json.dumps(result)), content_type='application/json', status=status.HTTP_200_OK)


@api_view(['POST'])
def create_lesson(request):
    serializer = LessonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def update_lesson(request):
    Lesson.objects.filter(group__id=request.data['group']['id']).update(date=request.data['date'])
    return Response(True, content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST', 'PUT'])
def create_or_update_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def all_lesson(request):
    lessons = Lesson.objects.filter(group__id=request.data['group'])
    result = []
    for lesson in lessons:
        result.append({'id': lesson.id, 'date': str(lesson.date)})
    return Response(json.loads(json.dumps(result)), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_note_by_lesson_id(request):
    note = Note.objects.filter(lesson=request.data['id'])
    result = serializers.serialize('json', note)
    return Response(json.loads(result), content_type=APPLICATION_JSON, status=status.HTTP_200_OK)