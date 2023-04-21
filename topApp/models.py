from django.db import models

# Create your models here.
class Player(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    number =  models.IntegerField()
    width =  models.IntegerField()
    height =  models.IntegerField()
    player_id = models.IntegerField()
    v_code = models.IntegerField()
    os = models.CharField(max_length=100)
   



  