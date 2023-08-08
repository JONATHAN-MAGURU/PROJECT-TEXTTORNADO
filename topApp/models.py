from django.db import models
from datetime import datetime

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
    amount_of_comments =models.IntegerField(default=0)
    profile_pic = models.ImageField(default="user_default_pic_x6puuUx.jpg", null=True, blank= True )
    date  = models.DateTimeField(default=datetime.now, blank=True)

class Comments(models.Model):
    player_id2 = models.CharField(max_length=10)
    username2 = models.CharField(max_length=100)
    comment = models.CharField(max_length= 1000)
   

class TypingDetails(models.Model):
    wpm = models.IntegerField()
    cpm = models.IntegerField()
    mistakes = models.IntegerField()
    play_id = models.CharField(max_length=10)
    username = models.CharField(max_length=255)
    typo_id = models.IntegerField(default=0)
    date  = models.DateTimeField(default=datetime.now, blank=True)
    
class TypingDetailsHistory(models.Model):
    wpm = models.IntegerField()
    cpm = models.IntegerField()
    mistakes = models.IntegerField()
    play_id = models.CharField(max_length=10)
    username = models.CharField(max_length=255)
    typo_id2 = models.IntegerField(default=0)
    date  = models.DateTimeField(default=datetime.now, blank=True)
    
    