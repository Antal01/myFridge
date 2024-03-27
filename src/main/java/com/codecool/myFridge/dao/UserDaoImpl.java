package com.codecool.myFridge.dao;

import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {


    private UserRepository userRepository;

    @Autowired
    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(Member user) {
        userRepository.save(user);
    }

    @Override
    public Member loginUser(String email, String password) {
        return null;
    }

}
