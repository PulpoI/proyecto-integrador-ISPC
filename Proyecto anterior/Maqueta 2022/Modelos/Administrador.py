class Administrador:
    codigo = 0
    contraseña = 0
    nombre = ""
    apellido = ""
    correo = ""


    def __init__(self, codigo, contraseña, nombre, apellido, correo) :
        self.codigo = codigo
        self.contraseña = contraseña
        self.nombre = nombre
        self.apellido = apellido
        self.correo = correo

    def get_codigo(self):
        return self.codigo

    def set_codigo(self,codigo):
        self.codigo = codigo

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

    def get_correo(self):
        return self.correo

    def set_correo(self,correo):
        self.correo = correo

    

    # iniciarSesion()
    # crearCuentaUsuario()
    # modificarCuentaUsuario()
    # eliminarCuentaUsuario()
    # agregarInfoPersonal()
    # deshabilitarHora()
    # revisarHistorial()
    




    
    