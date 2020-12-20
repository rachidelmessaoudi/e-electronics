package backendecomm.demo.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table()
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @ManyToOne
    private Country country;
}
