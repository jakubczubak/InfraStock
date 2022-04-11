package com.example.infrastock.materialCategory;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class MaterialCategoryService {

    private final MaterialCategoryRepo materialCategoryRepo;


    public MaterialCategoryService(MaterialCategoryRepo materialCategoryRepo) {
        this.materialCategoryRepo = materialCategoryRepo;
    }

    public void createMaterialCategory(MaterialCategoryDTO materialCategoryDTO){

        MaterialCategory newMaterialCategory = new MaterialCategory(materialCategoryDTO.getCategoryName());
        materialCategoryRepo.save(newMaterialCategory);
    }


    public boolean checkIfCategoryExist(String categoryName) {

        return materialCategoryRepo.findByCategoryName(categoryName) != null;

    }

    public List<MaterialCategory> getMaterialCategories(){
        return materialCategoryRepo.findAll();
    }

    public MaterialCategory findByCategoryName(String categoryName){
        return materialCategoryRepo.findByCategoryName(categoryName);
    }

}
