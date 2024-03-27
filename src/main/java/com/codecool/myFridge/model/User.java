package com.codecool.myFridge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_tbl")
public class User {
    @Id
    @Column(name = "user_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    @Column(name = "user_name", length = 255)
    private String userName;
    @Column(name = "email", length = 255)
    private String email;
    @Column(name = "password", length = 255)
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fridge_id", referencedColumnName = "id")
    private Fridge fridge;

}
