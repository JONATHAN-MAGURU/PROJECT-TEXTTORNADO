# Generated by Django 4.2.3 on 2023-09-30 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0024_remove_nextevent_nextevent'),
    ]

    operations = [
        migrations.CreateModel(
            name='TextBehaviour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='normal', max_length=50)),
            ],
        ),
    ]
