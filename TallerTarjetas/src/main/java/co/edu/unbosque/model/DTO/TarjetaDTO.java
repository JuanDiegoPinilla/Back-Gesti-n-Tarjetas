package co.edu.unbosque.model.DTO;

import lombok.Data;

@Data
public class TarjetaDTO {
    private int clienteId;
    private String email;
    private String nombre;
    private String numeroTarjeta;
    private String fechaVencimiento;
    private double cupoTotal;
    private double cupoDisponible;
    private String estado;
    private String franquicia;
}

