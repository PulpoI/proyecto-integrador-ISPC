from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Plan
import json

# Create your views here.

class PlanView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # GET
  def get(self, request, id=0):
    if (id > 0):
        planes = list(Plan.objects.filter(id=id).values())
        if len(planes) > 0:
            plan = planes[0]
            datos={'mensaje': "Success", 'planes': plan}
        else: 
            datos={'mensaje': "No se encontró el plan..."} 
        return JsonResponse(datos)
    else:
        planes = list(Plan.objects.values())
        if len(planes) > 0:
          datos = {'mensaje': "Success", 'planes': planes}
        else:
          datos = {'mensaje': "No se encontraron planes..."}
        return JsonResponse(datos)

  # POST
  def post(self, request):
    # print(request.body)
    jd = json.loads(request.body)
    # print(jd)
    Plan.objects.create(nombre=jd['nombre'], descripcion=jd['descripcion'], cantidad_clases=jd['cantidad_clases'], precio=jd['precio'])
    datos={'mensaje': "Success"}
    return JsonResponse(datos)

  # PUT
  def put(self, request, id):
    jd = json.loads(request.body)
    planes = list(Plan.objects.filter(id=id).values())
    if len(planes) > 0:
      plan = Plan.objects.get(id=id)
      plan.nombre = jd['nombre']
      plan.descripcion = jd['descripcion']
      plan.cantidad_clases = jd['cantidad_clases']
      plan.precio = jd['precio']
      plan.save()
      datos = {'mensaje': "Success"}
    else:
      datos = {'mensaje': "No se encontró el plan..."} 
    return JsonResponse(datos)

  # DELETE
  def delete(self, request, id):
      planes = list(Plan.objects.filter(id=id).values())
      if len(planes) > 0:
        Plan.objects.filter(id=id).delete()
        datos = {'mensaje': "Success"}
      else:
        datos = {'mensaje': "No se encontró el plan..."} 
      return JsonResponse(datos)