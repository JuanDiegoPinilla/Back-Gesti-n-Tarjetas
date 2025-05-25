package co.edu.unbosque.service.implementacion;

import co.edu.unbosque.model.DTO.TarjetaDTO;
import co.edu.unbosque.model.entity.Cliente;
import co.edu.unbosque.model.entity.Estado;
import co.edu.unbosque.model.entity.Franquicia;
import co.edu.unbosque.model.entity.Tarjeta;
import co.edu.unbosque.model.persistence.ClienteRepository;
import co.edu.unbosque.model.persistence.EstadoRepository;
import co.edu.unbosque.model.persistence.FranquiciaRepository;
import co.edu.unbosque.model.persistence.TarjetaRepository;
import co.edu.unbosque.service.interfaces.TarjetaService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class TarjetaServiceImpl implements TarjetaService {

    @Autowired
    private ClienteRepository clienteRepo;

    @Autowired
    private EstadoRepository estadoRepo;

    @Autowired
    private FranquiciaRepository franquiciaRepo;

    @Autowired
    private TarjetaRepository tarjetaRepo;

    @Autowired
    private ModelMapper modelMapper;

    /*Juan Diego Castro Pinilla
    * Aca implementamos Correctamente el servicio donde guardaremos la informacion en la base de datos */
    @Transactional
    public void guardarTarjeta(TarjetaDTO dto) {
        Cliente cliente = clienteRepo.findById(Integer.valueOf(dto.getClienteId()))
                .orElseGet(() -> {
                    Cliente nuevoCliente = modelMapper.map(dto, Cliente.class);
                    nuevoCliente.setClienteId(dto.getClienteId());
                    return clienteRepo.save(nuevoCliente);
                });

        Estado estado = estadoRepo.findByNombre(dto.getEstado())
                .orElseThrow(() -> new RuntimeException("Estado no encontrado"));

        String numero = dto.getNumeroTarjeta().replaceAll("\\s+", "");
        String franquiciaDetectada = detectarFranquicia(numero);
        if (!longitudValida(numero, franquiciaDetectada)) {
            throw new RuntimeException("Número de tarjeta inválido para franquicia " + franquiciaDetectada);
        }

        Franquicia franquicia = franquiciaRepo.findByNombre(franquiciaDetectada)
                .orElseThrow(() -> new RuntimeException("Franquicia no encontrada: " + franquiciaDetectada));

        Tarjeta tarjeta = new Tarjeta();
        tarjeta.setNumeroTarjeta(numero);
        tarjeta.setCliente(cliente);
        tarjeta.setEstado(estado);
        tarjeta.setFranquicia(franquicia);
        tarjeta.setFechaVencimiento(dto.getFechaVencimiento());
        tarjeta.setCupoTotal(BigDecimal.valueOf(dto.getCupoTotal()));
        tarjeta.setCupoDisponible(BigDecimal.valueOf(dto.getCupoDisponible()));
        tarjeta.setFechaRegistro(Instant.now());

        tarjetaRepo.save(tarjeta);
    }


    private String detectarFranquicia(String numero) {
        if (numero.startsWith("4")) {
            return "VISA";
        } else if (numero.matches("^5[1-5].*") || numero.matches("^2(2[2-9]|[3-6]|7[01]|720).*")) {
            return "MASTERCARD";
        } else if (numero.startsWith("34") || numero.startsWith("37")) {
            return "AMERICAN EXPRESS";
        } else {
            throw new RuntimeException("Franquicia no reconocida para número: " + numero);
        }
    }

    private boolean longitudValida(String numero, String franquicia) {
        int length = numero.length();
        return switch (franquicia) {
            case "VISA" -> length == 13 || length == 16 || length == 19;
            case "MASTERCARD" -> length == 16;
            case "AMERICAN EXPRESS" -> length == 15;
            default -> false;
        };
    }

}
