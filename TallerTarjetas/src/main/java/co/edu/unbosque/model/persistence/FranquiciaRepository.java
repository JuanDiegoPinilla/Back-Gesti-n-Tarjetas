package co.edu.unbosque.model.persistence;

import co.edu.unbosque.model.entity.Franquicia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FranquiciaRepository extends JpaRepository<Franquicia, Integer> {
    Optional<Franquicia> findByNombre(String nombre);
}
