package com.coffee.lowland.exception;

import com.coffee.lowland.DTO.response.utilities.APIResponse;
import feign.FeignException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<APIResponse<?>> handleRuntimeExceptions(Exception exception){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage())
                .result(exception.getMessage())
                .build();
        log.error(exception.toString());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<APIResponse<?>> handleForbiddenExceptions(){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(ErrorCode.FORBIDDEN_EXCEPTION.getCode())
                .message(ErrorCode.FORBIDDEN_EXCEPTION.getMessage())
                .build();
        return ResponseEntity.status(ErrorCode.FORBIDDEN_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AppExceptions.class)
    ResponseEntity<APIResponse<?>> handleAppExceptions(AppExceptions exceptions){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(exceptions.getErrorCode().getCode())
                .message(exceptions.getErrorCode().getMessage())
                .build();
        return ResponseEntity.status(exceptions.getErrorCode().getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<APIResponse<?>> handleValidationException(MethodArgumentNotValidException exception){
        String enumKey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try{
        errorCode = ErrorCode.valueOf(enumKey);
        }
        catch (Exception ignored){}
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }
    @ExceptionHandler(value = ConstraintViolationException.class)
    ResponseEntity<APIResponse<?>> handleValidationsException(ConstraintViolationException exception){
        String[] details = Objects.requireNonNull(exception
                .getMessage()).split(" ");
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try{
            errorCode = ErrorCode.valueOf(details[1]);
        }
        catch (Exception ignored){}
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(errorCode.getCode())
                .message(details[0] + errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = FeignException.class)
    ResponseEntity<APIResponse<?>> handlePayExceptions(FeignException exceptions){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(ErrorCode.INVALID_ORDER.getCode())
                .message(ErrorCode.INVALID_ORDER.getMessage())
                .result(exceptions.contentUTF8())
                .build();
        return ResponseEntity.status(ErrorCode.INVALID_ORDER.getStatusCode()).body(apiResponse);
    }
}
