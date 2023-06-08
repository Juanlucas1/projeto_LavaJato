package juan.POO_project.proprietario;

import jakarta.persistence.*;
import juan.POO_project.lava_jato.Lava_jato;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Proprietario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_proprietario;
    private String nome;
    private String email;
    private String telefone;


}
