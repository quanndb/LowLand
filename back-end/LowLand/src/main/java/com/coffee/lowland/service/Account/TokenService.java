package com.coffee.lowland.service.Account;

import com.coffee.lowland.exception.AppExceptions;
import com.coffee.lowland.exception.ErrorCode;
import com.coffee.lowland.model.Account;
import com.coffee.lowland.model.Token;
import com.coffee.lowland.JPA.repository.TokenRepository;
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
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TokenService {

    @NonFinal
    @Value("${app.secret-key}")
    String SECRET_KEY;

    TokenRepository tokenRepository;

    public String generateToken(Account account,String details) {
        String tokenId  = tokenRepository.save(Token.builder()
                    .logout(false)
                    .accountId(account.getAccountId())
                    .lastLogin(LocalDateTime.now().toString())
                    .details(details)
                    .build()).getTokenId();
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

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public void setLogout(String accountId){
        List<Token> current = tokenRepository
                .findByAccountIdAndLogout(accountId,false);
        if(!current.isEmpty()){
            for(Token item : current){
                item.setLogout(true);
            }
            tokenRepository.saveAll(current);
        }
    }

    public boolean verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        try{
            if (!(verified && expiryTime.after(new Date()))) {
                throw new AppExceptions(ErrorCode.UNAUTHENTICATED);
            }

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
