package com.codecool.myFridge.controller;

import com.codecool.myFridge.model.FridgeItem;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/api/member/{name}/fridgeId")
    public Member getUserFridgeId(@PathVariable String name) {
        System.out.println("ID"+ memberService.getUserFridgeId(name));
        return memberService.getUserFridgeId(name);
    }
}
