package juan.POO_project.cliente;

import jakarta.persistence.*;
import juan.POO_project.agenda.Agenda;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id_cliente;
   private String nome;
   private String email;
   private String telefone;
   private String senha;
   private String username;

}
