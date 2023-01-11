package com.toDoList.Service;

import com.toDoList.DTO.NoteDTO;
import com.toDoList.DTO.UserDTO;
import com.toDoList.Models.Note;
import com.toDoList.Models.User;
import com.toDoList.Repository.NoteRepository;
import com.toDoList.Repository.UserRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    UserRepository userRepository;

    public NoteDTO saveNote(Note note, String emailParam){
        User user = userRepository.getUserByEmail(emailParam);
        note.setUser(user);
        noteRepository.save(note);
        UserDTO userDTO = new UserDTO(user);
        return new NoteDTO(note, userDTO);
    }

    public Optional<Note> getNoteById(Integer id){
        return noteRepository.findById(id);
    }

    public List<Note> getNotesByIdUser(Integer id_user){
        return noteRepository.findAllByUserId(id_user);
    }

    public List<Note> deleteNoteById(Integer id_note, Integer id_user){
        noteRepository.deleteById(id_note);
        return noteRepository.findAllByUserId(id_user);
    }

    public Note updateNoteById(Integer idNota){
       Note note = noteRepository.findById(idNota).orElse(null);
        assert note != null;
        note.setStatus("done");
        noteRepository.save(note);
        return note;
    }

    public void deleteAllByUserId(Integer id_user){
        noteRepository.deleteAllByUserId(id_user);
    }

    public List<Note> getNotesByUserEmail(String user_email){
        return noteRepository.findAllByUserEmail(user_email);
    }

}
