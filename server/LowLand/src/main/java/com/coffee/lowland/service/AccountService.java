package com.coffee.lowland.service;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.ChangeAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.CloudResponse;
import com.coffee.lowland.DTO.response.ListItemResponse;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.mapper.CloudImageMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AccountService {

    PasswordEncoder passwordEncoder;
    AccountRepository accountRepository;
    AccountMapper accountMapper;
    CloudImageMapper cloudImageMapper;
    CloudinaryService cloudinaryService;

    @PreAuthorize("hasAuthority('ADMIN')")
    public ListItemResponse<UserResponse> getAll(int page, int size, String query){
        Page<Account> res = accountRepository.findAll(PageRequest.of(page, size));
        return accountMapper.toListUserResponse(res);
    }

    public String registerUser(AccountRegisterRequest account){
        accountRepository
                .findByEmail(account.getEmail())
                .ifPresent(foundAccount -> {
                    throw new AppExceptions(ErrorCode.ACCOUNT_EXISTED);
                });
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        Account newAccount = new Account();
        accountMapper.createAccount(newAccount,account);
        newAccount.setRole(Role.CUSTOMER);
        accountRepository.save(newAccount);
        return "Register successfully!";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse createAccount(Account request){
        accountRepository
                .findByEmail(request.getEmail())
                .ifPresent(account -> {
                    throw new AppExceptions(ErrorCode.ACCOUNT_EXISTED);
                });
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        Account res = accountRepository.save(request);
        return accountMapper.toUserResponse(res);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public UserResponse changeAccountInfo(ChangeAccountRequest request){
        Account foundAccount = accountRepository.findById(request.getAccountId())
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        accountMapper.changeAccount(foundAccount,request);
        accountRepository.save(foundAccount);

        return accountMapper.toUserResponse(foundAccount);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','CUSTOMER')")
    public UserResponse updateAccount(UpdateAccountRequest request, MultipartFile image) throws IOException {
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        Account foundAccount = accountRepository.findByEmail(currentUser)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));

        if(image != null){
            if(foundAccount.getCloudId() != null){
                cloudinaryService.delete(foundAccount.getCloudId());
            }
            Map<?,?> uploadResponse = cloudinaryService.upload(image);
            CloudResponse res = cloudImageMapper.toCloudResponse(uploadResponse);
            request.setImageURL(res.getUrl());
            request.setCloudId(res.getPublicId());
        }

        accountMapper.updateAccount(foundAccount,request);
        accountRepository.save(foundAccount);

        return accountMapper.toUserResponse(foundAccount);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean deleteAccount(String accountId){
        accountRepository.findById(accountId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        accountRepository.deleteById(accountId);
        return true;
    }

    public Account findAccountByEmail(String username){
        return accountRepository.findByEmail(username)
                .orElseThrow(()-> new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
    }
}
