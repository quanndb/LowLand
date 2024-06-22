package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.ChangeAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AccountController {

    AccountService accountService;

    @GetMapping("")
    public APIResponse<?> getAll(){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.getAll())
                .build();
    }
    @PostMapping("/edit-account")
    public APIResponse<?> changeAccount(@RequestBody ChangeAccountRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.changeAccount(request))
                .build();
    }

    @PostMapping("/delete-account")
    public APIResponse<?> delete(@RequestParam int accountId){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.delteAccount(accountId))
                .build();
    }


    @PostMapping("/register")
    public APIResponse<?> register(@RequestBody AccountRegisterRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.registerUser(request))
                .build();
    }

    @PostMapping("/new-account")
    public APIResponse<?> createAccount(@RequestBody Account request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.createAccount(request))
                .build();
    }

    @PostMapping("/my-account")
    public APIResponse<?> updateAccount(@RequestBody UpdateAccountRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.updateAccount(request))
                .build();
    }
}
