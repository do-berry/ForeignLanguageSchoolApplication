from django.db import models

from school.languages_enums import Language, LanguageLevel, Day


class Language(models.Model):
    name = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in Language])
    level = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in LanguageLevel])
    cost = models.FloatField(default=0.0)


# student id in app.models <- does it have to be changed??
# teacher id will be changed in the future
class Group(models.Model):
    room = models.IntegerField(default=0)
    date_hour = models.TimeField(auto_now=False, auto_now_add=False, default="00:00:00")
    date_day = models.CharField(max_length=10, choices=[(tag.name, tag.value) for tag in Day], default=Day.D1)
    language = models.OneToOneField(Language, on_delete=models.CASCADE)
    # teacher_id = models.OneToOneField(Person, on_delete=models.CASCADE, null=True)
