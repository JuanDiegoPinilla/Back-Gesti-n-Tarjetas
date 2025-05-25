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
@Table(name = "movimientos")
public class Movimiento {
    @Id
    @Column(name = "movimiento_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "numero_tarjeta")
    private Tarjeta numeroTarjeta;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "fecha_movimiento")
    private Instant fechaMovimiento;

    @Lob
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "monto", nullable = false, precision = 15, scale = 2)
    private BigDecimal monto;

    @Column(name = "descripcion")
    private String descripcion;

}