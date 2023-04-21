from django.db import models

# Create your models here.
class Admins_details(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    passw = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    emails = models.CharField(max_length=100)
    

class Aunthaticate(models.Model):
    v_code = models.CharField(max_length=50)