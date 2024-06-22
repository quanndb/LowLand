package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.ChangeAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AccountService {

    PasswordEncoder passwordEncoder;
    AccountRepository accountRepository;
    AccountMapper accountMapper;

    public List<UserResponse> getAll(){
        List<Account> res= accountRepository.findAll();
        return accountMapper.toListUserResponse(res);
    }

    public String registerUser(AccountRegisterRequest account){
        accountRepository
                .findAccountByEmail(account.getEmail())
                .ifPresent(foundAccount -> {
                    throw new AppExceptions(ErrorCode.ACCOUNT_EXISTED);
                });
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        Account newAccount = new Account();
        accountMapper.createAccount(newAccount,account);
        newAccount.setRole(Role.USER);
        accountRepository.save(newAccount);
        return "Register successfully!";
    }

    public UserResponse createAccount(Account request){
        accountRepository
                .findAccountByEmail(request.getEmail())
                .ifPresent(account -> {
                    throw new AppExceptions(ErrorCode.ACCOUNT_EXISTED);
                });
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        Account res = accountRepository.save(request);
        return accountMapper.toUserResponse(res);
    }

    public UserResponse changeAccount(ChangeAccountRequest request){
        Account foundAccount = accountRepository.findById(request.getAccountId())
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        accountMapper.changeAccount(foundAccount,request);
        accountRepository.save(foundAccount);

        return accountMapper.toUserResponse(foundAccount);
    }

    public UserResponse updateAccount(UpdateAccountRequest request){
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Account foundAccount = accountRepository.findAccountByEmail(currentUser)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        accountMapper.updateAccount(foundAccount,request);
        accountRepository.save(foundAccount);

        return accountMapper.toUserResponse(foundAccount);
    }

    public boolean delteAccount(int accountId){
        accountRepository.findById(accountId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        accountRepository.deleteById(accountId);
        return true;
    }

    public Account findAccountByEmail(String username){
        return accountRepository.findAccountByEmail(username)
                .orElseThrow(()-> new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
    }
}
