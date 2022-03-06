package com.example.infrastock.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(value = "/register")
    public String createUser(@RequestBody User user) {

        //dopisac sprawdzenie czy jest uzytkoowanik o takim mailu, jesli jest wyslac komunikat, jestli nie ma to utworzyc uzytkownika wyslac komunikat
        //sprawdzic co jest z tym LiveReload ;////
        return user.getUsername();
    }
}
