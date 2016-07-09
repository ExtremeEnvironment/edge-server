package de.extremeenvironment.edgeserver.repository;

import de.extremeenvironment.edgeserver.domain.Wanted;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Wanted entity.
 */
@SuppressWarnings("unused")
public interface WantedRepository extends JpaRepository<Wanted,Long> {

}
