# Generated by Django 4.2 on 2023-05-30 11:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("baseApp", "0004_variant_paragraphs"),
    ]

    operations = [
        migrations.AddField(
            model_name="variant_paragraphs",
            name="variant_id",
            field=models.IntegerField(default=0),
        ),
    ]
