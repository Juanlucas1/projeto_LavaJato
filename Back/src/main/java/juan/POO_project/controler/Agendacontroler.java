package juan.POO_project.controler;

import juan.POO_project.agenda.Agenda;
import juan.POO_project.agenda.AgendaRepository;
import juan.POO_project.lava_jato.Lava_jato;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@AllArgsConstructor
public class Agendacontroler {

    private final AgendaRepository repository;
    @GetMapping("/agenda")
    public List<Agenda> getALLagenda(){
        return repository.findAll();

    }

    @GetMapping("/agenda/{id_servico}")
    public ResponseEntity<Agenda> getAgendaById(@PathVariable Long id_servico) {
        Optional<Agenda> optionalAgenda = repository.findById(id_servico);
        if (optionalAgenda.isPresent()) {
            Agenda agenda = optionalAgenda.get();
            return ResponseEntity.ok(agenda);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/agenda")
    public ResponseEntity<Long> saveagenda(@RequestBody Agenda agenda) {
        if (agenda.getId_servico() != null) {
            // A agenda já possui um ID, então é uma atualização, não uma nova criação
            return ResponseEntity.ok(agenda.getId_servico());
        }

        Agenda savedAgenda = repository.save(agenda);
        Long savedAgendaId = savedAgenda.getId_servico();
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAgendaId);
    }

    @DeleteMapping("/agenda/{id_servico}")
    public void Deleteagenda(@PathVariable Long id_servico){
        repository.deleteById(id_servico);

    }



}
