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
        UserDTO admin_1 = new UserDTO();

        admin_1.setUsername("Jakub Czubak");
        admin_1.setEmail("jczu@inframet.com");
        admin_1.setPassword("kuba");

        if (!userService.checkIfEmailExist(admin_1.getEmail())) {
            userService.createAdmin(admin_1);
        }

        UserDTO admin_2 = new UserDTO();

        admin_2.setUsername("Michał Ostrowski");
        admin_2.setEmail("most@inframet.com");
        admin_2.setPassword("michal");

        if (!userService.checkIfEmailExist(admin_2.getEmail())) {
            userService.createAdmin(admin_2);
        }


        UserDTO admin_3 = new UserDTO();

        admin_2.setUsername("Maksym Polak");
        admin_2.setEmail("mpol@inframet.com");
        admin_2.setPassword("maksym");

        if (!userService.checkIfEmailExist(admin_2.getEmail())) {
            userService.createAdmin(admin_2);
        }

    }
}
