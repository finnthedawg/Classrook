from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from coursereview.serializers import UserSerializer, GroupSerializer, CourseSerializer
from coursereview.models import Course, User

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('category')
    serializer_class = CourseSerializer
    http_method_names = ['get', 'head']

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]
