package com.example.infrastock;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class AppController {

    @GetMapping("/app")
    public String getAppPage() {
        return "app";
    }


    @GetMapping("/login")
    public String getLoginPage() {

        return "login";
    }
}
