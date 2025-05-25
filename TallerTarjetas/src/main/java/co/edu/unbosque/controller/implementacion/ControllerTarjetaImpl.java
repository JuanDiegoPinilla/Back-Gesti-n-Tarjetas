package co.edu.unbosque.controller.implementacion;

import co.edu.unbosque.controller.interfaces.ControllerTarjeta;
import co.edu.unbosque.model.DTO.TarjetaDTO;
import co.edu.unbosque.service.interfaces.TarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tarjetas")
public class ControllerTarjetaImpl implements ControllerTarjeta {

    @Autowired
    private TarjetaService tarjetaService;

    @PostMapping
    public ResponseEntity<String> crearTarjeta(@RequestBody TarjetaDTO tarjetaDTO) {
        try {
            tarjetaService.guardarTarjeta(tarjetaDTO);
            return ResponseEntity.ok("Tarjeta guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
