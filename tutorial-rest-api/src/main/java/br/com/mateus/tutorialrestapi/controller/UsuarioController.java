package br.com.mateus.tutorialrestapi.controller;

import br.com.mateus.tutorialrestapi.model.UsuarioModel;
import br.com.mateus.tutorialrestapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @GetMapping(path = "/api/usuario/{id}")
    public ResponseEntity consultar(@PathVariable("id") Long id){
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping(path = "/api/usuario/all")
    public ResponseEntity<List<UsuarioModel>> consultarTodos(){
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping(path = "/api/usuario/salvar")
    public UsuarioModel salvar(@RequestBody UsuarioModel usuario){
        return repository.save(usuario);
    }

    @DeleteMapping(path = "/api/usuario/deletar/{id}")
    public ResponseEntity<List<UsuarioModel>> deletarUsuario(@PathVariable("id") Long id){
        repository.deleteById(id);
        return ResponseEntity.ok(repository.findAll());
    }

    @PutMapping(path = "/api/usuario/atualizar/{id}")
    public Optional<UsuarioModel> atualizarUsuario(@PathVariable("id") Long id, @RequestBody UsuarioModel usuario){
//        repository.findById(id)
//                .map(usuarioModel -> repository.save(usuario));
        usuario.setId(id);
        repository.save(usuario);
        return repository.findById(id);
    }
}
