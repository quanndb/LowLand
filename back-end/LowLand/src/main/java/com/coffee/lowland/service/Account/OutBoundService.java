package com.coffee.lowland.service.Account;

import com.coffee.lowland.DTO.request.auth.GetGoogleTokenRequest;
import com.coffee.lowland.DTO.response.auth.GoogleUserResponse;
import com.coffee.lowland.service.Utilities.OutBound.GoogleTokenRepo;
import com.coffee.lowland.service.Utilities.OutBound.GoogleUserRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OutBoundService {
    @NonFinal
    @Value("${CLIENT_ID}")
    String CLIENT_ID;
    @NonFinal
    @Value("${CLIENT_SECRET}")
    String CLIENT_SECRET;
    @NonFinal
    @Value("${REDIRECT_URI}")
    String REDIRECT_URI;
    @NonFinal
    @Value("${GRANT_TYPE}")
    String GRANT_TYPE;


    GoogleTokenRepo tokenRepo;
    GoogleUserRepo userRepo;

    public String getGoogleToken(String code){
        return tokenRepo.token(GetGoogleTokenRequest.builder()
                        .code(code)
                        .clientId(CLIENT_ID)
                        .clientSecret(CLIENT_SECRET)
                        .redirectUri(REDIRECT_URI)
                        .grantType(GRANT_TYPE)
                .build()).getAccessToken();
    }

    public GoogleUserResponse userData(String token){
        return userRepo.userResponse("Bearer "+token);
    }
}
