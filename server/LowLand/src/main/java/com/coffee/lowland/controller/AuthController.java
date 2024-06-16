package com.coffee.lowland.controller;


import com.coffee.lowland.DTO.request.auth.AuthenticationRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.auth.AuthenticationResponse;

import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthController {

    AuthenticationService authenticationService;

    @PostMapping("/login")
    public APIResponse<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest request) {
        AuthenticationResponse result = authenticationService.authenticate(request);
        return APIResponse.<AuthenticationResponse>builder().code(2000).result(result).build();
    }

    @GetMapping("/user")
    public APIResponse<UserResponse> getUser(){
        return APIResponse.<UserResponse>builder()
                .code(2000)
                .result(authenticationService.getMyInfo())
                .build();
    }
}
