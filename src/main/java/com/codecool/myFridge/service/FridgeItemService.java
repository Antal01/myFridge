package com.codecool.myFridge.service;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.repository.FridgeItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FridgeItemService {

    private final FridgeItemRepository repository;

    @Autowired
    public FridgeItemService(FridgeItemRepository repository) {
        this.repository = repository;
    }

    public FridgeItem saveFridgeItem(FridgeItem fridgeItem) {
        return repository.save(fridgeItem);
    }

    public List<FridgeItem> saveFridgeItems(List<FridgeItem> fridgeItems) {
        return repository.saveAll(fridgeItems);
    }

    public List<FridgeItem> getFridgeItems() {
        return repository.findAll();
    }

    public FridgeItem getFridgeItemById(int id) {
        return repository.findById(id).orElse(null);
    }

    public FridgeItem getFridgeItemByName(String name) {
        return repository.findByName(name);
    }

    public String deleteFridgeItem(int id) {
        repository.deleteById(id);
        return "Item removed !" + id;
    }

    public FridgeItem updateFridgeItem(FridgeItem fridgeItem) {
        FridgeItem existingItem = repository.findById(fridgeItem.getId()).orElse(null);


        //használni az uj classt excepions
        if (existingItem != null) {
            existingItem.setName(fridgeItem.getName());
            existingItem.setQuantity(fridgeItem.getQuantity());
            return repository.save(existingItem);
        } else {
            throw new RuntimeException("Item not found with id: " + fridgeItem.getId());
        }
    }

    public List<FridgeItem> getAllFridgeItems() {
        return repository.findAll();
    }
}
