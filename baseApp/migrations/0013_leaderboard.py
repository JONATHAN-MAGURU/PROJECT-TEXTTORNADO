# Generated by Django 4.2.3 on 2023-09-08 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseApp', '0012_delete_ticketpurchase_delete_tickets'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leaderBoardId', models.IntegerField(default=5747)),
            ],
        ),
    ]
