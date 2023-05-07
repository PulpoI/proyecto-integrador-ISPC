create	database EcommerceGymApp;
use EcommerceGymApp;

CREATE TABLE Reserva
(
 id int NOT NULL AUTO_INCREMENT,
 
 PRIMARY KEY (id)
);

CREATE TABLE Venta
(
 id_venta          int NOT NULL AUTO_INCREMENT,
 fecha             datetime NOT NULL,
 cantidad_vendida  int,
 total             int,
 PRIMARY KEY (id_venta)
);

CREATE TABLE Bloque
(
 id_Bloque           int NOT NULL AUTO_INCREMENT ,
 nombre              varchar(45) NOT NULL ,
 descripcion         varchar(150) NOT NULL ,
 fecha               datetime NOT NULL ,
 hora_inicio         datetime NOT NULL ,
 fecha_fin           datetime NOT NULL ,
 limites_cupos       int NOT NULL ,
 cantidad_inscriptos int NOT NULL ,
 estado_bloque       varchar(45) NOT NULL ,

 PRIMARY KEY (id_Bloque)
);

CREATE TABLE Plan
(
 id_plan         int NOT NULL AUTO_INCREMENT,
 nombre          varchar(45) NOT NULL ,
 descripcion     varchar(150) NOT NULL ,
 cantidad_clases int NOT NULL ,
 fecha_inicio    date NOT NULL ,
 id_venta        int NOT NULL,
 
 PRIMARY KEY (id_plan),
 Constraint	fk_venta_plan FOREIGN KEY (id_venta) REFERENCES  venta(id_venta)
);

CREATE TABLE Cliente
(
 id_cliente       int NOT NULL AUTO_INCREMENT ,
 nombre           varchar(45) NOT NULL ,
 apellido         varchar(50) NOT NULL ,
 dni              varchar(45) NOT NULL ,
 contraseña       varchar(45) NOT NULL ,
 fecha_nacimiento date NOT NULL ,
 correo           varchar(45) NOT NULL ,
 id_Bloque         int NOT NULL,
 id               int NOT NULL,
 id_plan          int NOT NULL,

 PRIMARY KEY (id_cliente),
 CONSTRAINT fk_bloque_cliente FOREIGN KEY (id_Bloque)  REFERENCES Bloque(id_Bloque),
 CONSTRAINT fk_reserva_cliente FOREIGN KEY (id)  REFERENCES reserva(id),
 CONSTRAINT fk_plan_cliente FOREIGN KEY (id_plan)  REFERENCES plan(id_plan)
);

CREATE TABLE Administrador 
(
 id         int NOT NULL AUTO_INCREMENT ,
 contraseña varchar(50) NOT NULL ,
 nombre     varchar(50) NOT NULL ,
 apellido   varchar(50) NOT NULL ,
 correo     varchar(60) NOT NULL ,
 id_Bloque  integer NOT NULL ,

 PRIMARY KEY (id),
 CONSTRAINT fk_bloque_adm FOREIGN KEY (id_Bloque)  REFERENCES Bloque(id_Bloque)
 );

 CREATE TABLE Producto 
(
 id_producto     int NOT NULL AUTO_INCREMENT ,
 nombre          varchar(50) NOT NULL ,
 descripcion     varchar(50) NOT NULL ,
 precio          int NOT NULL ,
 cantidad_stock  integer NOT NULL ,
 id_venta        int NOT NULL,
 id_cliente      int NOT NULL, 

 PRIMARY KEY (id_producto),
 CONSTRAINT fK_venta_producto FOREIGN KEY (id_venta)  REFERENCES venta(id_venta),
 CONSTRAINT fK_id_cliente_producto FOREIGN KEY (id_cliente)  REFERENCES cliente(id_cliente)
);