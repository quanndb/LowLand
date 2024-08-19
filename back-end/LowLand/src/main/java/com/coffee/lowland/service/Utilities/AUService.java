package com.coffee.lowland.service.Utilities;

import com.coffee.lowland.JPA.repository.AccountRepository;
import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Account;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AUService {

    AccountRepository accountRepository;

    public Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return accountRepository.findByEmail(authentication.getName())
                    .orElseThrow(()->new AppExceptions(ErrorCode.EMAIL_NOT_EXIST));
        }
        else throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
    }
}
