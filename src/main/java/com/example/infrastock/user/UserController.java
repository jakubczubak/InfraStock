package com.example.infrastock.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;


@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/userInfo")
    public String getUserInfo(HttpServletRequest request){
        Object principal = SecurityContextHolder. getContext(). getAuthentication(). getPrincipal();
        String email = ((User)principal).getEmail();
        return email;

    }

    @PostMapping(value = "/register")
    public String createUser(@RequestBody @Valid UserDTO user) {


        if (userService.checkIfEmailExist(user.getEmail())) {
            return "The email you have entered is already registered";
        } else {
            userService.createUser(user);
            return "Congratulations, your account has been successfully created.";
        }
    }
}
