package com.example.infrastock.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public void addUser(User user) {

        user.setRole("ROLE_USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }


    public boolean checkIfExist(User user) {


        if (userRepo.findByUsername(user.getUsername()) != null) {
            return true;

        } else return false;
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
