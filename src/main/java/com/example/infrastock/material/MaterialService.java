package com.example.infrastock.material;

import com.example.infrastock.materialCategory.MaterialCategory;
import com.example.infrastock.materialCategory.MaterialCategoryRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialService {

    private MaterialRepo materialRepo;
    private MaterialCategoryRepo materialCategoryRepo;

    public MaterialService(MaterialRepo materialItemRepo, MaterialCategoryRepo materialCategoryRepo){
        this.materialRepo=materialItemRepo;
        this.materialCategoryRepo= materialCategoryRepo;
    }



    public boolean checkIfMaterialExist(String materialName) {
        return materialRepo.findByMaterialName(materialName) != null;
    }

    public List<Material> getMaterialList(){
        return materialRepo.findAll();
    }


    public Material getMaterialByID(Long id){
        return materialRepo.findById(id).get();

        //obsluzyc optionala w przyszlosci
    }
    public void createMaterial(MaterialDTO materialDTO){
        String categoryName = materialDTO.getCategory();
        MaterialCategory materialCategory = materialCategoryRepo.findByCategoryName(categoryName);
        Material newMaterial = new Material(materialDTO.getMaterialName(), materialDTO.getQuantity(), materialDTO.getMinQuantity(), materialCategory);
        materialRepo.save(newMaterial);

    }

    public void updateMaterial(MaterialDTO materialDTO){
        Material materialToUpdate = materialRepo.getById(materialDTO.getId());
        materialToUpdate.setMaterialName(materialDTO.getMaterialName());
        materialToUpdate.setQuantity(materialDTO.getQuantity());
        materialToUpdate.setMinQuantity(materialDTO.getMinQuantity());
        materialToUpdate.setCategory(materialCategoryRepo.findByCategoryName(materialDTO.getCategory()));
        materialRepo.save(materialToUpdate);

    }

    public void deleteMaterial(Long id){
        materialRepo.delete(materialRepo.getById(id));
    }

    public List<Material> getSortedMaterials(String categoryName){
        return materialRepo.findAllByCategoryCategoryName(categoryName);
    }

    public String getCategoryName(Long id){
        return materialRepo.getById(id).getCategory().getCategoryName();
    }


    public List<Material> getShoppingList(){

        List<Material> shoppingList = new ArrayList<>();

        materialRepo.findAll().forEach(material -> {
            if(material.getMinQuantity()>material.getQuantity()){
                shoppingList.add(material);
            }
        });

        return shoppingList;
    }
}
