from rest_framework import serializers, permissions

from school import models
from school.models import Group, Lesson, Note


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Language
        fields = ('name', 'level', )


class GroupSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    language = LanguageSerializer(required=False, read_only=True, many=True, allow_null=True)

    class Meta:
        model = models.Group
        fields = ('room', 'date_hour', 'date_day', 'language', 'cost', )

    def create(self, validated_data):
        language_data = validated_data.pop('language')
        language = LanguageSerializer.create(LanguageSerializer(), validated_data=language_data)
        group, created = Group.objects.update_or_create(room=validated_data.pop('room'),
                                                        date_hour=validated_data.pop('date_hour'),
                                                        date_day=validated_data.pop('date_day'),
                                                        language=language,
                                                        cost=validated_data.pop('cost'))
        return group


class FindGroupSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Group
        fields = ('id',)

    def find(self, validated_data):
        return Group.objects.get(id=validated_data['id'])


class LessonSerializer(serializers.ModelSerializer):
    group = FindGroupSerializer(required=True)

    class Meta:
        model = models.Lesson
        fields = ('date', 'group')

    def create(self, validated_data):
        group_data = validated_data.pop('group')
        group = FindGroupSerializer.find(FindGroupSerializer(), group_data)
        lesson, created = Lesson.objects.update_or_create(date=validated_data.pop('date'),
                                                          group=group)
        return lesson

class FindLessonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Lesson
        fields = ('id',)

    def find(self, validated_data):
        return Lesson.objects.get(id=validated_data['id'])


class NoteSerializer(serializers.ModelSerializer):
    lesson = FindLessonSerializer(required=True)

    class Meta:
        model = Note
        fields = ('topic', 'description', 'lesson')

    def create(self, validated_data):
        lesson_data = validated_data.pop('lesson')
        lesson = FindLessonSerializer.find(FindLessonSerializer(), lesson_data)
        note, created = Note.objects.update_or_create(topic=validated_data.pop('topic'),
                                                      description=validated_data.pop('description'),
                                                      lesson=lesson)
        return note
