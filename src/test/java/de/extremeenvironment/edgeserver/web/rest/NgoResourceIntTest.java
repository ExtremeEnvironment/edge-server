package de.extremeenvironment.edgeserver.web.rest;

import de.extremeenvironment.edgeserver.EdgeServerApp;
import de.extremeenvironment.edgeserver.domain.Ngo;
import de.extremeenvironment.edgeserver.repository.NgoRepository;

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
 * Test class for the NgoResource REST controller.
 *
 * @see NgoResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = EdgeServerApp.class)
@WebAppConfiguration
@IntegrationTest
public class NgoResourceIntTest {


    @Inject
    private NgoRepository ngoRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restNgoMockMvc;

    private Ngo ngo;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        NgoResource ngoResource = new NgoResource();
        ReflectionTestUtils.setField(ngoResource, "ngoRepository", ngoRepository);
        this.restNgoMockMvc = MockMvcBuilders.standaloneSetup(ngoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        ngo = new Ngo();
    }

    @Test
    @Transactional
    public void createNgo() throws Exception {
        int databaseSizeBeforeCreate = ngoRepository.findAll().size();

        // Create the Ngo

        restNgoMockMvc.perform(post("/api/ngos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(ngo)))
                .andExpect(status().isCreated());

        // Validate the Ngo in the database
        List<Ngo> ngos = ngoRepository.findAll();
        assertThat(ngos).hasSize(databaseSizeBeforeCreate + 1);
        Ngo testNgo = ngos.get(ngos.size() - 1);
    }

    @Test
    @Transactional
    public void getAllNgos() throws Exception {
        // Initialize the database
        ngoRepository.saveAndFlush(ngo);

        // Get all the ngos
        restNgoMockMvc.perform(get("/api/ngos?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(ngo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getNgo() throws Exception {
        // Initialize the database
        ngoRepository.saveAndFlush(ngo);

        // Get the ngo
        restNgoMockMvc.perform(get("/api/ngos/{id}", ngo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(ngo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNgo() throws Exception {
        // Get the ngo
        restNgoMockMvc.perform(get("/api/ngos/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNgo() throws Exception {
        // Initialize the database
        ngoRepository.saveAndFlush(ngo);
        int databaseSizeBeforeUpdate = ngoRepository.findAll().size();

        // Update the ngo
        Ngo updatedNgo = new Ngo();
        updatedNgo.setId(ngo.getId());

        restNgoMockMvc.perform(put("/api/ngos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedNgo)))
                .andExpect(status().isOk());

        // Validate the Ngo in the database
        List<Ngo> ngos = ngoRepository.findAll();
        assertThat(ngos).hasSize(databaseSizeBeforeUpdate);
        Ngo testNgo = ngos.get(ngos.size() - 1);
    }

    @Test
    @Transactional
    public void deleteNgo() throws Exception {
        // Initialize the database
        ngoRepository.saveAndFlush(ngo);
        int databaseSizeBeforeDelete = ngoRepository.findAll().size();

        // Get the ngo
        restNgoMockMvc.perform(delete("/api/ngos/{id}", ngo.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Ngo> ngos = ngoRepository.findAll();
        assertThat(ngos).hasSize(databaseSizeBeforeDelete - 1);
    }
}
