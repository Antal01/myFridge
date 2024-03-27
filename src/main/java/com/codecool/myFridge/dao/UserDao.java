package com.codecool.myFridge.dao;

import com.codecool.myFridge.model.Member;

public interface UserDao {
    public void createUser(Member user);
    Member loginUser(String email, String password);
}
