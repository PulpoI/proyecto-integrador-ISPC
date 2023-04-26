class Plan:
    codigo = 0
    nombreP = ""
    descripcion= ""
    num_clases= 0
    fecha_inicio= 0

    def __init__(self, codigo, nombreP, descripcion, num_clases, fecha_inicio) :
        self.codigo = codigo
        self.nombreP = nombreP
        self.descripcion = descripcion
        self.num_clases = num_clases
        self.fecha_inicio = fecha_inicio

    def get_codigo(self):
        return self.codigo

    def set_codigo(self,codigo):
        self.codigo = codigo

    def get_nombreP(self):
        return self.nombreP

    def set_nombreP(self,nombreP):
        self.nombreP = nombreP

    def get_descripcion(self):
        return self.descripcion

    def set_descripcion(self,descripcion):
        self.descripcion = descripcion

    def get_num_clases(self):
        return self.num_clases

    def set_num_clases(self,num_clases):
        self.num_clases = num_clases

    def get_fecha_inicio(self):
        return self.fecha_inicio

    def set_fecha_inicio(self,fecha_inicio):
        self.fecha_inicio = fecha_inicio


        
# calcularFechaPago()




    

   





    
        