package com.codecool.myFridge.service;

import com.codecool.myFridge.model.Fridge;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private UserRepository userRepository;

    public Member getUserFridgeId(String name) {
        Member member = userRepository.findMemberByName(name);
        return member;
    }
}
