/*
package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.Member;
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
    public void registerUser(@RequestBody Member user) {
        System.out.println("name"+user.getName());
        System.out.println("password"+user.getPassword());
        System.out.println("email"+user.getEmail());
        //System.out.println("userid"+user.getUserId());
        //System.out.println("fridgeid"+user.getFridge());
        userService.createUser(user);
    }
    @PostMapping("api/login")
    public Member loginUser(@RequestParam String email, @RequestParam String password) {
        //return userService.loginUser(email, password);
        return null;
    }
}
*/
