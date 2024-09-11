package com.coffee.lowland.service.Account;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.CreateAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.auth.UserPage;
import com.coffee.lowland.DTO.response.utilities.CloudResponse;
import com.coffee.lowland.DTO.response.utilities.PageServiceResponse;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.mapper.CloudImageMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Author;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.JPA.repository.AccountRepository;
import com.coffee.lowland.service.Blog.AuthorService;
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
    AuthorService authorService;
    PageService<UserPage> pageService;

    @Transactional
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public PageServiceResponse<UserPage> getAccounts(int page, int size,
                                                    String sortedBy, String sortDirection,
                                                    String query, String role){
        StoredProcedureQuery store = pageService
                .prepareStatement("spGetAccountsByPage", UserPage.class,
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
        newAccount.setIsActive(true);
        accountMapper.register(newAccount,account);
        newAccount.setRole(Role.CUSTOMER);
        accountRepository.save(newAccount);
        return "Register successfully!";
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public UserResponse createAccount(CreateAccountRequest request){
        accountRepository
                .findByEmail(request.getEmail())
                .ifPresent(account -> {
                    throw new AppExceptions(ErrorCode.ACCOUNT_EXISTED);
                });
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        Account newAccount = new Account();
        newAccount.setIsActive(true);
        accountMapper.createAccount(newAccount, request);
        Account saved = accountRepository.save(newAccount);
        authorService.save(Author.builder()
                        .accountId(saved.getAccountId())
                        .position(request.getPosition())
                        .description(request.getDescription())
                        .build());
        return getAccountById(saved.getAccountId());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') " +
            "or @securityService.isOwner(authentication, #accountId)")
    public UserResponse updateAccount(String accountId, UpdateAccountRequest request, MultipartFile image) throws IOException {
        Account foundAccount =  findAccountById(accountId);
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
        if(request.getPassword() != null)
            request.setPassword(passwordEncoder.encode(request.getPassword()));
        accountMapper.updateAccount(foundAccount,request);
        accountRepository.save(foundAccount);
        Author foundAuthor = authorService
                .getOrCreateAuthorByAccountId(foundAccount.getAccountId());
        foundAuthor.setPosition(request.getPosition());
        foundAuthor.setDescription(request.getDescription());
        authorService.save(foundAuthor);
        return getAccountById(foundAccount.getAccountId());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public boolean deleteAccount(String accountId){
       Account foundAccount = accountRepository.findById(accountId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
       foundAccount.setIsActive(false);
       accountRepository.save(foundAccount);
       return true;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') " +
            "or @securityService.isOwner(authentication, #accountId)")
    public UserResponse getAccountById(String accountId) {
        return getInfoAfterAuthenticated(accountId);
    }

    public Account findAccountById(String accountId){
        return accountRepository.findById(accountId)
                .orElseThrow(()-> new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
    }

    public UserResponse getInfoAfterAuthenticated(String accountId){
        Account foundAccount = findAccountById(accountId);
        Author foundAuthor = authorService.getOrCreateAuthorByAccountId(foundAccount.getAccountId());

        UserResponse res = accountMapper.toUserResponse(foundAccount);
        res.setPosition(foundAuthor.getPosition());
        res.setDescription(foundAuthor.getDescription());
        return res;
    }
}
