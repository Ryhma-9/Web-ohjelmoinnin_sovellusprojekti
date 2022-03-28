package com.group9.leipajono.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.group9.leipajono.Service.CustomerService;
import com.group9.leipajono.data.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CustomerSecurityService {
    @Autowired
    CustomerService customerService;
    @Autowired
    CustomerPwEncoder encoder;

    @Value("${jwt.secret}")
    private String jwtSecret;

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
}