package com.codecool.myFridge.repository;

import com.codecool.myFridge.model.FridgeItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FridgeItemRepository extends JpaRepository<FridgeItem, Integer> {
    FridgeItem findByName(String name);
}
