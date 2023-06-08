package juan.POO_project.controler;

import juan.POO_project.lava_jato.Lava_jato;
import juan.POO_project.lava_jato.Lava_jatoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class Lava_jatocontroler {

    private final Lava_jatoRepository repository;
    @GetMapping("/lava_jato")
    public List<Lava_jato> getALLlava_jatos(){
        return repository.findAll();

    }
    @GetMapping("/lava_jato/{id_lava_jato}")
    public ResponseEntity<Lava_jato> getlava_jatoById(@PathVariable Long id_lava_jato) {
        Optional<Lava_jato> optionalLavaJato = repository.findById(id_lava_jato);
        if (optionalLavaJato.isPresent()) {
            Lava_jato lavaJato = optionalLavaJato.get();
            return ResponseEntity.ok(lavaJato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/lava_jato")
    public Lava_jato savelava_jato(@RequestBody Lava_jato lava_jato){
        return repository.save(lava_jato);
    }
    @DeleteMapping("/lava_jato/{id_lava_jato}")
    public void Deletelava_jato(@PathVariable Long id_lava_jato){
        repository.deleteById(id_lava_jato);

    }



}
