package com.example.infrastock.materialCategory;

import com.example.infrastock.material.Material;
import com.example.infrastock.material.MaterialDTO;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MaterialCategoryService {

    private final MaterialCategoryRepo materialCategoryRepo;


    public MaterialCategoryService(MaterialCategoryRepo materialCategoryRepo) {
        this.materialCategoryRepo = materialCategoryRepo;
    }

    public void createMaterialCategory(MaterialCategoryDTO materialCategoryDTO) {

        MaterialCategory newMaterialCategory = new MaterialCategory(materialCategoryDTO.getCategoryName());
        materialCategoryRepo.save(newMaterialCategory);
    }


    public boolean checkIfCategoryExist(String categoryName) {

        return materialCategoryRepo.findByCategoryName(categoryName) != null;

    }

    public List<MaterialCategory> getMaterialCategories() {
        return materialCategoryRepo.findAll();
    }

    public MaterialCategory findByCategoryName(String categoryName) {

        return materialCategoryRepo.findByCategoryName(categoryName);
    }

    public String deleteMaterialCategoryByID(Long id){
        String categoryName = getMaterialCategoryByID(id).getCategoryName();
        materialCategoryRepo.deleteById(id);
        return categoryName;
    }



    public MaterialCategory getMaterialCategoryByID(Long id){
        return materialCategoryRepo.getById(id);
    }

    public void updateMaterialCategory(MaterialCategoryDTO materialCategoryDTO, Long id) {
        MaterialCategory materialCategoryToUpdate = materialCategoryRepo.getById(id);
        materialCategoryToUpdate.setCategoryName(materialCategoryDTO.getCategoryName());
        materialCategoryRepo.save(materialCategoryToUpdate);
    }


}


