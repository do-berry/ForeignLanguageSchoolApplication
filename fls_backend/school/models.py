from django.db import models

from app.models import Person
from school.languages_enums import Languages, LanguageLevel


class Language(models.Model):
    name = models.CharField(max_length=5, choices=[(tag, tag.value) for tag in Languages])
    level = models.CharField(max_length=6, choices=[(tag, tag.value) for tag in LanguageLevel])
    cost = models.FloatField(default=0.0)


class Group(models.Model):
    room = models.IntegerField(default=0)
    date = models.DateTimeField()
    language_id = models.OneToOneField(Language, on_delete=models.CASCADE)
    teacher_id = models.OneToOneField(Person, on_delete=models.CASCADE)
