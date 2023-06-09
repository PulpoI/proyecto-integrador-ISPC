from django.contrib import admin
from .models import Plan
from .models import Admin
from .models import Cliente
from .models import Clase
from .models import Reserva
from .models import Orden

# Register your models here.

admin.site.register(Admin)
admin.site.register(Plan)
admin.site.register(Cliente)
admin.site.register(Clase)
admin.site.register(Reserva)
admin.site.register(Orden)