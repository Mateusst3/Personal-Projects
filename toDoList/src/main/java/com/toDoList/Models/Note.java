package com.toDoList.Models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "nota")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id_nota", nullable = false)
    @JdbcTypeCode(SqlTypes.INTEGER)
    private Integer id;

    @Column(name = "Titulo", nullable = false)
    private String title;

    @Column(name = "Status", nullable = false)
    private String status;

    @Column(name = "Conteudo", nullable = false)
    private String content;

    public Note() {
    }

    public Note(Integer id, String title, String status, String content, User user) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.content = content;
        this.user = user;
    }

    @OneToOne
    @JoinColumn(name = "usuario.Id_usuario")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
}
