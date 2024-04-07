package com.coffee.lowland.service;

import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.AuthenticationResponse;
import com.coffee.lowland.repository.AccountRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, JWTService jwtService, AuthenticationManager authenticationManager) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public String register(Account request){
        Account newUser = new Account();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFullName(request.getFullName());
        newUser.setPermission(request.getPermission());
        newUser = accountRepository.save(newUser);

        String res = "fail";
        if(newUser.getId()>0)  res= "ok";

        return (res);
    }

    public AuthenticationResponse authenticate(Account request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Account user = accountRepository.findAccountByUsername(request.getUsername()).get(0);
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
}
