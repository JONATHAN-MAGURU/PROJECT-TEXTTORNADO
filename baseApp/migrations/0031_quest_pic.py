# Generated by Django 4.2.3 on 2023-10-10 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0030_monetary_quest'),
    ]

    operations = [
        migrations.AddField(
            model_name='quest',
            name='pic',
            field=models.ImageField(blank=True, default='Gadget-PNG-Pic.png', null=True, upload_to=''),
        ),
    ]
