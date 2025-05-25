package co.edu.unbosque.model.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ClienteTarjetaDTO {
    private int clienteId;
    private String email;
    private String nombre;
    private String numeroTarjeta;
    private String franquicia;
    private String fechaVencimiento;
    private String estado;
    private BigDecimal cupoTotal;
    private BigDecimal cupoDisponible;
}
