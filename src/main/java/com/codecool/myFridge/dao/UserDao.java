package com.codecool.myFridge.dao;

import com.codecool.myFridge.model.User;

public interface UserDao {
    public void createUser(User user);
    User loginUser(String email, String password);
}
