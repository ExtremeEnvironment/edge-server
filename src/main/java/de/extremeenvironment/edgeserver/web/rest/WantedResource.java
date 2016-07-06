package de.extremeenvironment.edgeserver.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.extremeenvironment.edgeserver.domain.Wanted;
import de.extremeenvironment.edgeserver.repository.WantedRepository;
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
 * REST controller for managing Wanted.
 */
@RestController
@RequestMapping("/api")
public class WantedResource {

    private final Logger log = LoggerFactory.getLogger(WantedResource.class);
        
    @Inject
    private WantedRepository wantedRepository;
    
    /**
     * POST  /wanteds : Create a new wanted.
     *
     * @param wanted the wanted to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wanted, or with status 400 (Bad Request) if the wanted has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/wanteds",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wanted> createWanted(@RequestBody Wanted wanted) throws URISyntaxException {
        log.debug("REST request to save Wanted : {}", wanted);
        if (wanted.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("wanted", "idexists", "A new wanted cannot already have an ID")).body(null);
        }
        Wanted result = wantedRepository.save(wanted);
        return ResponseEntity.created(new URI("/api/wanteds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("wanted", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wanteds : Updates an existing wanted.
     *
     * @param wanted the wanted to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wanted,
     * or with status 400 (Bad Request) if the wanted is not valid,
     * or with status 500 (Internal Server Error) if the wanted couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/wanteds",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wanted> updateWanted(@RequestBody Wanted wanted) throws URISyntaxException {
        log.debug("REST request to update Wanted : {}", wanted);
        if (wanted.getId() == null) {
            return createWanted(wanted);
        }
        Wanted result = wantedRepository.save(wanted);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("wanted", wanted.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wanteds : get all the wanteds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of wanteds in body
     */
    @RequestMapping(value = "/wanteds",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Wanted> getAllWanteds() {
        log.debug("REST request to get all Wanteds");
        List<Wanted> wanteds = wantedRepository.findAll();
        return wanteds;
    }

    /**
     * GET  /wanteds/:id : get the "id" wanted.
     *
     * @param id the id of the wanted to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wanted, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/wanteds/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Wanted> getWanted(@PathVariable Long id) {
        log.debug("REST request to get Wanted : {}", id);
        Wanted wanted = wantedRepository.findOne(id);
        return Optional.ofNullable(wanted)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /wanteds/:id : delete the "id" wanted.
     *
     * @param id the id of the wanted to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/wanteds/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteWanted(@PathVariable Long id) {
        log.debug("REST request to delete Wanted : {}", id);
        wantedRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("wanted", id.toString())).build();
    }

}
