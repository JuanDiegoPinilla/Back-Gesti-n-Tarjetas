package co.edu.unbosque.model.persistence;

import co.edu.unbosque.model.entity.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoRepository extends JpaRepository<Movimiento, Integer> {
}
