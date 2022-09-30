package br.com.mateus.tutorialrestapi.service;

import br.com.mateus.tutorialrestapi.model.UsuarioModel;
import br.com.mateus.tutorialrestapi.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioModel getUsuario(Long id){
        return usuarioRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public List<UsuarioModel> getAllUsuarios(){
        return usuarioRepository.findAll();
    }

    public UsuarioModel saveUsuario(UsuarioModel usuario){
        return usuarioRepository.save(usuario);
    }

    public List<UsuarioModel> deleteUsuario(Long id){
        usuarioRepository.deleteById(id);
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioModel> updateUsuario(Long id, UsuarioModel usuario){

        try{
        usuarioRepository.findById(id).orElseThrow(NullPointerException::new);
        usuario.setId(id);
        usuarioRepository.save(usuario);
        return usuarioRepository.findById(id);
        }
        catch (NullPointerException e){
            return Optional.empty();
        }
    }

}
