package com.toDoList.DTO;

import com.toDoList.Models.Note;

public class NoteDTO {

    private Integer id;
    private UserDTO userDTO;
    private String title;
    private String status;
    private String content;

    public NoteDTO(Note note, UserDTO userDTO){
        this.userDTO = userDTO;
        this.id = note.getId();
        this.title = note.getTitle();
        this.status = note.getStatus();
        this.content = note.getContent();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
