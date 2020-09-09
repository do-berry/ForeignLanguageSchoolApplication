from django.db import models

from school.languages_enums import LanguageName, LanguageLevel, Day


class Language(models.Model):
    name = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in LanguageName])
    level = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in LanguageLevel])
    cost = models.FloatField(default=0.0)


class Group(models.Model):
    room = models.IntegerField(default=0)
    date_hour = models.TimeField(auto_now=False, auto_now_add=False, default="00:00:00")
    date_day = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in Day], default=Day.D1)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)


class Lesson(models.Model):
    date = models.DateField(auto_now=False)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class Note(models.Model):
    topic = models.TextField(default='')
    description = models.TextField(default='')
    created = models.DateTimeField(auto_now=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
