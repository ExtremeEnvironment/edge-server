package de.extremeenvironment.edgeserver.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Disaster.
 */
@Entity
@Table(name = "disaster")
public class Disaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Disaster disaster = (Disaster) o;
        if(disaster.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, disaster.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Disaster{" +
            "id=" + id +
            '}';
    }
}
