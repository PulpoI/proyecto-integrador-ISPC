class Cliente:
    codigo = 0
    dni = 0
    contraseña = 0
    nombre = ""
    apellido = "" 
    fecha_de_nac = ""
    correo = ""
    pl = 0


    def __init__(self, codigo, dni, contraseña, nombre, apellido, fecha_de_nac, correo, plan) :
        self.codigo = codigo
        self.dni = dni
        self.contraseña = contraseña
        self.nombre = nombre
        self.apellido = apellido
        self.fecha_de_nac = fecha_de_nac
        self.correo = correo
        self.plan = plan

    def get_codigo(self):
        return self.codigo

    def set_codigo(self,codigo):
        self.codigo = codigo

    def get_dni(self):
        return self.dni

    def set_dni(self,dni):
        self.dni= dni

    def get_contraseña(self):
        return self.contraseña

    def set_contraseña(self,contraseña):
        self.contraseña= contraseña

    def get_nombre(self):
        return self.nombre

    def set_nombre(self,nombre):
        self.nombre = nombre

    def get_apellido(self):
        return self.apellido

    def set_apellido(self,apellido):
        self.apellido = apellido

    def get_fecha_de_nac(self):
        return self.fecha_de_nac

    def set_fecha_de_nac(self,fecha_de_nac):
        self.fecha_de_nac = fecha_de_nac

    def get_correo(self):
        return self.correo

    def set_correo(self,correo):
        self.correo = correo

    def get_plan(self):
        return self.plan

    def set_plan(self,plan):
        self.plan = plan

        

    # iniciarSesion()
    # crearCuentaUsuario()
    # agregarInfoPersonal()
    # reservarHora()
    # revisarHistorial()
    # modificarReservaHora()
    



    