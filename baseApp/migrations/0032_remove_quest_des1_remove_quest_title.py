# Generated by Django 4.2.3 on 2023-10-11 00:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0031_quest_pic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quest',
            name='des1',
        ),
        migrations.RemoveField(
            model_name='quest',
            name='title',
        ),
    ]
