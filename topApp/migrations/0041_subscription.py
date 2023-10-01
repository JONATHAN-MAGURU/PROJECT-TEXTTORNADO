# Generated by Django 4.2.3 on 2023-10-01 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topApp', '0040_support_alter_ticketpurchase_purchase_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscriptionStatus', models.CharField(default='expired', max_length=255)),
                ('subscriptionId', models.IntegerField(default=2)),
                ('subscriptionCounter', models.IntegerField(default=0)),
            ],
        ),
    ]
