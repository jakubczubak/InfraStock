package com.example.infrastock.tool;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ToolController {

    private final ToolService toolService;



    public ToolController(ToolService toolService) {
        this.toolService = toolService;
    }


    @GetMapping("/tools")
    public List<Tool> getToolList() {
        return toolService.getToolList();
    }

    @GetMapping("/getTool")
    public Tool getToolByID(@RequestParam Long id) {

        return toolService.getToolByID(id);
    }


    @PostMapping(value = "/addTool")
    public String createTool(@RequestBody @Valid ToolDTO toolDTO) {

        if (toolService.checkIfToolExist(toolDTO.getToolName())) {
            return "The tool you have entered is already in Database";
        } else {
            toolService.createTool(toolDTO);
            return "Congratulations, you've added a new tool";
        }
    }

    @PutMapping("/updateTool")
    public String updateTool(@RequestBody @Valid ToolDTO toolDTO) {
        System.out.println(toolDTO.toString());
        toolService.updateTool(toolDTO);
        return "Successfully updated: " + toolDTO.getToolName();
    }

    @DeleteMapping("/deleteTool")
    public String deleteTool(@RequestParam Long id) {
        String toolName = toolService.getToolByID(id).getToolName();
        toolService.deleteTool(id);
        return "Successfully deleted: " + toolName;

    }


    @GetMapping("/sortedTools")
    public List<Tool> getSortedToolsByCategoryName(@RequestParam String categoryName) {


        return toolService.getSortedTools(categoryName);
    }

    @GetMapping("/tools/shoppingList")
    public List<Tool> getShoppingList() {
        return toolService.getShoppingList();
    }

}
