package com.coffee.lowland.controller;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.ChangeAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.APIResponse;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AccountController {

    AccountService accountService;

    @GetMapping("")
    public APIResponse<?> getAll(@RequestParam(required = false, defaultValue = "0") int page,
                                 @RequestParam(required = false, defaultValue = "10") int size,
                                 @RequestParam(required = false, defaultValue = "") String query){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.getAll(page,size,query))
                .build();
    }
    @PostMapping("/user-info")
    public APIResponse<?> changeAccountInfo(@RequestBody ChangeAccountRequest request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.changeAccountInfo(request))
                .build();
    }

    @DeleteMapping("/{accountId}")
    public APIResponse<?> delete(@PathVariable String accountId){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.deleteAccount(accountId))
                .build();
    }

    @PostMapping("/new-account")
    public APIResponse<?> createAccount(@RequestBody Account request){
        return APIResponse.builder()
                .code(2000)
                .result(accountService.createAccount(request))
                .build();
    }

    @PostMapping("/profile")
    public APIResponse<?> updateAccount(@RequestParam(required = false, value = "userInfo")
                                            String userInfo,
                                        @RequestParam(required = false, value = "image")
                                            MultipartFile image )
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        return APIResponse.builder()
                .code(2000)
                .result(accountService
                        .updateAccount(objectMapper
                                .readValue(userInfo, UpdateAccountRequest.class),image))
                .build();
    }
}
