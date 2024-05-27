package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.CreateAccountRequest;
import com.coffee.lowland.DTO.request.UpdateAccountRequest;
import com.coffee.lowland.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toAccount(CreateAccountRequest request);

    void updateAccount(@MappingTarget Account account, UpdateAccountRequest request);
}
