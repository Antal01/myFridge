package com.codecool.myFridge.repository;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FridgeItemRepository extends JpaRepository<FridgeItem, Integer> {
    FridgeItem findByName(String name);

    List<FridgeItem> findByUser(Member loggedInUser);
}
