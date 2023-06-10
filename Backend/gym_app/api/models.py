from django.db import models
from django.utils.timezone import now
# Create your models here.

class Admin(models.Model):
  nombre=models.CharField(max_length=50)
  email=models.CharField(max_length=100)
  password=models.CharField(max_length=50)

class Plan(models.Model):
  nombre=models.CharField(max_length=50)
  descripcion=models.CharField(max_length=150)
  cantidad_clases=models.PositiveBigIntegerField()
  precio=models.PositiveSmallIntegerField()
  # fecha_inicio=models.DateTimeField(null=True)

class Cliente(models.Model):
  nombre=models.CharField(max_length=50)
  apellido=models.CharField(max_length=50)
  dni=models.CharField(max_length=50)
  email=models.CharField(max_length=100)
  password=models.CharField(max_length=50)
  fecha_nacimiento=models.DateField(null=True)
  plan=models.ForeignKey(Plan, on_delete=models.CASCADE, null=True, blank=True)
  clases_restantes=models.PositiveBigIntegerField(null=True, default=None, blank=True)

class Clase(models.Model):
  nombre=models.CharField(max_length=50)
  descripcion=models.CharField(max_length=300)
  fecha=models.DateField(null=True)
  hora=models.DateTimeField(default=now)
  limite_cupos=models.PositiveBigIntegerField()
  cantidad_inscriptos=models.PositiveBigIntegerField()
  estado_clase=models.CharField(max_length=30)

class Reserva(models.Model):
  cliente=models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True, blank=True)
  clase=models.ForeignKey(Clase, on_delete=models.CASCADE, null=True, blank=True)
  # cliente=models.ForeignKey(Cliente, on_delete=models.CASCADE)
  # clase=models.ForeignKey(Clase, on_delete=models.CASCADE)

class Orden(models.Model):
  cliente=models.ForeignKey(Cliente, on_delete=models.CASCADE)
  plan=models.ForeignKey(Plan, on_delete=models.CASCADE)
  precio=models.PositiveBigIntegerField()
  fecha=models.DateField(null=True)