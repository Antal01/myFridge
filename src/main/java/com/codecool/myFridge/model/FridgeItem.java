package com.codecool.myFridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ITEM_TBL")
public class FridgeItem {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "fridge_id", nullable = false)
    private Fridge fridge;

    public FridgeItem(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}
