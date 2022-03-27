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
import org.springframework.context.support.BeanDefinitionDsl.Role;
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
        if (c==null){
            return null;
        }
        return encoder.matches(password, c.password) ? createToken(c) :  null;
    }
    public String createToken(Customer c){
        Algorithm alg = Algorithm.HMAC256(jwtSecret);
        
        return JWT.create()
        .withSubject(c.userName)
        .withClaim("role", c.role.toString())
        .sign(alg);
    }
    
    public Customer validateJwt(String jwtToken){
        Customer customer = null;
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
        JWTVerifier verifier = JWT.require(algorithm).build();
        try {
            DecodedJWT jwt = verifier.verify(jwtToken);
            customer = new Customer(
                jwt.getSubject(),
                null,
                Role.valueOf(jwt.getClaim("role").asString()));
        } catch (JWTVerificationException exception){
            //Invalid signature/claims
        }
    }
}