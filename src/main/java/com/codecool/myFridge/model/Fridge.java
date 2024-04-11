package com.codecool.myFridge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fridge")
public class Fridge {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fridge_id;

    @OneToOne(mappedBy = "fridge", cascade = CascadeType.ALL)
    private Member user;

    @OneToMany(mappedBy = "fridge", cascade = CascadeType.ALL)
    private List<FridgeItem> items = new ArrayList<>();

}
