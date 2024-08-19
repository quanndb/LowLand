package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.account.AccountRegisterRequest;
import com.coffee.lowland.DTO.request.account.UpdateAccountRequest;
import com.coffee.lowland.DTO.response.auth.UserResponse;
import com.coffee.lowland.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    UserResponse toUserResponse(Account request);
    void createAccount(@MappingTarget Account res, AccountRegisterRequest request);

    @Mapping(target = "imageName", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "imageURL", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAccount(@MappingTarget Account account, UpdateAccountRequest request);
}
