# Generated by Django 4.2.1 on 2023-05-15 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_clase_alter_plan_descripcion_reserva'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clase',
            name='descripcion',
            field=models.CharField(max_length=300),
        ),
    ]