"""fls_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from app import app_views
from school import school_views

urlpatterns = [
    path('createuser', app_views.create_user),
    path('allusers', app_views.all_users),
    path('login', app_views.user_login),
    path('school/creategroup', school_views.create_group),
    path('school/allgroups', school_views.all_groups),
    path('user/assigntogroup', app_views.group_assignment),
    path('user/finduserbysurnameandname', app_views.find_user_by_surname_and_name),
    path('user/checkifpersonisassigned', app_views.check_if_person_is_assigned),
]
