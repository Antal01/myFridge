package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.User;
import com.codecool.myFridge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("api/register")
    public User registerUser(@RequestBody User user) {
        System.out.printf("user name " + user);
        return userService.createUser(user);
    }
    @PostMapping("api/login")
    public User loginUser(@RequestParam String email, @RequestParam String password) {
        return userService.loginUser(email, password);
    }
}
