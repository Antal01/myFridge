package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.service.FridgeItemService;
import com.codecool.myFridge.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("api")
@RestController
public class FridgeItemController {

    private final FridgeItemService service;
    private final MemberService memberService;

    @Autowired
    public FridgeItemController(FridgeItemService service, MemberService memberService) {
        this.service = service;
        this.memberService = memberService;
    }

   @PostMapping("/fridgeItem")
   public FridgeItem addFridgeItem(@RequestBody FridgeItem item) {
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String loggedInUsername = authentication.getName();
       Member loggedInUser = memberService.getUserFridgeId(loggedInUsername);
       item.setUser(loggedInUser);
       return service.saveFridgeItem(item);
   }

    @PostMapping("/FridgeItems")
    public List<FridgeItem> addFridgeItems(@RequestBody List<FridgeItem> items) {
        return service.saveFridgeItems(items);
    }

   @GetMapping("/fridgeItems")
   public List<FridgeItem> findUserFridgeItems() {
       return service.getFridgeItemsByLoggedInUser();
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
