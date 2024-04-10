    package com.codecool.myFridge.model;

    import com.fasterxml.jackson.annotation.JsonIdentityInfo;
    import com.fasterxml.jackson.annotation.JsonIdentityReference;
    import com.fasterxml.jackson.annotation.ObjectIdGenerators;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "ITEM")
    public class FridgeItem {

        @Id
        @GeneratedValue
        private int id;
        private String name;
        private int quantity;

        @ManyToOne
        @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="fridge_id")
        @JsonIdentityReference(alwaysAsId=true)
        //@JoinColumn(name = "fridge_id")
        private Fridge fridge;

        public FridgeItem(String name, int quantity) {
            this.name = name;
            this.quantity = quantity;
        }
    }
