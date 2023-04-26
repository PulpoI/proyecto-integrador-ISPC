# Tercera operacion del CRUD: UPDATE O ACTUALIZAR.
# Accion de actualizar un registro de algún cliente en la BD.

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
