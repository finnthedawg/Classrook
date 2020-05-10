# Backend REST API Documentation

## Initial setup
Step 0: Install `django` and `rest_framework`
Step 1: `python manage.py makemigrations`
Step 2: `python manage.py migrate`
Step 3: `python setup_db.py`
Step 4: `python manage.py runserver`

To test: open `test.html` in browser

## Interfaces
| purpose | URL | METHOD | REQUEST DATA | RESPONSE DATA |
| --- | ------ | ------------ | ------------- | ------- |
| get 5 courses | courses/ | GET | NA | ‘courses’: list of courses (5 random courses) |
| search courses | courses/ | POST | ‘query’: space-separated string | ‘courses’: list of courses |
| get user info | user/ | POST | 'user_id': user id | user json object |
| post new review | review/ | POST | 'user_id': user id, 'review': review content, 'course_id': course id | 'reviews': list of review object |
| modify review | review/ | POST | 'review_id': review id, 'review': review content | 'reviews': list of review object |
| upvote review | upvote/ | POST | 'review_id': review_id, 'user_id': user id | review json object |

## Models
**course**
- category: string
- code: string
- title: string
- description: string
- reviews: int
- docs: int

**user**
- user_name: string
- email: string
- credits: int

**review**
- user_id: int
- course_id: int
- review: string
- created_at: int (seconds since epoch)
- last_modified: int (seconds since epoch)
- upvotes: int

# TODOs
[ ] User registration
[x] Each user can only upvote a review once
