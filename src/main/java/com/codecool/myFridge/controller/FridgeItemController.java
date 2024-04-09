package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.service.FridgeItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FridgeItemController {

    @Autowired
    private FridgeItemService service;
    @Autowired
    public void setFridgeItemService(FridgeItemService service) {
        this.service = service;
    }

    @PostMapping("api/addFridgeItem")
    public FridgeItem addFridgeItem(@RequestBody FridgeItem item) {
        return service.saveFridgeItem(item);
    }

    @PostMapping("api/addFridgeItems")
    public List<FridgeItem> addFridgeItems(@RequestBody List<FridgeItem> items) {
        return service.saveFridgeItems(items);
    }

    @GetMapping("api/fridgeitems")
    public List<FridgeItem> findAllFridgeItems() {
        return service.getFridgeItems();
    }

    @GetMapping("api/fridgeitem/{id}")
    public FridgeItem findFridgeItemById(@PathVariable int id) {
        return service.getFridgeItemById(id);
    }

    @GetMapping("api/fridgeitem/byName/{name}")
    public FridgeItem findFridgeItemByName(@PathVariable String name) {
        return service.getFridgeItemByName(name);
    }

    @PutMapping("/api/update")
    public FridgeItem updateFridgeItem(@RequestBody FridgeItem fridgeItem) {
        return service.updateFridgeItem(fridgeItem);
    }

    @DeleteMapping("/api/delete/{id}")
    public String deleteFridgeItem(@PathVariable int id) {
        return service.deleteFridgeItem(id);
    }

    @GetMapping("api/allFridgeItems")
    public List<FridgeItem> getAllFridgeItems() {
        return service.getAllFridgeItems();
    }

}
