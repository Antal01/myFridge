package com.codecool.myFridge.service;
import com.codecool.myFridge.model.Member;
import com.codecool.myFridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MemberDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public MemberDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member memberByName = userRepository.findMemberByName(username);
        User user = new User(username, memberByName.getPassword(), List.of(new SimpleGrantedAuthority(memberByName.getRole().name())));
        return user;
    }
}
