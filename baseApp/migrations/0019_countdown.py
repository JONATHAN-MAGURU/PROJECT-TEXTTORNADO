# Generated by Django 4.2.3 on 2023-09-28 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0018_event2'),
    ]

    operations = [
        migrations.CreateModel(
            name='Countdown',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expiration_time', models.DateTimeField()),
            ],
        ),
    ]
