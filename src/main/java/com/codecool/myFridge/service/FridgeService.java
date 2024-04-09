package com.codecool.myFridge.service;

import com.codecool.myFridge.model.Fridge;
import com.codecool.myFridge.repository.FridgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FridgeService {

    private final FridgeRepository fridgeRepository;

    @Autowired
    public FridgeService(FridgeRepository fridgeRepository) {
        this.fridgeRepository = fridgeRepository;
    }

    public Fridge createFridgeWithItems() {
        Fridge fridge = new Fridge();
        return fridgeRepository.save(fridge);
    }
}
