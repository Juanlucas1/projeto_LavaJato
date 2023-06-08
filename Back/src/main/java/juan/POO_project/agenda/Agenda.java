package juan.POO_project.agenda;


import jakarta.persistence.*;
import juan.POO_project.cliente.Cliente;
import juan.POO_project.lava_jato.Lava_jato;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_servico;
    private String servicos;
    private String hora;
    private String data;
    private String nome;

    public Long getId() {
        return id_servico;
    }
    //@ManyToOne
    //@JoinColumn(name = "id_cliente")
    //private Cliente id_cliente;
    //@OneToOne
    //@JoinColumn(name = "id_lava_jato")
    //private Lava_jato id_lava_jato;

}
