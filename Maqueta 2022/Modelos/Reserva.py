class Reserva:
    id_reserva = 0
    id_cliente = 0
    id_bloque = 0


    def __init__(self, id_reserva, id_cliente, id_bloque) :
        self.id_reserva = id_reserva
        self.id_cliente = id_cliente
        self.id_bloque = id_bloque

    def get_id_reserva(self):
        return self.id_reserva

    def set_id_reserva(self,id_reserva):
        self.id_reserva = id_reserva

    def get_id_cliente(self):
        return self.id_cliente

    def set_id_cliente(self,id_cliente):
        self.id_cliente = id_cliente

    def get_id_bloque(self):
        return self.id_bloque

    def set_id_bloque(self,id_bloque):
        self.id_bloque = id_bloque


# consultarDisponibilidadCupo()
    


    