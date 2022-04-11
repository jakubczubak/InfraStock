package com.example.infrastock.material;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    private MaterialRepo materialRepo;

    public MaterialService(MaterialRepo materialItemRepo){
        this.materialRepo=materialItemRepo;
    }



    public boolean checkIfMaterialExist(String materialName) {
        return materialRepo.findByMaterialName(materialName) != null;
    }

    public List<Material> getMaterialList(){
        return materialRepo.findAll();
    }

    public void createMaterial(MaterialDTO materialDTO){
        Material newMaterial = new Material(materialDTO.getMaterialName(),materialDTO.getQuntity(), materialDTO.getMinQuantity(), materialDTO.getCategory());
        materialRepo.save(newMaterial);
    }
}
