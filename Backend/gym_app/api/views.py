from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Plan
from .models import Admin
from .models import Cliente
from .models import Clase
from .models import Reserva
import json

# Create your views here.

#ADMIN
class AdminView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)
  #Get
  def get(self, request, id=0):
    if (id > 0):
      admins = list(Admin.objects.filter(id=id).values())
      if len(admins) > 0:
        admin = admins[0]
        datos = {'mensaje': "Success", 'admins': admin}
      else:
        datos = {'mensaje': "Error, no se encontro el admin"}
      return JsonResponse(datos)
    else:
      admins = list(Admin.objects.values())
      if len(admins) > 0:
        datos = {'mensaje': "Success", 'admins': admins}
      else:
        datos = {'mensaje': "No se encontraron administradores..."}
      return JsonResponse(datos)

#CLIENTE
class ClienteView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  def get(self, request, id=0):
    if id > 0:
        cliente = Cliente.objects.filter(id=id).values().first()
        if cliente:
            plan_id = cliente.get('plan_id')
            if plan_id:
                try:
                    plan = Plan.objects.get(id=plan_id)
                    cliente['plan'] = {
                        'id': plan.id,
                        'nombre': plan.nombre,
                        'descripcion': plan.descripcion,
                        'cantidad_clases': plan.cantidad_clases,
                        'precio': plan.precio
                    }
                except Plan.DoesNotExist:
                    pass
            datos = {'mensaje': "Success", 'cliente': cliente}
        else:
            datos = {'mensaje': "Error, no se encontró el cliente"}
        return JsonResponse(datos)
    else:
        clientes = Cliente.objects.values()
        clientes_con_plan = []
        for cliente in clientes:
            plan_id = cliente.get('plan_id')
            if plan_id:
                try:
                    plan = Plan.objects.get(id=plan_id)
                    cliente['plan'] = {
                        'id': plan.id,
                        'nombre': plan.nombre,
                        'descripcion': plan.descripcion,
                        'cantidad_clases': plan.cantidad_clases,
                        'precio': plan.precio
                    }
                except Plan.DoesNotExist:
                    pass
            clientes_con_plan.append(cliente)
        if clientes_con_plan:
            datos = {'mensaje': "Success", 'clientes': clientes_con_plan}
        else:
            datos = {'mensaje': "No se encontraron clientes..."}
        return JsonResponse(datos)

        
  def post(self, request):
    jd = json.loads(request.body)
    plan_id = jd.get('plan_id')
    plan = None
    if plan_id:
        try:
            plan = Plan.objects.get(id=plan_id)
        except Plan.DoesNotExist:
            pass
    cliente = Cliente.objects.create(
        nombre=jd['nombre'],
        apellido=jd['apellido'],
        email=jd['email'],
        contraseña=jd['contraseña'],
        fecha_nacimiento=jd['fecha_nacimiento'],
        plan=plan,
        clases_restantes=jd.get('clases_restantes')
    )
    cliente_data = {
        'id': cliente.id,
        'nombre': cliente.nombre,
        'apellido': cliente.apellido,
        'email': cliente.email,
        'contraseña': cliente.contraseña,
        'fecha_nacimiento': cliente.fecha_nacimiento,
        'plan': {
            'id': plan.id if plan else None,
            'nombre': plan.nombre if plan else None,
            'descripcion': plan.descripcion if plan else None,
            'cantidad_clases': plan.cantidad_clases if plan else None,
            'precio': plan.precio if plan else None
        } if plan else None,
        'clases_restantes': cliente.clases_restantes
    }
    datos = {'mensaje': "Success", 'cliente': cliente_data}
    return JsonResponse(datos)



# PLANES
class PlanView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # get
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

  # post
  def post(self, request):
    # print(request.body)
    jd = json.loads(request.body)
    # print(jd)
    Plan.objects.create(nombre=jd['nombre'], descripcion=jd['descripcion'], cantidad_clases=jd['cantidad_clases'], precio=jd['precio'])
    datos={'mensaje': "Success"}
    return JsonResponse(datos)

  # put
  def put(self, request, id):
    jd = json.loads(request.body)
    planes = list(Plan.objects.filter(id=id).values())
    if len(planes) > 0:
      plan = Plan.objects.get(id=id)
      plan.nombre = jd['nombre']
      plan.descripcion = jd['descripcion']
      plan.cantidad_clases = jd['cantidad_clases']
      plan.precio = jd['precio']
      plan.fecha_inicio = jd['fecha_inicio']
      plan.save()
      datos = {'mensaje': "Success"}
    else:
      datos = {'mensaje': "No se encontró el plan..."} 
    return JsonResponse(datos)

  # delete
  def delete(self, request, id):
      planes = list(Plan.objects.filter(id=id).values())
      if len(planes) > 0:
        Plan.objects.filter(id=id).delete()
        datos = {'mensaje': "Success"}
      else:
        datos = {'mensaje': "No se encontró el plan..."} 
      return JsonResponse(datos)

# CLASES
class ClaseView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # get
  def get(self, request, id=0):
    if (id > 0):
        clases = list(Clase.objects.filter(id=id).values())
        if len(clases) > 0:
            clase = clases[0]
            datos={'mensaje': "Success", 'clases': clase}
        else: 
            datos={'mensaje': "No se encontró el clase..."} 
        return JsonResponse(datos)
    else:
        clases = list(Clase.objects.values())
        if len(clases) > 0:
          datos = {'mensaje': "Success", 'clases': clases}
        else:
          datos = {'mensaje': "No se encontraron clases..."}
        return JsonResponse(datos)

  # post
  def post(self, request):
    # print(request.body)
    jd = json.loads(request.body)
    # print(jd)
    Clase.objects.create(nombre=jd['nombre'], descripcion=jd['descripcion'], fecha=jd['fecha'], hora=jd['hora'], limite_cupos=jd['limite_cupos'], cantidad_inscriptos=jd['cantidad_inscriptos'], estado_clase=jd['estado_clase'])
    datos={'mensaje': "Success"}
    return JsonResponse(datos)

  # put
  def put(self, request, id):
    jd = json.loads(request.body)
    clases = list(Clase.objects.filter(id=id).values())
    if len(clases) > 0:
      clase = Clase.objects.get(id=id)
      clase.nombre = jd['nombre']
      clase.descripcion = jd['descripcion']
      clase.fecha=jd['fecha']
      clase.hora=jd['hora']
      clase.limite_cupos=jd['limite_cupos']
      clase.cantidad_inscriptos=jd['cantidad_inscriptos']
      clase.estado_clase=jd['estado_clase']
      clase.save()
      datos = {'mensaje': "Success"}
    else:
      datos = {'mensaje': "No se encontró la clase..."} 
    return JsonResponse(datos)

  # delete
  def delete(self, request, id):
      clases = list(Clase.objects.filter(id=id).values())
      if len(clases) > 0:
        Clase.objects.filter(id=id).delete()
        datos = {'mensaje': "Success"}
      else:
        datos = {'mensaje': "No se encontró la clase..."} 
      return JsonResponse(datos)



# RESERVAS
class ReservaView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # get
  def get(self, request, id=0):
    if (id > 0):
        reservas = list(Reserva.objects.filter(id=id).values())
        if len(reservas) > 0:
            reserva = reservas[0]
            datos={'mensaje': "Success", 'reservas': reserva}
        else: 
            datos={'mensaje': "No se encontró el reserva..."} 
        return JsonResponse(datos)
    else:
        reservas = list(Reserva.objects.values())
        if len(reservas) > 0:
          datos = {'mensaje': "Success", 'reservas': reservas}
        else:
          datos = {'mensaje': "No se encontraron reservas..."}
        return JsonResponse(datos)

  # post
  def post(self, request):
    # print(request.body)
    jd = json.loads(request.body)
    # print(jd)
    Reserva.objects.create(cliente_id=jd['cliente_id'], clase_id=jd['clase_id'])
    datos={'mensaje': "Success"}
    return JsonResponse(datos)

  # put
  def put(self, request, id):
    jd = json.loads(request.body)
    reservas = list(Reserva.objects.filter(id=id).values())
    if len(reservas) > 0:
      reserva = Reserva.objects.get(id=id)
      reserva.cliente_id = jd['cliente_id']
      reserva.clase_ide = jd['clase_ide']
      reserva.save()
      datos = {'mensaje': "Success"}
    else:
      datos = {'mensaje': "No se encontró la reserva..."} 
    return JsonResponse(datos)

  # delete
  def delete(self, request, id):
      clases = list(Reserva.objects.filter(id=id).values())
      if len(clases) > 0:
        Reserva.objects.filter(id=id).delete()
        datos = {'mensaje': "Success"}
      else:
        datos = {'mensaje': "No se encontró la reserva..."} 
      return JsonResponse(datos)


