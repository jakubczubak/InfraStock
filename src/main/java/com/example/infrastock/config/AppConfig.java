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

//create default material categories
        MaterialCategoryDTO material1 = new MaterialCategoryDTO();
        material1.setCategoryName("PA13 (5083) plates");
        materialCategoryService.createMaterialCategory(material1);

        MaterialCategoryDTO material2 = new MaterialCategoryDTO();
        material2.setCategoryName("PA4 (6082) plates");
        materialCategoryService.createMaterialCategory(material2);

        MaterialCategoryDTO material3 = new MaterialCategoryDTO();
        material3.setCategoryName("PA4 (6082) tubes");
        materialCategoryService.createMaterialCategory(material3);

        MaterialCategoryDTO material4 = new MaterialCategoryDTO();
        material4.setCategoryName("PA4 (6082) rods");
        materialCategoryService.createMaterialCategory(material4);

        MaterialCategoryDTO material5 = new MaterialCategoryDTO();
        material5.setCategoryName("Ertacetal (POM-C) plates");
        materialCategoryService.createMaterialCategory(material5);

        MaterialCategoryDTO material6 = new MaterialCategoryDTO();
        material6.setCategoryName("Ertacetal (POM-C) rods");
        materialCategoryService.createMaterialCategory(material6);

        MaterialCategoryDTO material7 = new MaterialCategoryDTO();
        material7.setCategoryName("Other materials");
        materialCategoryService.createMaterialCategory(material7);


    }


}
