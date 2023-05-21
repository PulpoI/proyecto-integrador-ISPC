export class Usuarios {
 
    nombre: string;
    apellido: string;
    dni: number;
    fecha_nacimiento: string;
    email: string;
    password: string;
    
  
    constructor(nombre: string,apellido: string, dni: number, fecha_nacimiento: string,email:string, password:string) {
    
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.fecha_nacimiento = fecha_nacimiento;
      this.email = email;
      this.password = password;
      }
  
  }