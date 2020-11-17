from django.contrib.auth.models import AbstractUser
from django.db import models

# user roles
from app.user_types_enum import UserType
from school.models import Group, Lesson


class User(AbstractUser):
    username = models.CharField(max_length=16, unique=True)
    password = models.CharField(max_length=32)
    user_type = models.CharField(max_length=18, choices=[(tag.name, tag.value) for tag in UserType],
                                 default=UserType.STUDENT)


class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    surname = models.TextField()
    name = models.TextField()
    mobile_number = models.IntegerField()
    address = models.TextField()


class GroupAssignment(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    assigment_date = models.DateTimeField(auto_now=True, null=True, blank=True)


class Mark(models.Model):
    value = models.CharField(max_length=1, choices=[(str(x), x) for x in range(1, 7)], default='1')
    date = models.DateField(auto_now=True)
    description = models.TextField(default='')
    lesson = models.ForeignKey(Lesson, default=None, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Person, default=None, on_delete=models.CASCADE)


class Presence(models.Model):
    date = models.DateField(auto_now=True)
    present = models.BooleanField(default=False)
    group_assignment = models.ForeignKey("app.GroupAssignment", on_delete=models.CASCADE, null=True)
