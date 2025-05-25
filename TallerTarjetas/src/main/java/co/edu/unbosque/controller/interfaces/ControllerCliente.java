package co.edu.unbosque.controller.interfaces;

import co.edu.unbosque.model.DTO.ClienteTarjetaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ControllerCliente {
    ResponseEntity<List<ClienteTarjetaDTO>> buscarPorIdOEmail(@RequestParam String valor);
}
