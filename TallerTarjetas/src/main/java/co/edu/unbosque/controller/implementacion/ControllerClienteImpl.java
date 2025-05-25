package co.edu.unbosque.controller.implementacion;

import co.edu.unbosque.controller.interfaces.ControllerCliente;
import co.edu.unbosque.model.DTO.ClienteTarjetaDTO;
import co.edu.unbosque.service.interfaces.ClienteTarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ControllerClienteImpl implements ControllerCliente {

    @Autowired
    private ClienteTarjetaService clienteTarjetaService;

    @GetMapping("/buscar")
    public ResponseEntity<List<ClienteTarjetaDTO>> buscarPorIdOEmail(@RequestParam String valor) {
        List<ClienteTarjetaDTO> resultado = clienteTarjetaService.buscarClienteConTarjetas(valor);
        return ResponseEntity.ok(resultado);
    }
}
