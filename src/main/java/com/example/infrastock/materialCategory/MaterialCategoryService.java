package com.example.infrastock.materialCategory;

import com.example.infrastock.material.Material;
import com.example.infrastock.material.MaterialDTO;
import com.example.infrastock.notification.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MaterialCategoryService {

    private final MaterialCategoryRepo materialCategoryRepo;
    private final NotificationService notificationService;


    public MaterialCategoryService(MaterialCategoryRepo materialCategoryRepo, NotificationService notificationService) {
        this.materialCategoryRepo = materialCategoryRepo;
        this.notificationService = notificationService;
    }

    public void createMaterialCategory(MaterialCategoryDTO materialCategoryDTO) {

        MaterialCategory newMaterialCategory = new MaterialCategory(materialCategoryDTO.getCategoryName());
        notificationService.sendNotificationToUsers("added new material category: " + materialCategoryDTO.getCategoryName());
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
        notificationService.sendNotificationToUsers("deleted material category: " + categoryName);
        materialCategoryRepo.deleteById(id);
        return categoryName;
    }



    public MaterialCategory getMaterialCategoryByID(Long id){
        return materialCategoryRepo.getById(id);
    }

    public void updateMaterialCategory(MaterialCategoryDTO materialCategoryDTO, Long id) {
        MaterialCategory materialCategoryToUpdate = materialCategoryRepo.getById(id);
        materialCategoryToUpdate.setCategoryName(materialCategoryDTO.getCategoryName());
        notificationService.sendNotificationToUsers("updated material category: " + materialCategoryDTO.getCategoryName());
        materialCategoryRepo.save(materialCategoryToUpdate);
    }


}


