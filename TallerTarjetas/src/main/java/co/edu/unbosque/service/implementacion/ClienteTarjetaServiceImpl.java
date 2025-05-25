package co.edu.unbosque.service.implementacion;

import co.edu.unbosque.model.DTO.ClienteTarjetaDTO;
import co.edu.unbosque.model.entity.Cliente;
import co.edu.unbosque.model.persistence.ClienteRepository;
import co.edu.unbosque.service.interfaces.ClienteTarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteTarjetaServiceImpl implements ClienteTarjetaService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteTarjetaDTO> buscarClienteConTarjetas(String input) {
        Optional<Cliente> clienteOpt;

        if (input.contains("@")) {
            clienteOpt = clienteRepository.findByEmail(input);
        } else {
            clienteOpt = clienteRepository.findById(Integer.valueOf(input));
        }

        if (clienteOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado");
        }

        Cliente cliente = clienteOpt.get();

        return cliente.getTarjetas().stream().map(tarjeta -> {
            ClienteTarjetaDTO dto = new ClienteTarjetaDTO();
            dto.setClienteId(cliente.getClienteId());
            dto.setEmail(cliente.getEmail());
            dto.setNombre(cliente.getNombre());
            dto.setNumeroTarjeta(tarjeta.getNumeroTarjeta());
            dto.setFranquicia(tarjeta.getFranquicia().getNombre());
            dto.setFechaVencimiento(tarjeta.getFechaVencimiento());
            dto.setEstado(tarjeta.getEstado().getNombre());
            dto.setCupoTotal(tarjeta.getCupoTotal());
            dto.setCupoDisponible(tarjeta.getCupoDisponible());
            return dto;
        }).collect(Collectors.toList());
    }
}
