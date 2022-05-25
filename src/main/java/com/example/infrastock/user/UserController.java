package com.example.infrastock.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/userInfo")
    public String getUserInfo(){
        Object principal = SecurityContextHolder. getContext(). getAuthentication(). getPrincipal();
        String email = ((User)principal).getEmail();
        return email;

    }

    @PostMapping(value = "/register")
    public String createUser(@RequestBody @Valid UserDTO user) {




        if (userService.checkIfEmailExist(user.getEmail())) {
            return "E-mail already exist in Database!";
        } else {
            userService.createUser(user);
            return "Successfully created account!";
        }
    }
}
