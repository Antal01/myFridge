package com.codecool.myFridge.repository;

import com.codecool.myFridge.model.FridgeItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FridgeItemRepository extends JpaRepository<FridgeItem, Integer> {
    FridgeItem findByName(String name);
}
