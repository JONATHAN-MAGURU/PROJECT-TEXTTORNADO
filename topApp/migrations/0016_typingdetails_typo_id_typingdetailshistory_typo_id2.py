# Generated by Django 4.2 on 2023-05-07 00:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("topApp", "0015_typingdetailshistory"),
    ]

    operations = [
        migrations.AddField(
            model_name="typingdetails",
            name="typo_id",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="typingdetailshistory",
            name="typo_id2",
            field=models.IntegerField(default=0),
        ),
    ]
