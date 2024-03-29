# Generated by Django 4.2 on 2023-05-04 02:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "topApp",
            "0014_alter_typingdetails_cpm_alter_typingdetails_mistakes_and_more",
        ),
    ]

    operations = [
        migrations.CreateModel(
            name="TypingDetailsHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("wpm", models.IntegerField()),
                ("cpm", models.IntegerField()),
                ("mistakes", models.IntegerField()),
                ("play_id", models.CharField(max_length=10)),
                ("username", models.CharField(max_length=255)),
            ],
        ),
    ]
