package com.coffee.lowland.controller;


import com.coffee.lowland.DTO.request.AuthenticationRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.DTO.response.AuthenticationResponse;

import com.coffee.lowland.DTO.response.UserResponse;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public APIResponse<?> getUser(@PathVariable int id){
        return APIResponse.<List<Account>>builder()
                .code(2000)
                .result(authenticationService.findAccountByID(id))
                .build();
    }
}
