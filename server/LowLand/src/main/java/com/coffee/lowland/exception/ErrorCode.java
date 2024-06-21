package com.coffee.lowland.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(5000, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(5002, "Invalid key", HttpStatus.INTERNAL_SERVER_ERROR),
    FORBIDDEN_EXCEPTION(4001,"You're unable to do this", HttpStatus.FORBIDDEN),
    UNAUTHENTICATED(4002, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    EMAIL_EXISTED(4003,"User existed",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(4004, "User is not existed", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(4005, "Email must not be blank", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXIST(4006, "Email is not exist", HttpStatus.BAD_REQUEST),
    EMAIL_PASSWORD_INVALID(4007, "Invalid email or password", HttpStatus.BAD_REQUEST),
    EMAIL_PASSWORD_NULL(4008,"Email and password can not be null", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_EXIST(4009,"Account not exist",HttpStatus.BAD_REQUEST),
   ACCOUNT_EXISTED(4010,"Email existed", HttpStatus.BAD_REQUEST),
    BLOG_NOT_EXISTED(4020,"Your blogID is not existed", HttpStatus.BAD_REQUEST),
    ORDER_NOT_EXISTED(4030,"Your order is not existed", HttpStatus.BAD_REQUEST),
    QUANTITY_AT_LEAST(4031, "Quantity must be at least 1", HttpStatus.BAD_REQUEST),
    PRODUCT_DETAIL_NOT_EMPTY(4032, "Product detail can not be empty", HttpStatus.BAD_REQUEST),
    PRODUCT_DETAIL_NOT_FOUND(4033, "Could not found your product details ID", HttpStatus.BAD_REQUEST),
    INVALID_ORDER(4034, "Invalid order is requested!", HttpStatus.BAD_REQUEST),
    RESOLVED_ORDER(4035,"Your order has been resolved already", HttpStatus.BAD_REQUEST),
    PRODUCT_TYPE_EXISTED(4040,"Product type code existed",HttpStatus.BAD_REQUEST),
    PRODUCT_TYPE_NOT_FOUND(4041,"Product type not found",HttpStatus.BAD_REQUEST),
    PRODUCT_Size_EXISTED(4042,"Product size name existed",HttpStatus.BAD_REQUEST),
    PRODUCT_Size_NOT_FOUND(4043,"Product size not found",HttpStatus.BAD_REQUEST),
    PRODUCT_EXISTED(4044,"Product code existed",HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND(4041,"Product not found",HttpStatus.BAD_REQUEST),
    PRODUCT_IMAGE_NOT_FOUND(4051,"Product image not found",HttpStatus.BAD_REQUEST),
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}
