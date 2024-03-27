package com.codecool.myFridge.service;

import com.codecool.myFridge.dao.UserDao;
import com.codecool.myFridge.model.User;
import com.codecool.myFridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public void createUser(User user) {
        userDao.createUser(user);
    }

}
