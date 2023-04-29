# Cuarta operacion del CRUD: DELETE O ELIMINAR
# Accion de eliminar el registro de un cliente en la BD.

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

