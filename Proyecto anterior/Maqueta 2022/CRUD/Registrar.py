# Primera operacion del CRUD: CREATE O INSERT.
# Acccion de Insertar valor a la BD mediante el registro de un usuario.

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
