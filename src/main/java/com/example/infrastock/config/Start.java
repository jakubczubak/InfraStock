package com.example.infrastock.config;

import com.example.infrastock.user.User;
import com.example.infrastock.user.UserRepo;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Start {

    private UserRepo userRepo;

    public Start(UserRepo userRepo, PasswordEncoder passwordEncoder) {

        User userJanusz = new User();

        userJanusz.setUsername("Janusz");
        userJanusz.setPassword(passwordEncoder.encode("Janusz123"));
        userJanusz.setRole("ROLE_ADMIN");
        userRepo.save(userJanusz);


        User user = new User();

        user.setUsername("Bogdan");
        user.setPassword(passwordEncoder.encode("Bogdan123"));
        user.setRole("ROLE_USER");
        userRepo.save(user);
    }
}
