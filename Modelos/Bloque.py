class Bloque:
    codigo = 0
    nombre = ""
    descripcion = ""
    fecha = 0
    horaI =  0
    horaF = 0
    cupos = 0
    inscriptos = 0
    estado = ""

    def __init__(self, codigo, nombre, descripcion, fecha, horaI, horaF, cupos, inscriptos, estado) :
        self.codigo = codigo
        self.nombre = nombre
        self.descripcion = descripcion
        self.fecha = fecha
        self.horaI = horaI
        self.horaF = horaF
        self.cupos = cupos
        self.inscriptos = inscriptos
        self.estado = estado
    
    def get_codigo(self):
        return self.codigo

    def set_codigo(self,codigo):
        self.codigo = codigo

    def get_nombre(self):
        return self.nombre

    def set_nombre(self,nombre):
        self.nombre = nombre

    def get_descripcion(self):
        return self.descripcion

    def set_descripcion(self,descripcion):
        self.descripcion = descripcion

    def get_fecha(self):
        return self.fecha

    def set_fecha(self,fecha):
        self.fecha = fecha
 
    def get_horaI(self):
        return self.horaI

    def set_horaI(self,horaI):
        self.horaI = horaI
   
    def get_horaF(self):
        return self.horaF

    def set_horaF(self,horaF):
        self.horaF = horaF
    
    def get_cupos(self):
        return self.cupos

    def set_cupos(self,cupos):
        self.cupos = cupos

    def get_inscriptos(self):
        return self.inscriptos

    def set_inscriptos(self,inscriptos):
        self.inscriptos = inscriptos

    def get_estados(self):
        return self.estados

    def set_estados(self,estados):
        self.estados = estados


     
        