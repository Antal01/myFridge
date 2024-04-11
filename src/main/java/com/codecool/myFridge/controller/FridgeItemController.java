package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.service.FridgeItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api")
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FridgeItemController {

    @Autowired
    private FridgeItemService service;
    @Autowired
    public void setFridgeItemService(FridgeItemService service) {
        this.service = service;
    }
//add folosleges post miatt
    //elnevezeresek egysegese tetele
    @PostMapping("/addFridgeItem")
    public FridgeItem addFridgeItem(@RequestBody FridgeItem item) {
        return service.saveFridgeItem(item);
    }

    @PostMapping("/addFridgeItems")
    public List<FridgeItem> addFridgeItems(@RequestBody List<FridgeItem> items) {
        return service.saveFridgeItems(items);
    }

    @GetMapping("/fridgeitems")
    public List<FridgeItem> findAllFridgeItems() {
        return service.getFridgeItems();
    }

    @GetMapping("/fridgeitem/{id}")
    public FridgeItem findFridgeItemById(@PathVariable int id) {
        return service.getFridgeItemById(id);
    }

    @GetMapping("/fridgeitem/byName/{name}")
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
