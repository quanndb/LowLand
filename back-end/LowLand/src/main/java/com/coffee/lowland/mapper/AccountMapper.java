package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.CreateAccountRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.model.Account;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    UserResponse toUserResponse(Account request);
    void register(@MappingTarget Account res, AccountRegisterRequest request);
    void createAccount(@MappingTarget Account res, CreateAccountRequest request);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAccount(@MappingTarget Account account, UpdateAccountRequest request);
}
