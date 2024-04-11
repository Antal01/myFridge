package com.codecool.myFridge.service;
import com.codecool.myFridge.config.JwtService;
import com.codecool.myFridge.controller.AuthenticationResponse;
import com.codecool.myFridge.controller.RegisterRequest;
import com.codecool.myFridge.model.Fridge;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.model.Role;
import com.codecool.myFridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MemberDetailsService memberDetailsService;
    private final FridgeService fridgeService;
    public AuthenticationResponse register(RegisterRequest request) {
//folosleges a for mivel egyedi neame van finde by name met
        //Solution 3: @ControllerAdvice
        List<String> MemberNames=memberRepository.findAll().stream().map(member -> member.getName()).collect(Collectors.toList());
        for (String name:MemberNames){
            if(name.equals(request.getName())){
               // System.out.println(("Mar van ilyen Member"));
                return AuthenticationResponse.builder().token("fail").build();
            }
        }

        Fridge fridge = fridgeService.createFridgeWithItems();

        var user = Member.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .fridge(fridge)
                .build();

        memberRepository.save(user);

        var jwtToken = jwtService.generateToken(memberDetailsService.loadUserByUsername(user.getName()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(RegisterRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getName(),
                        request.getPassword()
                )
        );
        var user = memberRepository.findMemberByName(request.getName());
        var jwtToken = jwtService.generateToken(memberDetailsService.loadUserByUsername(user.getName()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
