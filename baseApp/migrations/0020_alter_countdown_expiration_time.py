# Generated by Django 4.2.3 on 2023-09-29 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0019_countdown'),
    ]

    operations = [
        migrations.AlterField(
            model_name='countdown',
            name='expiration_time',
            field=models.DateTimeField(default='2023-09-01 16:01:47'),
        ),
    ]
