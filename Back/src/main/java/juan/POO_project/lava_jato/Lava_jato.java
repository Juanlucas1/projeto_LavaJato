package juan.POO_project.lava_jato;

import jakarta.persistence.*;
import juan.POO_project.proprietario.Proprietario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lava_jato {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_lava_jato;
    private String servicos;
    private String ceep;
    private String localizacao;
    private String telefone;
    private String nome;
    private String email;
    //@ManyToOne
    //@JoinColumn(name = "id_proprietario")
    //private Proprietario id_proprietario;


}
