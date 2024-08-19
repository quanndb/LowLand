package com.coffee.lowland.service.Account;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.service.Utilities.AUService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityService {

    AccountService accountService;

    public boolean hasRole(Authentication authentication, String role) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role));
    }

    public boolean hasAnyRole(Authentication authentication, String... roles) {
        for (String role : roles) {
            if (hasRole(authentication, role)) {
                return true;
            }
        }
        return false;
    }

    public boolean isOwner(Authentication authentication, String accountId) {
        String currentUser = authentication.getName();
        String username = accountId != null && !accountId.isEmpty() ?
                accountService.findAccountById(accountId).getEmail() : "";
        return username.equals(currentUser);
    }
}
