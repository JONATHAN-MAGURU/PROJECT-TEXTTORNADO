# Generated by Django 4.2.3 on 2023-09-08 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0013_leaderboard'),
    ]

    operations = [
        migrations.CreateModel(
            name='TypingArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('typingAreaId', models.IntegerField(default=5747)),
            ],
        ),
    ]
