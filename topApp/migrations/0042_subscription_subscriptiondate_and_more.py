# Generated by Django 4.2.3 on 2023-10-02 01:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('topApp', '0041_subscription'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='subscriptionDate',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='subscription',
            name='subscriptionTimes',
            field=models.IntegerField(default=0),
        ),
    ]
