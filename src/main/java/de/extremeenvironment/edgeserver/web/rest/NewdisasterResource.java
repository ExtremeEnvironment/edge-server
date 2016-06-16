package de.extremeenvironment.edgeserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.extremeenvironment.edgeserver.domain.Newdisaster;
import de.extremeenvironment.edgeserver.repository.NewdisasterRepository;
import de.extremeenvironment.edgeserver.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Newdisaster.
 */
@RestController
@RequestMapping("/api")
public class NewdisasterResource {

    private final Logger log = LoggerFactory.getLogger(NewdisasterResource.class);
        
    @Inject
    private NewdisasterRepository newdisasterRepository;
    
    /**
     * POST  /newdisasters : Create a new newdisaster.
     *
     * @param newdisaster the newdisaster to create
     * @return the ResponseEntity with status 201 (Created) and with body the new newdisaster, or with status 400 (Bad Request) if the newdisaster has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/newdisasters",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Newdisaster> createNewdisaster(@RequestBody Newdisaster newdisaster) throws URISyntaxException {
        log.debug("REST request to save Newdisaster : {}", newdisaster);
        if (newdisaster.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("newdisaster", "idexists", "A new newdisaster cannot already have an ID")).body(null);
        }
        Newdisaster result = newdisasterRepository.save(newdisaster);
        return ResponseEntity.created(new URI("/api/newdisasters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("newdisaster", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /newdisasters : Updates an existing newdisaster.
     *
     * @param newdisaster the newdisaster to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated newdisaster,
     * or with status 400 (Bad Request) if the newdisaster is not valid,
     * or with status 500 (Internal Server Error) if the newdisaster couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/newdisasters",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Newdisaster> updateNewdisaster(@RequestBody Newdisaster newdisaster) throws URISyntaxException {
        log.debug("REST request to update Newdisaster : {}", newdisaster);
        if (newdisaster.getId() == null) {
            return createNewdisaster(newdisaster);
        }
        Newdisaster result = newdisasterRepository.save(newdisaster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("newdisaster", newdisaster.getId().toString()))
            .body(result);
    }

    /**
     * GET  /newdisasters : get all the newdisasters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of newdisasters in body
     */
    @RequestMapping(value = "/newdisasters",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Newdisaster> getAllNewdisasters() {
        log.debug("REST request to get all Newdisasters");
        List<Newdisaster> newdisasters = newdisasterRepository.findAll();
        return newdisasters;
    }

    /**
     * GET  /newdisasters/:id : get the "id" newdisaster.
     *
     * @param id the id of the newdisaster to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the newdisaster, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/newdisasters/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Newdisaster> getNewdisaster(@PathVariable Long id) {
        log.debug("REST request to get Newdisaster : {}", id);
        Newdisaster newdisaster = newdisasterRepository.findOne(id);
        return Optional.ofNullable(newdisaster)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /newdisasters/:id : delete the "id" newdisaster.
     *
     * @param id the id of the newdisaster to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/newdisasters/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteNewdisaster(@PathVariable Long id) {
        log.debug("REST request to delete Newdisaster : {}", id);
        newdisasterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("newdisaster", id.toString())).build();
    }

}
