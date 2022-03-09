package com.example.infrastock.user;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;


@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(value = "/register")
    public String createUser(@RequestBody @Valid UserDTO user, BindingResult result) {


        if (userService.checkIfEmailExist(user.getEmail())) {
            return "The email you have entered is already registered";
        } else if (result.hasErrors()) {
            return userService.validate(result);
        } else {
            userService.createUser(user);
            return "Congratulations, your account has been successfully created.";
        }

        //dopisac walidacdje do klasy user
        //odebrac w js odpowiedzi i je wyswietlic na froncie
        //dopisac alert js aby automatycznie wyswietlal wiadomosci z backendu
        //live reload

        //You need to throw an exception from the controller in order to get into error block.

    }
}
