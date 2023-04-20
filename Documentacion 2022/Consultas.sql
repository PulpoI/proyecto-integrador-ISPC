                         -- Consultas
-- Ingresando registros en las tablas  

INSERT INTO plan(nombre, descripcion, cantidad_clases, fecha_inicio) VALUES ("Pro", "Musc libre", 30 ,"2022-02-12");
INSERT INTO plan(nombre, descripcion, cantidad_clases, fecha_inicio) VALUES ("Premium", "Musc libre + 8 Clases + plan nutr + desc tienda fitness 50%", 30, "2022-07-05");
INSERT INTO plan(nombre, descripcion, cantidad_clases, fecha_inicio) VALUES ("Platinum", "Musc libre + Clases libres + plan nutr + desc tienda fitness 50% + spa", 30, "2022-02-10");

INSERT INTO cliente(nombre, apellido, id_plan, dni, contraseña, fecha_nacimiento, correo) 
VALUES ("Soledad", "Nieto", 1 , 22345123, "abc1234", "1989-04-10", "abc@gmail.com");
INSERT INTO cliente(nombre, apellido, id_plan, dni, contraseña, fecha_nacimiento, correo) 
VALUES ("Maria", "Gomez", 2 , 30101034, "cba12345", "1982-09-30", "maria_gomezc@gmail.com");
INSERT INTO cliente(nombre, apellido, id_plan, dni, contraseña, fecha_nacimiento, correo) 
VALUES ("Antonella", "Bart", 3 , 33654122, "abcd1234", "1990-06-01", "anto1@gmail.com");
INSERT INTO cliente(nombre, apellido, id_plan, dni, contraseña, fecha_nacimiento, correo) 
VALUES ("javier", "Heredia", 2 , 32004122, "abcde223", "1991-04-11", "jheredia1@hotmail.com");
INSERT INTO cliente(nombre, apellido, id_plan, dni, contraseña, fecha_nacimiento, correo) 
VALUES ("Jose", "Bustos", 3 , 36004122, "bustos2233", "1999-08-24", "jose233@hotmail.com");

INSERT INTO reserva(id_cliente) VALUES (2);
INSERT INTO reserva(id_cliente) VALUES (1);
INSERT INTO reserva(id_cliente) VALUES (3);
INSERT INTO reserva(id_cliente) VALUES (2);
INSERT INTO reserva(id_cliente) VALUES (4);
INSERT INTO reserva(id_cliente) VALUES (5);


                             -- CONSULTAS SELECT
-- Muestra todos lo cliente ordenados de forma ascendente
Select *
From cliente 
Order by nombre asc;

-- Muestra todas las reservar
select * from reserva;

-- Muestra el apellido y nombre del cliente con su numero de reserva ordenado de forma desc 
select c.apellido, c.nombre, r.id "Numero de reserva"
from reserva r, cliente c
where r.id = c.id
order by c.apellido asc ;

-- Muestra nombre y apellido del cliente, el plan con fecha de inicio mayor al 09/02/2022
Select c.nombre, c.apellido, p.nombre, fecha_inicio
From plan p, cliente c
where p.id = c.id 
and fecha_inicio > '2022/02/09'
order by c.apellido desc;


							-- UPDATE
-- Modificamos la fecha de nac y correo del cliente con id 2

UPDATE cliente
SET fecha_nacimiento = "1979-04-19",
	correo = "soledad_nieto@gmail.com"
WHERE id = 1;

UPDATE cliente
SET contraseña = "mariab123456"
Where id = 2;

-- JOIN
-- Muestra todos lo cliente que tienen el plan Pro y la fecha de inicio del mismo. --

Select c.nombre, c.apellido, p.nombre "Plan", p.fecha_inicio
From cliente c
Inner Join plan p
On c.id = p.id 
Where p.nombre = "Pro"; 

-- Muestra al cliente de apellido Bustos con su numero de reserva

Select c.nombre, c.apellido, r.id "Numero de reserva"
From cliente c
Inner Join reserva r
On c.id = r.id_cliente
Where c.apellido= "Bustos";