package de.extremeenvironment.edgeserver.web.rest;

import de.extremeenvironment.edgeserver.EdgeServerApp;
import de.extremeenvironment.edgeserver.domain.Newdisaster;
import de.extremeenvironment.edgeserver.repository.NewdisasterRepository;

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
 * Test class for the NewdisasterResource REST controller.
 *
 * @see NewdisasterResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = EdgeServerApp.class)
@WebAppConfiguration
@IntegrationTest
public class NewdisasterResourceIntTest {


    @Inject
    private NewdisasterRepository newdisasterRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restNewdisasterMockMvc;

    private Newdisaster newdisaster;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        NewdisasterResource newdisasterResource = new NewdisasterResource();
        ReflectionTestUtils.setField(newdisasterResource, "newdisasterRepository", newdisasterRepository);
        this.restNewdisasterMockMvc = MockMvcBuilders.standaloneSetup(newdisasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        newdisaster = new Newdisaster();
    }

    @Test
    @Transactional
    public void createNewdisaster() throws Exception {
        int databaseSizeBeforeCreate = newdisasterRepository.findAll().size();

        // Create the Newdisaster

        restNewdisasterMockMvc.perform(post("/api/newdisasters")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(newdisaster)))
                .andExpect(status().isCreated());

        // Validate the Newdisaster in the database
        List<Newdisaster> newdisasters = newdisasterRepository.findAll();
        assertThat(newdisasters).hasSize(databaseSizeBeforeCreate + 1);
        Newdisaster testNewdisaster = newdisasters.get(newdisasters.size() - 1);
    }

    @Test
    @Transactional
    public void getAllNewdisasters() throws Exception {
        // Initialize the database
        newdisasterRepository.saveAndFlush(newdisaster);

        // Get all the newdisasters
        restNewdisasterMockMvc.perform(get("/api/newdisasters?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(newdisaster.getId().intValue())));
    }

    @Test
    @Transactional
    public void getNewdisaster() throws Exception {
        // Initialize the database
        newdisasterRepository.saveAndFlush(newdisaster);

        // Get the newdisaster
        restNewdisasterMockMvc.perform(get("/api/newdisasters/{id}", newdisaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(newdisaster.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNewdisaster() throws Exception {
        // Get the newdisaster
        restNewdisasterMockMvc.perform(get("/api/newdisasters/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNewdisaster() throws Exception {
        // Initialize the database
        newdisasterRepository.saveAndFlush(newdisaster);
        int databaseSizeBeforeUpdate = newdisasterRepository.findAll().size();

        // Update the newdisaster
        Newdisaster updatedNewdisaster = new Newdisaster();
        updatedNewdisaster.setId(newdisaster.getId());

        restNewdisasterMockMvc.perform(put("/api/newdisasters")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedNewdisaster)))
                .andExpect(status().isOk());

        // Validate the Newdisaster in the database
        List<Newdisaster> newdisasters = newdisasterRepository.findAll();
        assertThat(newdisasters).hasSize(databaseSizeBeforeUpdate);
        Newdisaster testNewdisaster = newdisasters.get(newdisasters.size() - 1);
    }

    @Test
    @Transactional
    public void deleteNewdisaster() throws Exception {
        // Initialize the database
        newdisasterRepository.saveAndFlush(newdisaster);
        int databaseSizeBeforeDelete = newdisasterRepository.findAll().size();

        // Get the newdisaster
        restNewdisasterMockMvc.perform(delete("/api/newdisasters/{id}", newdisaster.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Newdisaster> newdisasters = newdisasterRepository.findAll();
        assertThat(newdisasters).hasSize(databaseSizeBeforeDelete - 1);
    }
}
