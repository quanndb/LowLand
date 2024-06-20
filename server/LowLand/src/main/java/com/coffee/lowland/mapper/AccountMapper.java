package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    UserResponse toUserResponse(Account request);

    void createAccount(@MappingTarget Account res, AccountRegisterRequest request);

    void updateAccount(@MappingTarget Account account, UpdateAccountRequest request);
//
//    @Mapping(target = "roles", ignore = true)
//    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
