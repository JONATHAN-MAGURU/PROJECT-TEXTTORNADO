# Generated by Django 4.2.3 on 2023-08-17 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0009_endevent_endeventid'),
    ]

    operations = [
        migrations.CreateModel(
            name='NextEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nextEvent', models.IntegerField(default=0)),
                ('nextEventId', models.IntegerField(default=5747)),
            ],
        ),
    ]
