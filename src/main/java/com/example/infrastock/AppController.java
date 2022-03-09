package com.example.infrastock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class AppController {



    @GetMapping("/")
    public String redirectToLoginPage() {
        return "redirect:/login";
    }

    @GetMapping("/app")
    public String getAppPage() {
        return "app";
    }

    @GetMapping("/login")
    public String getLoginPage() {

        return "login";
    }
}
