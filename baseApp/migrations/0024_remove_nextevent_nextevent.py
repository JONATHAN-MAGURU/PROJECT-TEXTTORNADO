# Generated by Django 4.2.3 on 2023-09-30 22:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0023_countdown2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='nextevent',
            name='nextEvent',
        ),
    ]
