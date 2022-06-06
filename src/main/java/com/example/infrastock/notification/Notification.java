package com.example.infrastock.notification;

import com.example.infrastock.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "notifications")
public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private boolean isChecked;
    private String createdOn;

    @ManyToOne
    private User user;


    public Notification() {
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Notification(String description, boolean isChecked, User user) {
        this.description = description;
        this.isChecked = isChecked;
        this.user = user;
    }

    @PrePersist
    public void preUpdate() {
        LocalDateTime now = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        createdOn = now.format(formatter);
    }

    public String getCreatedOn() {
        return createdOn;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public void setChecked(boolean checked) {
        isChecked = checked;
    }
}
