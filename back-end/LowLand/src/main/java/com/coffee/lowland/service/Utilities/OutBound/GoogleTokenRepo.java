package com.coffee.lowland.service.Utilities.OutBound;

import com.coffee.lowland.DTO.request.auth.GetGoogleTokenRequest;
import com.coffee.lowland.DTO.response.auth.ExchangeTokenResponse;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "GoogleToken", url = "${GOOGLE_OAUTH}")
public interface GoogleTokenRepo {
    @PostMapping(value = "/token",produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    ExchangeTokenResponse token(@QueryMap GetGoogleTokenRequest request);
}
