package com.coffee.lowland.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(5000, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(5002, "Invalid key", HttpStatus.INTERNAL_SERVER_ERROR),
    FORBIDDEN_EXCEPTION(4001,"You're unable to do this", HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(4002, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    USER_EXISTED(4003,"User existed",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(4004, "User is not existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(4005, "Username must not be blank", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXIST(4006, "Username is not exist", HttpStatus.BAD_REQUEST),
    USERNAME_PASSWORD_INVALID(4007, "Invalid username or password", HttpStatus.BAD_REQUEST),
    BLOG_NOT_EXIST(4008, "Blog is not exist", HttpStatus.BAD_REQUEST)
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}
