package com.example.infrastock.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(value = "/register")
    public String createUser(@RequestBody @Valid User user, BindingResult result) {


        if (userService.checkIfExist(user)) {
            return "The username you have entered is already registered";
        } else if (result.hasErrors()) {
            return userService.validate(result);
        } else {
            userService.addUser(user);
            return "Congratulations, your account has been successfully created.";
        }
        //dopisac sprawdzenie czy jest uzytkoowanik o takim mailu, jesli jest wyslac komunikat, jestli nie ma to utworzyc uzytkownika wyslac komunikat
        //sprawdzic co jest z tym LiveReload ;///
    }
}
