package com.example.infrastock.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(UserDTO userDTO) {

        User user = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), userDTO.getRole());
        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public void createAdmin(UserDTO userDTO){
        User user = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), userDTO.getRole());
        user.setRole("ROLE_ADMIN");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public boolean checkIfEmailExist(String email) {

        return userRepo.findByEmail(email) != null;


    }

    public String validate(BindingResult results) {

        List<String> errors = new ArrayList<>();

        results.getAllErrors().forEach((result) -> {
            String errorMessage = result.getDefaultMessage();
            errors.add(errorMessage);
        });


        return errors.toString();
    }
}
