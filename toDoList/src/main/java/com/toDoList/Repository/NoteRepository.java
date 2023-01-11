package com.toDoList.Repository;

import com.toDoList.Models.Note;
import com.toDoList.Models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NoteRepository extends CrudRepository<Note, Integer> {
    List<Note> findAllByUserId(Integer user_id);
    void deleteAllByUserId(Integer user_id);
    List<Note> findAllByUserEmail(String user_email);
}
