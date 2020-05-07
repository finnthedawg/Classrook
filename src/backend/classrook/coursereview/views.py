from django.contrib.auth.models import User, Group
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from coursereview.serializers import UserSerializer, CourseSerializer
from coursereview.models import Course, User

import random

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

def search_course(keywords, courses):
    res = []

    for course in courses:
        score = 0
        for kw in keywords:
            if kw in course['title'].lower():
                score += 10
            if kw in course['description'].lower():
                score += 1
        if score != 0:
            res.append([course, score])

    res.sort(key = lambda x: x[1], reverse=True)
    res = [x[0] for x in res]
    return res

@csrf_exempt
@api_view(['GET', 'POST'])
def course_list(request):
    queryset = Course.objects.all().order_by('category')
    serializer = CourseSerializer(queryset, many=True)

    if request.method == 'GET':
        return JsonResponse(random.sample({'courses': serializer.data}, 5), safe=False)

    if request.method == 'POST':
        keywords = request.data['query'].split(' ')
        res_course = search_course(keywords, serializer.data)

        return JsonResponse({'courses': res_course}, safe=False)
