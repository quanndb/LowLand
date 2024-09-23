package com.coffee.lowland.service.Account;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityService {

    AccountService accountService;

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public boolean hasRole(String role) {
        Authentication authentication = getAuthentication();
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role));
    }

    public boolean hasAnyRole(String... roles) {
        for (String role : roles) {
            if (hasRole(role)) {
                return true;
            }
        }
        return false;
    }

    public boolean isOwner(String accountId) {
        Authentication authentication = getAuthentication();
        if (authentication == null) {
            return false;
        }

        String currentUser = authentication.getName();
        String username = accountId != null && !accountId.isEmpty() ?
                accountService.findAccountById(accountId).getEmail() : "";
        return username.equals(currentUser);
    }

    public boolean isIncludeRoleOrOwner(String accountId, String... roles) {
        return isOwner(accountId) || hasAnyRole(roles);
    }
}
