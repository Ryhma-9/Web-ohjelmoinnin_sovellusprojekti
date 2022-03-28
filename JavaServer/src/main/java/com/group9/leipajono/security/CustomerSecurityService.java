package com.group9.leipajono.security;

import java.util.Arrays;
import java.util.Base64;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.group9.leipajono.Service.CustomerService;
import com.group9.leipajono.data.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import net.bytebuddy.asm.Advice.This;

@Service
public class CustomerSecurityService {
    @Autowired
    CustomerService customerService;
    @Autowired
    CustomerPwEncoder encoder;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String checkBasicAuthentication(String basicAuthHeader){
        if(!basicAuthHeader.startsWith("Basic")){
            return null;
        }
        String cred = basicAuthHeader.substring("Basic".length() +1);
        cred = new String(Base64.getDecoder().decode(cred)); //username:password
        String[] info = cred.split(":");
        return checkAuthentication(info[0], info[1]);
    }

    //Metodi autentikoi ja palauttaa tokenin, jos käyttäjä löytyy
    public String checkAuthentication(String userName, String password){
        Customer c = customerService.getCustomer(userName);
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ password +" | " + c.password);
        return encoder.matches(password, c.password) ? createToken(c) :  null;
    }
    public String createToken(Customer c){
        Algorithm alg = Algorithm.HMAC256(jwtSecret);
        System.out.println("******************* mentiin create tokeniin");
        return JWT.create()
        .withSubject(c.userName)
        .withClaim("role", c.role.toString())
        .sign(alg);
    }

    public String validateBearerToken(String bearerHeader){
        if(bearerHeader.startsWith("Bearer")){
            String token = bearerHeader.substring("Bearer".length() +1);
            return this.validateJwt(token);
        }
        return null;
    }
    
    public String validateJwt(String jwtToken){
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
        JWTVerifier verifier = JWT.require(algorithm).build();
        try {
            DecodedJWT jwt = verifier.verify(jwtToken);
            return jwt.getSubject();
        } catch (JWTVerificationException exception){
            //Invalid signature/claims
        }
        return null;
    }

    @Bean // tämän idea on helpottaa mahdollisissa axios-cors-yhteensopivuusongelmissa
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}