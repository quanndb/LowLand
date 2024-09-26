package com.coffee.lowland.service.Account;

import com.coffee.lowland.DTO.request.auth.AuthenticationRequest;
import com.coffee.lowland.DTO.request.auth.DetailsLogin;
import com.coffee.lowland.DTO.response.auth.AuthenticationResponse;
import com.coffee.lowland.DTO.response.auth.GoogleUserResponse;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.JPA.repository.AccountRepository;
import com.coffee.lowland.service.Utilities.ChartService;
import com.coffee.lowland.service.Utilities.RandomCodeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class AuthenticationService {

    AccountRepository accountRepository;
    AccountService accountService;
    PasswordEncoder passwordEncoder;
    TokenService tokenService;
    OutBoundService outBoundService;
    ChartService chartService;
    RandomCodeService randomCodeService;

    public AuthenticationResponse authenticate(AuthenticationRequest request, DetailsLogin detailsLogin){
        var account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
        if(!account.getIsActive()) throw new AppExceptions(ErrorCode.ACCOUNT_NOT_ACTIVE);
        boolean authenticate = passwordEncoder.matches(request.getPassword(),
                account.getPassword());

        if(!authenticate) throw new AppExceptions(ErrorCode.EMAIL_PASSWORD_INVALID);

        var token = tokenService.generateToken(account, detailsLogin.toString());
        UserResponse response = accountService.getInfoAfterAuthenticated(account.getAccountId());
        chartService.postAccess(detailsLogin, response.getEmail());
        return AuthenticationResponse.builder()
                .accessToken(token)
                .authenticated(true)
                .userResponse(response)
                .build();
    }

    public AuthenticationResponse loginWithGoogle(String code, DetailsLogin detailsLogin){
        String googleToken = outBoundService.getGoogleToken(code);
        GoogleUserResponse res = outBoundService.userData(googleToken);
        Account foundUser = accountRepository.findByEmail(res.getEmail())
                .orElseGet(() -> {
                    String generatedPassword = passwordEncoder.encode(randomCodeService.generateCode() + "");
                    Account newAccount = Account.builder()
                            .email(res.getEmail())
                            .password(generatedPassword)
                            .isActive(true)
                            .role(Role.CUSTOMER)
                            .fullName(res.getName())
                            .imageURL(res.getPicture())
                            .build();
                    return accountRepository.save(newAccount);
                });
        if(!foundUser.getIsActive()) throw new AppExceptions(ErrorCode.ACCOUNT_NOT_ACTIVE);
        UserResponse response = accountService.getInfoAfterAuthenticated(foundUser.getAccountId());
        var token = tokenService.generateToken(foundUser, detailsLogin.toString());
        chartService.postAccess(detailsLogin, response.getEmail());
        return AuthenticationResponse.builder()
                    .accessToken(token)
                    .authenticated(true)
                    .userResponse(response)
                    .build();
    }

    public String logout(){
        tokenService.setLogout(getMyInfo().getAccountId());
        return "Logout success!";
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Account account = accountRepository.findByEmail(name)
                .orElseThrow(() -> new AppExceptions(ErrorCode.USER_NOT_EXISTED));
        return accountService.getInfoAfterAuthenticated(account.getAccountId());
    }
}
