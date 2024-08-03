package com.coffee.lowland.service;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Token;
import com.coffee.lowland.repository.TokenRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TokenService {

    @NonFinal
    @Value("${SECRET_KEY}")
    String SECRET_KEY;

    TokenRepository tokenRepository;

    public String generateToken(Account account) {
        Optional<Token> current = tokenRepository.findByAccountId(account.getAccountId());
        String tokenId = null;
        if(current.isPresent()){
            current.get().setLogout(false);
            tokenId = tokenRepository.save(current.get()).getTokenId();
        }
        else{
            tokenId = tokenRepository.save(Token.builder()
                    .isLogout(false)
                    .accountId(account.getAccountId())
                    .build()).getTokenId();
        }
        try {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
            JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                    .subject(account.getEmail())
                    .issuer("lowland")
                    .issueTime(new Date(System.currentTimeMillis()))
                    .expirationTime(new Date(System.currentTimeMillis() + 60*60*1000))
                    .claim("scope",account.getRole().name())
                    .jwtID(tokenId)
                    .build();

            Payload payload = new Payload(jwtClaimsSet.toJSONObject());

            JWSObject jwsObject = new JWSObject(header, payload);
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            String token = jwsObject.serialize();

            return token;
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public void setLogout(String accountId){
        Token current = tokenRepository
                .findByAccountId(accountId)
                .orElseThrow(()->new AppExceptions(ErrorCode.ACCOUNT_NOT_EXIST));
        current.setLogout(true);
        tokenRepository.save(current);
    }

    public boolean verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        try{
            if (!(verified && expiryTime.after(new Date()))) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);

            boolean isLogout = tokenRepository.findById(signedJWT.getJWTClaimsSet().getJWTID())
                    .orElseThrow(() -> new AppExceptions(ErrorCode.UNAUTHENTICATED)).isLogout();
            if(isLogout) throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
            return true;
        }
        catch (AppExceptions exceptions){
            return false;
        }
    }
}
