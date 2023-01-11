package com.toDoList.Controller;

import com.toDoList.Models.Note;
import com.toDoList.Repository.NoteRepository;
import com.toDoList.Service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/note")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Validated
@RestController
public class NoteController {

    private NoteRepository repository;
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveNote(@RequestBody Note note, @RequestParam String userEmail){
        return ResponseEntity.ok().body(noteService.saveNote(note, userEmail));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateNote(@RequestParam Integer idNote){
        return ResponseEntity.ok().body(noteService.updateNoteById(idNote));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getNoteById(@RequestParam Integer id){
        return ResponseEntity.ok().body(noteService.getNoteById(id));
    }

    @GetMapping("/get/user")
    public ResponseEntity<?> getNoteByUserId(@RequestParam Integer user_id){
        return ResponseEntity.ok().body(noteService.getNotesByIdUser(user_id));
    }

    @GetMapping("/get/userEmail")
    public ResponseEntity<?> getNotesByUserEmail(@RequestParam String userEmail){
        return ResponseEntity.ok().body(noteService.getNotesByUserEmail(userEmail));
    }
}
