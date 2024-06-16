package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.model.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    UserResponse toUserResponse(Account request);

//    void updateAccount(@MappingTarget Account account, UpdateAccountRequest request);
//
//    @Mapping(target = "roles", ignore = true)
//    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
