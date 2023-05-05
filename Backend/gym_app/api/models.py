from django.db import models

# Create your models here.

class Plan(models.Model):
  nombre=models.CharField(max_length=50)
  descripcion=models.CharField(max_length=200)
  cantidad_clases=models.PositiveBigIntegerField()
  precio=models.PositiveSmallIntegerField()
  