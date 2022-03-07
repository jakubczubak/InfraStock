package com.example.infrastock.config;

import com.example.infrastock.user.User;
import com.example.infrastock.user.UserRepo;
import com.example.infrastock.user.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DefaultAdmin {

    private UserRepo userRepo;
    private UserService userService;

    public DefaultAdmin(UserRepo userRepo, PasswordEncoder passwordEncoder, UserService userService
    ) {

        User admin = new User();

        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setRole("ROLE_ADMIN");
        if(!userService.checkIfUsernameExist(admin.getUsername())){
            userRepo.save(admin);
        }


    }
}
