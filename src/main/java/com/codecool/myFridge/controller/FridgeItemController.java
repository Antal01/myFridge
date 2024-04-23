package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.service.FridgeItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api")
@RestController
public class FridgeItemController {

    @Autowired
    private FridgeItemService service;
    @Autowired
    public void setFridgeItemService(FridgeItemService service) {
        this.service = service;
    }

    @PostMapping("/fridgeItem")
    public FridgeItem addFridgeItem(@RequestBody FridgeItem item) {
        return service.saveFridgeItem(item);
    }

    @PostMapping("/FridgeItems")
    public List<FridgeItem> addFridgeItems(@RequestBody List<FridgeItem> items) {
        return service.saveFridgeItems(items);
    }

    @GetMapping("/fridgeItems")
    public List<FridgeItem> findAllFridgeItems() {
        return service.getFridgeItems();
    }

    @GetMapping("/fridgeItem/{id}")
    public FridgeItem findFridgeItemById(@PathVariable int id) {
        return service.getFridgeItemById(id);
    }

    @GetMapping("/fridgeItem/byName/{name}")
    public FridgeItem findFridgeItemByName(@PathVariable String name) {
        return service.getFridgeItemByName(name);
    }

    @PutMapping("/update")
    public FridgeItem updateFridgeItem(@RequestBody FridgeItem fridgeItem) {
        return service.updateFridgeItem(fridgeItem);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFridgeItem(@PathVariable int id) {
        return service.deleteFridgeItem(id);
    }

    @GetMapping("/allFridgeItems")
    public List<FridgeItem> getAllFridgeItems() {
        return service.getAllFridgeItems();
    }

}
