# Segunda operacion del CRUD: READ O LEER.
# Accion de realizar un busqueda en la BD un Plan disponible para el cliente.


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

