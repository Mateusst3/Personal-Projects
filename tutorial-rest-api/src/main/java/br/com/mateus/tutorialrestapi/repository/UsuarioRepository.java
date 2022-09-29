package br.com.mateus.tutorialrestapi.repository;

import br.com.mateus.tutorialrestapi.model.UsuarioModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UsuarioRepository extends CrudRepository<UsuarioModel, Long> {
    List<UsuarioModel> findAll();
}
