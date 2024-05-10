package com.coffee.lowland.controller;

import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.AuthenticationResponse;
import com.coffee.lowland.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/admin")
@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Account request){
        return ResponseEntity.ok(authenticationService.register(request));
    }
}
