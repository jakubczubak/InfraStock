package com.example.infrastock.tool;


import com.example.infrastock.notification.NotificationService;
import com.example.infrastock.toolCategory.ToolCategory;
import com.example.infrastock.toolCategory.ToolCategoryRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToolService {

    private final ToolRepo toolRepo;
    private final ToolCategoryRepo toolCategoryRepo;
    private final NotificationService notificationService;

    public ToolService(ToolRepo toolRepo, ToolCategoryRepo toolCategoryRepo, NotificationService notificationService) {
        this.toolRepo = toolRepo;
        this.toolCategoryRepo = toolCategoryRepo;
        this.notificationService = notificationService;
    }


    public boolean checkIfToolExist(String toolName) {
        return toolRepo.findByToolName(toolName) != null;
    }

    public List<Tool> getToolList() {
        return toolRepo.findAll();
    }


    public Tool getToolByID(Long id) {
        return toolRepo.findById(id).get();

        //obsluzyc optionala w przyszlosci
    }

    public void createTool(ToolDTO toolDTO) {
        String categoryName = toolDTO.getCategory();

        notificationService.sendNotificationToUsers("added new tool: " + toolDTO.getToolName());
        ToolCategory toolCategory = toolCategoryRepo.findByToolCategoryName(categoryName);
        Tool newTool = new Tool(toolDTO.getToolName(), toolDTO.getQuantity(), toolDTO.getMinQuantity(), toolCategory, toolDTO.getPrice(), toolDTO.getLink1(), toolDTO.getLink2());
        toolRepo.save(newTool);

    }

    public void updateTool(ToolDTO toolDTO) {
        Tool toolToUpdate = toolRepo.getById(toolDTO.getId());
        toolToUpdate.setToolName(toolDTO.getToolName());
        toolToUpdate.setQuantity(toolDTO.getQuantity());
        toolToUpdate.setMinQuantity(toolDTO.getMinQuantity());
        toolToUpdate.setToolCategoryName(toolCategoryRepo.findByToolCategoryName(toolDTO.getCategory()));
        toolToUpdate.setPrice(toolDTO.getPrice());
        toolToUpdate.setLink1(toolDTO.getLink1());
        toolToUpdate.setLink2(toolDTO.getLink2());
        notificationService.sendNotificationToUsers("updated tool: " + toolDTO.getToolName());
        toolRepo.save(toolToUpdate);
    }

    public void deleteTool(Long id) {

        notificationService.sendNotificationToUsers("deleted material: " + toolRepo.getById(id).getToolName());
        toolRepo.delete(toolRepo.getById(id));
    }

    public List<Tool> getSortedTools(String categoryName) {
        return toolRepo.findAllByToolCategoryNameToolCategoryName(categoryName);
    }

    public String getCategoryName(Long id) {
        return toolRepo.getById(id).getToolCategoryName().getCategoryName();
    }


    public List<Tool> getShoppingList() {

        List<Tool> shoppingList = new ArrayList<>();

        toolRepo.findAll().forEach(tool -> {
            if (tool.getMinQuantity() > tool.getQuantity()) {
                shoppingList.add(tool);
            }
        });

        return shoppingList;
    }
}
