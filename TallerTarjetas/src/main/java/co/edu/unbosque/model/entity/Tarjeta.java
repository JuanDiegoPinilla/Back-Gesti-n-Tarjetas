package co.edu.unbosque.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tarjetas")
public class Tarjeta {
    @Id
    @Column(name = "numero_tarjeta", nullable = false, length = 20)
    private String numeroTarjeta;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "franquicia_id")
    private Franquicia franquicia;

    @Column(name = "fecha_vencimiento", length = 7)
    private String fechaVencimiento;

    @ManyToOne(fetch = FetchType.LAZY)
    @ColumnDefault("1")
    @JoinColumn(name = "estado_id")
    private Estado estado;

    @Column(name = "cupo_total", nullable = false, precision = 15, scale = 2)
    private BigDecimal cupoTotal;

    @Column(name = "cupo_disponible", nullable = false, precision = 15, scale = 2)
    private BigDecimal cupoDisponible;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_registro")
    private Instant fechaRegistro;

}