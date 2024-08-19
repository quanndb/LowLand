package com.coffee.lowland.service.Account;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.CloudResponse;
import com.coffee.lowland.DTO.response.PageServiceResponse;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.mapper.CloudImageMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.JPA.repository.AccountRepository;
import com.coffee.lowland.service.Utilities.CloudinaryService;
import com.coffee.lowland.service.Utilities.PageService;
import jakarta.persistence.StoredProcedureQuery;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    PageService<UserResponse> pageService;

    @Transactional
    @PreAuthorize("hasAuthority('ADMIN')")
    public PageServiceResponse<UserResponse> getAccounts(int page, int size,
                                                    String sortedBy, String sortDirection,
                                                    String query, String role){
        StoredProcedureQuery store = pageService
                .prepareStatement("spGetAccountsByPage", UserResponse.class,
                                    page, size, query,
                                    sortedBy, sortDirection);
        pageService.addField(store,"role", String.class, role);
        return pageService.pageResponse(store);
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

    @PreAuthorize("hasAnyRole('ADMIN') " +
            "or @securityService.isOwner(authentication, #accountId)")
    public UserResponse updateAccount(String accountId, UpdateAccountRequest request, MultipartFile image) throws IOException {
        Account foundAccount = findAccountById(accountId);
        if(image != null){
            if(foundAccount.getCloudId() != null){
                cloudinaryService.delete(foundAccount.getCloudId());
            }
            Map<?,?> uploadResponse = cloudinaryService.upload(image);
            CloudResponse res = cloudImageMapper.toCloudResponse(uploadResponse);
            request.setImageURL(res.getUrl());
            request.setImageName(res.getOriginalFilename());
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

    @PreAuthorize("hasAnyRole('ADMIN')")
    public UserResponse getAccountById(String accountId) {
        Account foundAccount = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        return accountMapper.toUserResponse(foundAccount);
    }

//    public Account findAccountByEmail(String username){
//        return accountRepository.findByEmail(username)
//                .orElseThrow(()-> new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
//    }

    public Account findAccountById(String accountId){
        return accountRepository.findById(accountId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
    }
}
