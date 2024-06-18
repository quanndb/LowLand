package com.coffee.lowland.exception;

import com.coffee.lowland.DTO.response.APIResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<APIResponse<?>> handleRuntimeExceptions(Exception exception){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage())
                .build();
        log.error(exception.toString());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<APIResponse<?>> handleForbiddenExceptions(Exception exception){
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
        String enumkey = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try{
        errorCode = ErrorCode.valueOf(enumkey);
        }
        catch (Exception exc){}
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = WebClientResponseException.class)
    ResponseEntity<APIResponse<?>> handlePayExceptions(Exception exceptions){
        APIResponse<?> apiResponse = APIResponse.builder()
                .code(ErrorCode.INVALID_ORDER.getCode())
                .message(ErrorCode.INVALID_ORDER.getMessage())
                .build();
        return ResponseEntity.status(ErrorCode.INVALID_ORDER.getStatusCode()).body(apiResponse);
    }
}
