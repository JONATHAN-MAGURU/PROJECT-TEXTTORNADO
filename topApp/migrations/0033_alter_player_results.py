# Generated by Django 4.2.3 on 2023-09-10 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topApp', '0032_leaderboardhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='results',
            field=models.CharField(default='seen', max_length=20),
        ),
    ]
