package co.edu.unbosque.controller.interfaces;

import co.edu.unbosque.model.DTO.TarjetaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface ControllerTarjeta {
    ResponseEntity<String> crearTarjeta(@RequestBody TarjetaDTO tarjetaDTO);
}
