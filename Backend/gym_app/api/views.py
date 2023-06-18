from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Plan
from .models import Admin
from .models import Cliente
from .models import Clase
from .models import Reserva
from .models import Orden
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
        dni=jd['dni'],
        email=jd['email'],
        password=jd['password'],
        fecha_nacimiento=jd['fecha_nacimiento'],
        plan=plan,
        clases_restantes=jd.get('clases_restantes')
    )
    cliente_data = {
        'id': cliente.id,
        'nombre': cliente.nombre,
        'apellido': cliente.apellido,
        'dni': cliente.dni,
        'email': cliente.email,
        'password': cliente.password,
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

  def put(self, request, id):
        jd = json.loads(request.body)
        try:
            cliente = Cliente.objects.get(id=id)
        except Cliente.DoesNotExist:
            datos = {'mensaje': "Error, no se encontró el cliente"}
            return JsonResponse(datos, status=404)

        plan_id = jd.get('plan_id')
        plan = None
        if plan_id:
            try:
                plan = Plan.objects.get(id=plan_id)
            except Plan.DoesNotExist:
                pass

        cliente.nombre = jd.get('nombre', cliente.nombre)
        cliente.apellido = jd.get('apellido', cliente.apellido)
        cliente.dni = jd.get('dni', cliente.dni)
        cliente.email = jd.get('email', cliente.email)
        cliente.password = jd.get('password', cliente.password)
        cliente.fecha_nacimiento = jd.get('fecha_nacimiento', cliente.fecha_nacimiento)
        cliente.plan = plan
        cliente.clases_restantes = jd.get('clases_restantes', cliente.clases_restantes)
        cliente.save()

        cliente_data = {
            'id': cliente.id,
            'nombre': cliente.nombre,
            'apellido': cliente.apellido,
            'dni': cliente.dni,
            'email': cliente.email,
            'password': cliente.password,
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


# planes
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
# class ReservaView(View):
#   @method_decorator(csrf_exempt)
#   def dispatch(self, request, *args, **kwargs):
#     return super().dispatch(request, *args, **kwargs)

#   # get
#   def get(self, request, id=0):
#     if (id > 0):
#         reservas = list(Reserva.objects.filter(id=id).values())
#         if len(reservas) > 0:
#             reserva = reservas[0]
#             datos={'mensaje': "Success", 'reservas': reserva}
#         else: 
#             datos={'mensaje': "No se encontró el reserva..."} 
#         return JsonResponse(datos)
#     else:
#         reservas = list(Reserva.objects.values())
#         if len(reservas) > 0:
#           datos = {'mensaje': "Success", 'reservas': reservas}
#         else:
#           datos = {'mensaje': "No se encontraron reservas..."}
#         return JsonResponse(datos)

#   # post
#   def post(self, request):
#     # print(request.body)
#     jd = json.loads(request.body)
#     # print(jd)
#     Reserva.objects.create(cliente_id=jd['cliente_id'], clase_id=jd['clase_id'])
#     datos={'mensaje': "Success"}
#     return JsonResponse(datos)

#   # put
#   def put(self, request, id):
#     jd = json.loads(request.body)
#     reservas = list(Reserva.objects.filter(id=id).values())
#     if len(reservas) > 0:
#       reserva = Reserva.objects.get(id=id)
#       reserva.cliente_id = jd['cliente_id']
#       reserva.clase_id = jd['clase_id']
#       reserva.save()
#       datos = {'mensaje': "Success"}
#     else:
#       datos = {'mensaje': "No se encontró la reserva..."} 
#     return JsonResponse(datos)

#   # delete
#   def delete(self, request, id):
      # clases = list(Reserva.objects.filter(id=id).values())
      # if len(clases) > 0:
      #   Reserva.objects.filter(id=id).delete()
      #   datos = {'mensaje': "Success"}
      # else:
      #   datos = {'mensaje': "No se encontró la reserva..."} 
      # return JsonResponse(datos)

# RESERVAS
class ReservaView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # get
  def get(self, request, id=0):
    if id > 0:
        reserva = Reserva.objects.filter(id=id).values().first()
        if reserva:
            cliente_id = reserva.get('cliente_id')
            clase_id = reserva.get('clase_id')
            if cliente_id:
                try:
                    cliente = Cliente.objects.get(id=cliente_id)
                    reserva['cliente'] = {
                        'id': cliente.id,
                        'nombre': cliente.nombre,
                        'apellido': cliente.apellido,
                        # Agrega los campos adicionales de Cliente que desees
                    }
                except Cliente.DoesNotExist:
                    pass
            if clase_id:
                try:
                    clase = Clase.objects.get(id=clase_id)
                    reserva['clase'] = {
                        'id': clase.id,
                        'nombre': clase.nombre,
                        'descripcion': clase.descripcion,
                        'fecha': clase.fecha,
                        'hora': clase.hora,                        
                    }
                except Clase.DoesNotExist:
                    pass
            datos = {'mensaje': "Success", 'reserva': reserva}
        else:
            datos = {'mensaje': "Error, no se encontró la reserva"}
        return JsonResponse(datos)
    else:
        reservas = Reserva.objects.values()
        reservas_con_clientes = []
        for reserva in reservas:
            cliente_id = reserva.get('cliente_id')
            clase_id = reserva.get('clase_id')
            if cliente_id:
                try:
                    cliente = Cliente.objects.get(id=cliente_id)
                    reserva['cliente'] = {
                        'id': cliente.id,
                        'nombre': cliente.nombre,
                        'apellido': cliente.apellido,
                        # Agrega los campos adicionales de Cliente que desees
                    }
                except Cliente.DoesNotExist:
                    pass
            if clase_id:
                try:
                    clase = Clase.objects.get(id=clase_id)
                    reserva['clase'] = {
                        'id': clase.id,
                        'nombre': clase.nombre,
                        'descripcion': clase.descripcion,
                        'fecha': clase.fecha,
                        'hora': clase.hora,   
                        # Agrega los campos adicionales de Clase que desees
                    }
                except Clase.DoesNotExist:
                    pass
            reservas_con_clientes.append(reserva)
        if reservas_con_clientes:
            datos = {'mensaje': "Success", 'reservas': reservas_con_clientes}
        else:
            datos = {'mensaje': "No se encontraron reservas..."}
        return JsonResponse(datos)
  def post(self, request):
      jd = json.loads(request.body)
      cliente_id = jd.get('cliente_id')
      clase_id = jd.get('clase_id')
      cliente = None
      clase = None
      if cliente_id:
          try:
              cliente = Cliente.objects.get(id=cliente_id)
          except Cliente.DoesNotExist:
              pass
      if clase_id:
          try:
              clase = Clase.objects.get(id=clase_id)
          except Clase.DoesNotExist:
              pass
      reserva = Reserva.objects.create(cliente=cliente, clase=clase)
      datos = {'mensaje': "Success", 'reserva': reserva.id}
      return JsonResponse(datos)

  def put(self, request, id):
      jd = json.loads(request.body)
      try:
          reserva = Reserva.objects.get(id=id)
      except Reserva.DoesNotExist:
          datos = {'mensaje': "Error, no se encontró la reserva"}
          return JsonResponse(datos, status=404)

      cliente_id = jd.get('cliente_id')
      clase_id = jd.get('clase_id')
      cliente = None
      clase = None
      if cliente_id:
          try:
              cliente = Cliente.objects.get(id=cliente_id)
          except Cliente.DoesNotExist:
              pass
      if clase_id:
          try:
              clase = Clase.objects.get(id=clase_id)
          except Clase.DoesNotExist:
              pass

      reserva.cliente = cliente
      reserva.clase = clase
      reserva.save()

      datos = {'mensaje': "Success", 'reserva': reserva.id}
      return JsonResponse(datos)

  def delete(self, request, id):
        try:
            reserva = Reserva.objects.get(id=id)
        except Reserva.DoesNotExist:
            datos = {'mensaje': "Error, no se encontró la reserva"}
            return JsonResponse(datos, status=404)

        reserva.delete()

        datos = {'mensaje': "Success"}
        return JsonResponse(datos)

# ORDENES 
class OrdenView(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)

  # get
  def get(self, request, id=0):
    if (id > 0):
        ordenes = list(Orden.objects.filter(id=id).values())
        if len(ordenes) > 0:
            orden = ordenes[0]
            datos={'mensaje': "Success", 'ordenes': orden}
        else: 
            datos={'mensaje': "No se encontró la orden..."} 
        return JsonResponse(datos)
    else:
        ordenes = list(Orden.objects.values())
        if len(ordenes) > 0:
          datos = {'mensaje': "Success", 'ordenes': ordenes}
        else:
          datos = {'mensaje': "No se encontraron ordenes..."}
        return JsonResponse(datos)

  # post
  def post(self, request):
    # print(request.body)
    jd = json.loads(request.body)
    # print(jd)
    Orden.objects.create(cliente_id=jd['cliente_id'], plan_id=jd['plan_id'], precio=jd['precio'], fecha=jd['fecha'])
    datos={'mensaje': "Success"}
    return JsonResponse(datos)

  # put
  def put(self, request, id):
    jd = json.loads(request.body)
    ordenes = list(Orden.objects.filter(id=id).values())
    if len(ordenes) > 0:
      orden = Orden.objects.get(id=id)
      orden.cliente_id = jd['cliente_id']
      orden.plan_id = jd['plan_id']
      orden.fecha = jd['fecha']
      orden.precio = jd['precio']
      orden.save()
      datos = {'mensaje': "Success"}
    else:
      datos = {'mensaje': "No se encontró la orden..."} 
    return JsonResponse(datos)

  # delete
  def delete(self, request, id):
      clases = list(Orden.objects.filter(id=id).values())
      if len(clases) > 0:
        Orden.objects.filter(id=id).delete()
        datos = {'mensaje': "Success"}
      else:
        datos = {'mensaje': "No se encontró la orden..."} 
      return JsonResponse(datos)
