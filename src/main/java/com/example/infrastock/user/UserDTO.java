package com.example.infrastock.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserDTO {

    private Long id;

    // username should not be null or empty
    // username should have at least 2 characters
    @NotEmpty(message = "Enter User name!")
    @Size(min = 3, message = "User name should have at least 3 characters")
    private String username;

    // email should be a valid email format
    // email should not be null or empty
    @NotEmpty(message = "Enter email address!")
    @Email(message = "Email is not valid")
    private String email;

    // password should not be null or empty
    // password should have at least 8 characters
    @NotEmpty(message = "Enter password!")
    @Size(min = 3, message = "Password should have at least 3 characters")
    private String password;
    private String role;

    public UserDTO() {
    }

    public UserDTO(Long id, String username, String email, String password, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

