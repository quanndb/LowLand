package com.coffee.lowland.service.Account;

import com.coffee.lowland.DTO.request.auth.AuthenticationRequest;
import com.coffee.lowland.DTO.response.auth.AuthenticationResponse;
import com.coffee.lowland.DTO.response.auth.GoogleUserResponse;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.mapper.AccountMapper;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Role;
import com.coffee.lowland.JPA.repository.AccountRepository;
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

    AccountMapper accountMapper;
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    TokenService tokenService;
    OutBoundService outBoundService;
    RandomCodeService randomCodeService;

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        var account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
        boolean authenticate = passwordEncoder.matches(request.getPassword(),
                account.getPassword());

        if(!authenticate) throw new AppExceptions(ErrorCode.EMAIL_PASSWORD_INVALID);

        var token = tokenService.generateToken(account);

        return AuthenticationResponse.builder()
                .accessToken(token)
                .authenticated(true)
                .userResponse(accountMapper.toUserResponse(account))
                .build();
    }

    public AuthenticationResponse loginWithGoogle(String code){
        String googleToken = outBoundService.getGoogleToken(code);
        GoogleUserResponse res = outBoundService.userData(googleToken);
        Account foundUser = accountRepository.findByEmail(res.getEmail())
                .orElseGet(() -> {
                    String generatedPassword = passwordEncoder.encode(randomCodeService.generateCode() + "");
                    Account newAccount = Account.builder()
                            .email(res.getEmail())
                            .password(generatedPassword)
                            .role(Role.CUSTOMER)
                            .fullName(res.getName())
                            .imageURL(res.getPicture())
                            .build();
                    return accountRepository.save(newAccount);
                });

            var token = tokenService.generateToken(foundUser);
            return AuthenticationResponse.builder()
                    .accessToken(token)
                    .authenticated(true)
                    .userResponse(accountMapper.toUserResponse(foundUser))
                    .build();
    }

    public String logout(){
        tokenService.setLogout(getMyInfo().getAccountId());
        return "Logout success!";
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        Account account = accountRepository.findByEmail(name).orElseThrow(() -> new AppExceptions(ErrorCode.USER_NOT_EXISTED));
        return accountMapper.toUserResponse(account);
    }
}
