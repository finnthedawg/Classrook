import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'classrook.settings'
import django
django.setup()

import pandas as pd
from coursereview.models import Course, User

if __name__ == '__main__':

    courses = pd.read_csv("./coursereview/data/courses.csv", sep='\t',
    usecols=['CourseId', 'Category', 'Code', 'Title', 'Description'],
    dtype={'CourseId':int,'Category':str,'Code':str,'Title':str,'Description':str})

    for ind, row in courses.iterrows():
        record = Course(category=row['Category'], code=row['Code'], title=row['Title'], description=row['Description'])
        record.save()

    record = User(email='example@nyu.edu', username='Dummy')
    record.save()
