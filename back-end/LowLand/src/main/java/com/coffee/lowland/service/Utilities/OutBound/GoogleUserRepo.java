package com.coffee.lowland.service.Utilities.OutBound;

import com.coffee.lowland.DTO.response.auth.GoogleUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "GoogleUserInfo", url = "${GOOGLE_API_OAUTH}")
public interface GoogleUserRepo {
    @GetMapping(value = "/userinfo")
    GoogleUserResponse userResponse(@RequestHeader(name = "Authorization") String authHeader);
}
