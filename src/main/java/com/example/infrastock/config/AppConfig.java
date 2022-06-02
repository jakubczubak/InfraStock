package com.example.infrastock.config;

import com.example.infrastock.material.MaterialService;
import com.example.infrastock.materialCategory.MaterialCategoryDTO;
import com.example.infrastock.materialCategory.MaterialCategoryService;
import com.example.infrastock.user.UserDTO;
import com.example.infrastock.user.UserService;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {


    private UserService userService;
    private MaterialCategoryService materialCategoryService;
    private MaterialService materialService;

    public AppConfig(UserService userService, MaterialCategoryService materialCategoryService, MaterialService materialService
    ) {

        this.userService = userService;
        this.materialCategoryService = materialCategoryService;
        this.materialService = materialService;

//create default account
        UserDTO admin = new UserDTO();

        admin.setUsername("admin");
        admin.setEmail("admin@inframet.com");
        admin.setPassword("admin");

        if (!userService.checkIfEmailExist(admin.getEmail())) {
            userService.createAdmin(admin);
        }




    }


}
