package br.com.mateus.tutorialrestapi.controller;

import br.com.mateus.tutorialrestapi.model.UsuarioModel;
import br.com.mateus.tutorialrestapi.repository.UsuarioRepository;
import br.com.mateus.tutorialrestapi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioController {

    private UsuarioRepository repository;
    private final UsuarioService usuarioService;


    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping(path = "/api/usuario/{id}")
    public ResponseEntity consultar(@PathVariable("id") Long id){
        try{
            return ResponseEntity.ok().body(usuarioService.getUsuario(id));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }

    }

    @GetMapping(path = "/api/usuario/all")
    public ResponseEntity consultarTodos(){
//        return ResponseEntity.ok(repository.findAll());
        try{
            return ResponseEntity.ok(usuarioService.getAllUsuarios());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PostMapping(path = "/api/usuario/salvar")
    public ResponseEntity salvar(@RequestBody UsuarioModel usuario){
        try{
            return ResponseEntity.ok().body(usuarioService.saveUsuario(usuario));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @DeleteMapping(path = "/api/usuario/deletar/{id}")
    public ResponseEntity deletarUsuario(@PathVariable("id") Long id){
        try{
            return ResponseEntity.ok().body(usuarioService.deleteUsuario(id));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping(path = "/api/usuario/atualizar/{id}")
    public ResponseEntity atualizarUsuario(@PathVariable("id") Long id, @RequestBody UsuarioModel usuario){
        try {
            return ResponseEntity.ok().body(usuarioService.updateUsuario(id, usuario));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }
}
