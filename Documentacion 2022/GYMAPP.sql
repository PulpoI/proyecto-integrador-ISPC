CREATE DATABASE GYM

CREATE TABLE [Administrador] 
(
 [id]         integer NOT NULL ,
 [contraseña] varchar(50) NOT NULL ,
 [id_bloque]  integer NOT NULL ,
 [nombre]     varchar(50) NOT NULL ,
 [apellido]   varchar(50) NOT NULL ,
 [correo]     varchar(60) NOT NULL ,


PRIMARY KEY (id),
 CONSTRAINT [FK_4] FOREIGN KEY ([id_bloque])  REFERENCES [Bloque]([id])
);
GO




CREATE TABLE [Bloque]
(
 [id]                  integer NOT NULL ,
 [nombre]              varchar(50) NOT NULL ,
 [id_cliente]          integer NOT NULL ,
 [descripcion]         varchar(150) NOT NULL ,
 [fecha]               datetime NOT NULL ,
 [hora_inicio]         datetime NOT NULL ,
 [fecha_fin]           datetime NOT NULL ,
 [limites_cupos]       integer NOT NULL ,
 [cantidad_inscriptos] integer NOT NULL ,
 [estado_bloque]       varchar(30) NOT NULL ,


 PRIMARY KEY (id),
 CONSTRAINT [FK_2] FOREIGN KEY ([id_cliente])  REFERENCES [Cliente]([id])
);
GO



CREATE TABLE [Cliente]
(
 [id]               integer NOT NULL ,
 [nombre]           varchar(50) NOT NULL ,
 [id_plan]          integer NOT NULL ,
 [apellido]         varchar(50) NOT NULL ,
 [dni]              varchar(50) NOT NULL ,
 [contraseña]       varchar(50) NOT NULL ,
 [fecha_nacimiento] date NOT NULL ,
 [correo]           varchar(50) NOT NULL ,

 PRIMARY KEY (id),
 CONSTRAINT [FK_3] FOREIGN KEY ([id_plan])  REFERENCES [Plan]([id])
);
GO




CREATE TABLE [Plan]
(
 [id]              integer NOT NULL ,
 [nombre]          varchar(50) NOT NULL ,
 [descripcion]     varchar(150) NOT NULL ,
 [cantidad_clases] integer NOT NULL ,
 [fecha_inicio]    datetime NOT NULL ,


 PRIMARY KEY CLUSTERED (id)
);
GO

CREATE TABLE [Reserva]
(
 [id]         integer NOT NULL ,
 [id_cliente] integer NOT NULL ,


 PRIMARY KEY (id),
 CONSTRAINT [FK_1] FOREIGN KEY ([id_cliente])  REFERENCES [Cliente]([id])
);
GO


