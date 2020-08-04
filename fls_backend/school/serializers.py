from rest_framework import serializers

from app.serializers import TeacherAssignmentSerializer
from school import models
from school.models import Group


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Language
        fields = ('name', 'level', 'cost')


class GroupSerializer(serializers.ModelSerializer):
    language = LanguageSerializer(required=True)
    teacher = TeacherAssignmentSerializer(required=True)

    class Meta:
        model = models.Group
        fields = ('room', 'date_hour', 'date_day', 'language', 'teacher')

    def create(self, validated_data):
        language_data = validated_data.pop('language')
        language = LanguageSerializer.create(LanguageSerializer(), validated_data=language_data)
        teacher_data = validated_data.pop('teacher')
        teacher = TeacherAssignmentSerializer.assignTeacherWithId(TeacherAssignmentSerializer(), id=teacher_data['id'])
        group, created = Group.objects.update_or_create(room=validated_data.pop('room'),
                                                        date_hour=validated_data.pop('date_hour'),
                                                        date_day=validated_data.pop('date_day'),
                                                        language=language,
                                                        teacher=teacher)
        return group
