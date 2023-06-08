package juan.POO_project.controler;

import juan.POO_project.proprietario.Proprietario;
import juan.POO_project.proprietario.ProprietarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class Proprietariocontroler {

    private final ProprietarioRepository repository;

    @GetMapping("/proprietario")
    public List<Proprietario> getAllProprietarios() {
        return repository.findAll();
    }

    @GetMapping("/proprietario/{id_proprietario}")
    public ResponseEntity<Proprietario> getLavaJatoById(@PathVariable Long id_proprietario) {
        Optional<Proprietario> optionalProprietario = repository.findById(id_proprietario);
        if (optionalProprietario.isPresent()) {
            Proprietario proprietario = optionalProprietario.get();
            return ResponseEntity.ok(proprietario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/proprietario")
    public Proprietario saveProprietario(@RequestBody Proprietario proprietario) {
        return repository.save(proprietario);

    }


    @DeleteMapping("/proprietario/{id_proprietario}")
    public void deleteProprietario(@PathVariable Long id_proprietario) {
        repository.deleteById(id_proprietario);
    }
}