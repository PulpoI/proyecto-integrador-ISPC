from django.urls import path
from .views import PlanView

urlpatterns =[
  path('planes/', PlanView.as_view(), name='planes_list'),
  path('planes/<int:id>', PlanView.as_view(), name='planes_process')
]