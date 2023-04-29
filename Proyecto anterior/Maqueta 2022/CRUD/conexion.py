#Coneccion a la Base de Datos.

import mysql.connector

class Conectar():
    def __init__(self) -> None:
        try:
            self.conexion = mysql.connector(
                host = 'localhost',
                port = 3306,
                user = 'root',
                password = '123456789',
                db = 'GYM'
            )

        except mysql.connector.Error as descripcionError:
            print("¡No se estableció conexion con la Base de Datos!", descripcionError)




# Primera operacion del CRUD: CREATE O INSERT.
# Acccion de Insertar valor a la BD mediante el registro de un usuario.
# Realizado por Maria josé Malbran

def registrarCliente(self, nombre, apellido, genero, celular, contraseña, fecha_nacimiento, correo):
    if self.conexion.is_conected():
        try:
            cursor = self.conexion.cursor()
            sentenciaSQL = "INSERT INTO Cliente 'nombre','apellido','genero','celular','contraseña','fecha_nacimiento','correo' VALUES ('Raul','Perez','masculino','351678798','123123raul','01/05/1993','raulperez93@gmail.com)"
            data = (nombre, apellido, genero, celular, contraseña, fecha_nacimiento, correo)

            cursor.execute(sentenciaSQL, data)
            self.conexion.commit()
            self.conexion.close()

        except:
            print("No se pudo establecer conexion a la Base de Datos")



# Segunda operacion del CRUD: READ O LEER.
# Accion de realizar un busqueda en la BD un Plan disponible para el cliente.
# Realizado por Ivan Moreno Rivero.


def seleccionarPlan(self):
    if self.conexion.is_conected():
        try:
            cursor = self.conexion.cursor()
            sentenciaSQL = "SELECT * FROM Plan WHERE nombre='Pro' "
            cursor.execute(sentenciaSQL)
            #variable para guardar la busqueda.
            resultadoBusqueda = cursor.fetchall()
            self.conexion.close()
            return resultadoBusqueda

        except:
             print("No se pudo establecer conexion a la Base de Datos")



# Tercera operacion del CRUD: UPDATE O ACTUALIZAR.
# Accion de actualizar un registro de algún cliente en la BD.
# Relalizado por Ivan Moreno Rivero.

def actualizarValor(self, ID, nombre, apellido):
    if self.conexion.is_conected():
        try:
            if ID == id:
                 cursor = self.conexion.cursor()
                 sentenciaSQL = "UPDATE Cliente SET nombre=%s, apellido=%s WHERE id= ID "
                 data = (nombre, apellido, ID)
            
                 cursor.execute(sentenciaSQL, data)
                 self.conexion.commit()
                 self.conexion.close()
            

        except:
            print("No se pudo establecer conexion a la Base de Datos")



# Cuarta operacion del CRUD: DELETE O ELIMINAR
# Accion de eliminar el registro de un cliente en la BD.
# Realizado por Maria josé Malbran

def eliminarCliente(self, ID):
    if self.conexion.is_conected():
        try:
             cursor = self.conexion.cursor()
             sentenciaSQL = "DELETE FROM Cliente WHERE id= ID"
             cursor.execute(sentenciaSQL)
             self.conexion.commit()
             self.conexion.close()

        except:
             print("No se pudo establecer conexion a la Base de Datos")

