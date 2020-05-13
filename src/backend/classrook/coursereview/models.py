from django.db import models
import pandas as pd

import os

# Create your models here.
class Course(models.Model):
    category = models.CharField(max_length=10)
    code = models.CharField(max_length=10)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    reviews = models.IntegerField(default=0)
    docs = models.IntegerField(default=0)

class User(models.Model):
    user_id = models.IntegerField(null=True)
    username = models.CharField(max_length=20)
    email = models.EmailField()
    credits = models.IntegerField(default=10)

class Review(models.Model):
    user_id = models.IntegerField(null=True)
    course_id = models.IntegerField(null=True)
    review = models.CharField(max_length=1000, null=True)
    created_at = models.IntegerField()
    last_modified = models.IntegerField(null=True)
    upvotes = models.IntegerField(default=0, null=True)

class ReviewUpvotes(models.Model):
    user_id = models.IntegerField()
    review_id = models.IntegerField()

class Document(models.Model):
    uploader_id = models.IntegerField(null=True)
    course_id = models.IntegerField(null=True)
    credit = models.IntegerField(default=0)
    file = models.FileField()
