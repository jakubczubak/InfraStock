package com.example.infrastock.user;

import com.example.infrastock.notification.Notification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
public class UserController {

    private final UserService userService;
    private final UserRepo userRepo;

    public UserController(UserService userService, UserRepo userRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
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
