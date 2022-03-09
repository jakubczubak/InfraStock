package com.example.infrastock.config;

import com.example.infrastock.user.User;
import com.example.infrastock.user.UserDTO;
import com.example.infrastock.user.UserRepo;
import com.example.infrastock.user.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DefaultAdmin {


    private UserService userService;

    public DefaultAdmin(PasswordEncoder passwordEncoder, UserService userService
    ) {

        UserDTO admin = new UserDTO();

        admin.setUsername("admin");
        admin.setEmail("admin@inframet.com");
        admin.setPassword("admin");

        if(!userService.checkIfEmailExist(admin.getEmail())){
            userService.createAdmin(admin);
        }


    }
}
