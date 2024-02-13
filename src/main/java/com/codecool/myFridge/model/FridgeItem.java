package com.codecool.myFridge.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
}
