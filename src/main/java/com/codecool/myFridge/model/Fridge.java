package com.codecool.myFridge.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "fridge")
public class Fridge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(mappedBy = "fridge")
    private User user;

    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL)
    private List<FridgeItem> items;
}
