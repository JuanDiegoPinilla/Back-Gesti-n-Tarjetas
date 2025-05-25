package co.edu.unbosque.model.persistence;

import co.edu.unbosque.model.entity.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarjetaRepository extends JpaRepository<Tarjeta, String> {
}
