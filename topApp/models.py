from django.db import models

# Create your models here.
class Player(models.Model):
    firstname = models.CharField(max_length=100, default='')
    lastname = models.CharField(max_length=100, default='')
    mail = models.CharField(max_length=255, default='')
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    number =  models.CharField(max_length=100)
    width =  models.IntegerField()
    height =  models.IntegerField()
    player_id = models.IntegerField()
    v_code = models.IntegerField()
    os = models.CharField(max_length=100)
   
   