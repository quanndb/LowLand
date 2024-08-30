package com.coffee.lowland.controller;


import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.auth.AuthenticationRequest;
import com.coffee.lowland.DTO.request.auth.DetailsLogin;
import com.coffee.lowland.DTO.response.utilities.APIResponse;

import com.coffee.lowland.service.Account.AccountService;
import com.coffee.lowland.service.Account.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
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
    AccountService accountService;

    @PostMapping("/login")
    public APIResponse<?> login(@RequestBody @Valid AuthenticationRequest request,
                                HttpServletRequest details) {
        DetailsLogin detailsLogin = DetailsLogin.builder()
                .IP(details.getRemoteAddr())
                .userAgent(details.getHeader("User-Agent"))
                .build();
        return APIResponse.builder()
                .code(2000)
                .result(authenticationService.authenticate(request,detailsLogin))
                .build();
    }

    @PostMapping ("/google")
    public APIResponse<?> loginWithGoogle(@RequestParam String code
                ,HttpServletRequest details) {
       DetailsLogin detailsLogin = DetailsLogin.builder()
                .IP(details.getRemoteAddr())
                .userAgent(details.getHeader("User-Agent"))
                .build();
        return APIResponse.builder()
                .code(2000)
                .result(authenticationService.loginWithGoogle(code, detailsLogin))
                .build();
    }

    @PostMapping("/logout")
    public APIResponse<?> logout() {
        return APIResponse.builder()
                .code(2000)
                .result(authenticationService.logout())
                .build();
    }

    @PostMapping("/register")
    public APIResponse<?> register(@RequestBody @Valid AccountRegisterRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.registerUser(request))
                .build();
    }
}
