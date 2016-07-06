package de.extremeenvironment.edgeserver.web.rest;

import de.extremeenvironment.edgeserver.EdgeServerApp;
import de.extremeenvironment.edgeserver.domain.Wanted;
import de.extremeenvironment.edgeserver.repository.WantedRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the WantedResource REST controller.
 *
 * @see WantedResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = EdgeServerApp.class)
@WebAppConfiguration
@IntegrationTest
public class WantedResourceIntTest {


    @Inject
    private WantedRepository wantedRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restWantedMockMvc;

    private Wanted wanted;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        WantedResource wantedResource = new WantedResource();
        ReflectionTestUtils.setField(wantedResource, "wantedRepository", wantedRepository);
        this.restWantedMockMvc = MockMvcBuilders.standaloneSetup(wantedResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        wanted = new Wanted();
    }

    @Test
    @Transactional
    public void createWanted() throws Exception {
        int databaseSizeBeforeCreate = wantedRepository.findAll().size();

        // Create the Wanted

        restWantedMockMvc.perform(post("/api/wanteds")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(wanted)))
                .andExpect(status().isCreated());

        // Validate the Wanted in the database
        List<Wanted> wanteds = wantedRepository.findAll();
        assertThat(wanteds).hasSize(databaseSizeBeforeCreate + 1);
        Wanted testWanted = wanteds.get(wanteds.size() - 1);
    }

    @Test
    @Transactional
    public void getAllWanteds() throws Exception {
        // Initialize the database
        wantedRepository.saveAndFlush(wanted);

        // Get all the wanteds
        restWantedMockMvc.perform(get("/api/wanteds?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(wanted.getId().intValue())));
    }

    @Test
    @Transactional
    public void getWanted() throws Exception {
        // Initialize the database
        wantedRepository.saveAndFlush(wanted);

        // Get the wanted
        restWantedMockMvc.perform(get("/api/wanteds/{id}", wanted.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(wanted.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWanted() throws Exception {
        // Get the wanted
        restWantedMockMvc.perform(get("/api/wanteds/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWanted() throws Exception {
        // Initialize the database
        wantedRepository.saveAndFlush(wanted);
        int databaseSizeBeforeUpdate = wantedRepository.findAll().size();

        // Update the wanted
        Wanted updatedWanted = new Wanted();
        updatedWanted.setId(wanted.getId());

        restWantedMockMvc.perform(put("/api/wanteds")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedWanted)))
                .andExpect(status().isOk());

        // Validate the Wanted in the database
        List<Wanted> wanteds = wantedRepository.findAll();
        assertThat(wanteds).hasSize(databaseSizeBeforeUpdate);
        Wanted testWanted = wanteds.get(wanteds.size() - 1);
    }

    @Test
    @Transactional
    public void deleteWanted() throws Exception {
        // Initialize the database
        wantedRepository.saveAndFlush(wanted);
        int databaseSizeBeforeDelete = wantedRepository.findAll().size();

        // Get the wanted
        restWantedMockMvc.perform(delete("/api/wanteds/{id}", wanted.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Wanted> wanteds = wantedRepository.findAll();
        assertThat(wanteds).hasSize(databaseSizeBeforeDelete - 1);
    }
}
