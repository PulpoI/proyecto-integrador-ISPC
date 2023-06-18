from django.urls import path
from .views import PlanView
from .views import AdminView
from .views import ClienteView
from .views import ClaseView
from .views import ReservaView
from .views import OrdenView

urlpatterns =[
  path('planes/', PlanView.as_view(), name='planes_list'),
  path('planes/<int:id>', PlanView.as_view(), name='planes_process'),
  path('admins/', AdminView.as_view(), name='admin_list'),
  path('admins/<int:id>', AdminView.as_view(), name='admin_process'),
  path('clientes/', ClienteView.as_view(), name='cliente_list'),
  path('clientes/<int:id>', ClienteView.as_view(), name='cliente_process'),
  path('clases/', ClaseView.as_view(), name='cliente_list'),
  path('clases/<int:id>', ClaseView.as_view(), name='cliente_process'),
  path('reservas/', ReservaView.as_view(), name='reserva_list'),
  path('reservas/<int:id>', ReservaView.as_view(), name='reserva_process'),
  path('ordenes/', OrdenView.as_view(), name='orden_list'),
  path('ordenes/<int:id>', OrdenView.as_view(), name='orden_process'),
]