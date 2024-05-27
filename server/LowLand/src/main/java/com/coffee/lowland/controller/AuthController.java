package com.coffee.lowland.controller;


import com.coffee.lowland.DTO.request.AuthenticationRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.AuthenticationResponse;

import com.coffee.lowland.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthController {

    AuthenticationService authenticationService;

//    @PostMapping("/register")
//    public ResponseEntity<String> registerCustomer(@RequestBody AuthenticationRequest account) {
//
//    }

    @PostMapping("/login")
    public APIResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse result = authenticationService.authenticate(request);
        return APIResponse.<AuthenticationResponse>builder().code(2000).result(result).build();
    }
}
