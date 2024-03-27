package com.codecool.myFridge.service;

import com.codecool.myFridge.model.User;

public interface UserService {
    User createUser(User user);
    User loginUser(String email, String password);
}
