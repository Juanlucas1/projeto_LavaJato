package juan.POO_project.controler;

import juan.POO_project.agenda.Agenda;
import juan.POO_project.cliente.Cliente;
import juan.POO_project.cliente.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.List;

@RestController
@AllArgsConstructor
public class Clientecontroler {

    private final ClienteRepository repository;
    @GetMapping("/cliente")
    public List<Cliente> getALLclientes(){
        return repository.findAll();

    }


        @GetMapping("/cliente/{id_cliente}")
    public ResponseEntity<Cliente> getclienteByid(@PathVariable Long id_cliente) {
        Optional<Cliente> optionalCliente = repository.findById(id_cliente);
        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cliente")
    public Cliente savecliente(@RequestBody Cliente cliente){
        return repository.save(cliente);

    }

    @DeleteMapping("/cliente/{id_cliente}")
    public void Deletecliente(@PathVariable Long id_cliente){
        repository.deleteById(id_cliente);

    }



}
