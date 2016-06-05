package de.extremeenvironment.edgeserver.repository;

import de.extremeenvironment.edgeserver.domain.Newdisaster;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Newdisaster entity.
 */
@SuppressWarnings("unused")
public interface NewdisasterRepository extends JpaRepository<Newdisaster,Long> {

}
