package com.codecool.myFridge.service;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.repository.FridgeItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FridgeItemService {

    private final FridgeItemRepository repository;
    private final MemberService memberService;

    @Autowired
    public FridgeItemService(FridgeItemRepository repository, MemberService memberService) {
        this.repository = repository;
        this.memberService = memberService;
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

    public List<FridgeItem> getFridgeItemsByLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();
        Member loggedInUser = memberService.getUserFridgeId(loggedInUsername);
        return repository.findByUser(loggedInUser);
    }
}
