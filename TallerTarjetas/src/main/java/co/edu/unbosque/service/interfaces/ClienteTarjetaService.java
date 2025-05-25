package co.edu.unbosque.service.interfaces;

import co.edu.unbosque.model.DTO.ClienteTarjetaDTO;

import java.util.List;

public interface ClienteTarjetaService {
    List<ClienteTarjetaDTO> buscarClienteConTarjetas(String input);
}
