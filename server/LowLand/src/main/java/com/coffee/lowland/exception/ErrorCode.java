package com.coffee.lowland.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(5000, "Uncategorized error"),
    INVALID_KEY(5001, "Invalid key"),
    USER_EXISTED(4001,"User existed"),
    USERNAME_INVALID(4002, "Username must not be blank"),
    USERNAME_NOT_EXIST(4003, "Username is not exist"),
    UNAUTHENTICATED(4004, "Invalid username or password")
    ;

    int code;
    String message;
}
