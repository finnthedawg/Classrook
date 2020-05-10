from django.contrib.auth.models import Group
from rest_framework import serializers
from coursereview.models import Course, User, Review, ReviewUpvotes

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'category', 'code', 'title', 'description']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'credits']

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user_id', 'course_id', 'review', 'created_at', 'last_modified', 'upvotes']

class ReviewUpvotesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReviewUpvotes
        fields = ['id', 'user_id', 'review_id']
