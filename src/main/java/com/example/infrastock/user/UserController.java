package com.example.infrastock.user;

import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(value = "/register")
    public String createUser(@RequestBody @Valid UserDTO user) {


        if (userService.checkIfEmailExist(user.getEmail())) {
            return "The email you have entered is already registered";
        }else {
            userService.createUser(user);
            return "Congratulations, your account has been successfully created.";
        }
    }
}
