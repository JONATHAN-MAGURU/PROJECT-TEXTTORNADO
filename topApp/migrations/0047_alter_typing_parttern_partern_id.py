# Generated by Django 4.2.3 on 2023-10-25 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topApp', '0046_typing_parttern_partern_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='typing_parttern',
            name='partern_id',
            field=models.IntegerField(),
        ),
    ]