from django.contrib.auth.models import User, Group
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, Http404
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from coursereview.serializers import UserSerializer, CourseSerializer, ReviewSerializer, DocumentSerializer
from coursereview.models import Course, User, Review, ReviewUpvotes, Document

import random
import time

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
        if 'query' not in request.data:
            return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

        keywords = request.data['query'].split(' ')
        res_course = search_course(keywords, serializer.data)

        return JsonResponse({'courses': res_course[:5]}, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def get_exact_course(request):
    queryset = Course.objects.all().order_by('category')
    serializer = CourseSerializer(queryset, many=True)

    for d in serializer.data:
        if d['id'] == int(request.data['id']):
            return JsonResponse(d, safe=False)


@csrf_exempt
@api_view(['GET', 'POST'])
def user_info(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many=True)

    if 'user_id' not in request.data:
        return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    try:
        uid = int(request.data['user_id'])
    except Exception as e:
        print(e)
        return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    for d in serializer.data:
        if d['id'] == uid:
            return JsonResponse(d, safe=False)

    return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'POST'])
def user_info_by_email(request):
    print(request)
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many=True)

    # if 'user_id' not in request.data:
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    # try:
    #     uid = int(request.data['user_id'])
    # except Exception as e:
    #     print(e)
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    for d in serializer.data:
        if d['email'] == request.data['email']:
            return JsonResponse(d, safe=False)

    return JsonResponse({'email': 'notfound'},)

@csrf_exempt
@api_view(['GET', 'POST'])
def course_info_by_code(request):
    print(request.data)
    queryset = Course.objects.all()
    serializer = CourseSerializer(queryset, many=True)

    # if 'user_id' not in request.data:
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    # try:
    #     uid = int(request.data['user_id'])
    # except Exception as e:
    #     print(e)
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)
    courses = []
    for d in serializer.data:
        if d['category'] == request.data['id']:
            print(d)
            courses.append(d)
    return JsonResponse(courses, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def review_info_by_course_id(request):
    print(request.data)
    queryset = Review.objects.all()
    serializer = ReviewSerializer(queryset, many=True)

    # if 'user_id' not in request.data:
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    # try:
    #     uid = int(request.data['user_id'])
    # except Exception as e:
    #     print(e)
    #     return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)
    reviews = []
    for d in serializer.data:
        if d['course_id'] == int(request.data['id']):
            reviews.append(d)
    return JsonResponse(reviews, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def post_review(request):

    try:
        if 'review_id' in request.data:
            review_id = int(request.data['review_id'])

            review = Review.objects.get(id=review_id)
        else:
            review = Review.objects.create(created_at=int(time.time()))
            user_id = int(request.data['user_id'])
            course_id = int(request.data['course_id'])

            review.user_id = user_id
            review.course_id = course_id

            # update user credit
            user = User.objects.get(id=user_id)
            user.credits += 1
            user.save()

        time_now = time.time()
        content = request.data['review']
        review.review = content
        review.last_modified = time_now

        review.save()

        course_id = review.course_id
        all_reviews = Review.objects.filter(course_id=course_id)
        serializer = ReviewSerializer(all_reviews, many=True)

        return JsonResponse({'reviews': serializer.data[::-1]}, safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'POST'])
def upvote_review(request):
    user_id = int(request.data['user_id'])
    review_id = int(request.data['review_id'])

    #try:
    review = Review.objects.get(id = review_id)
    #except Exception as e:
        #print(e)
        #return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

    try:
        past_upvote = ReviewUpvotes.objects.get(user_id = user_id, review_id = review_id)
        upvoted = True
    except Exception as e:
        print(e)
        upvoted = False

    if not upvoted:
        upvote = ReviewUpvotes.objects.create(user_id = user_id, review_id = review_id)
        upvote.save()

        review.upvotes += 1
        review.save()

    serializer = ReviewSerializer(review)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET', 'POST'])
def post_user(request):
    print(request)

    try:
        user = User.objects.create()
        user_id = int(request.data['user_id'])
        username = request.data['username']
        email = request.data['email']
        credits = 10

        user.user_id = user_id
        user.username = username
        user.email = email
        user.credits = credits

        user.save()
        print(user)
        all_users = User.objects.filter(user_id=user_id)
        serializer = UserSerializer(all_users, many=True)

        return JsonResponse({'reviews': serializer.data}, safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({'': ''}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'POST'])
def upload_file(request):
    print(request)
    credit = int(request.data['credit'])
    user_id = int(request.data['user_id'])
    course_id = int(request.data['course_id'])
    file = request.data['file']

    print(file)
    doc = Document.objects.create(credit=credit, uploader_id=user_id, course_id=course_id, file=file)
    doc.save()

    all_docs = Document.objects.filter(course_id=course_id)
    serializer = DocumentSerializer(all_docs, many=True)

    return JsonResponse({'docs': serializer.data})
