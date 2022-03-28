package com.group9.leipajono.Service;

import java.util.Map;

import com.group9.leipajono.data.Customer;
import com.group9.leipajono.data.Role;
import com.group9.leipajono.security.CustomerSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerRestAPI {
    @Autowired
    CustomerService customerService;
    @Autowired
    CustomerSecurityService customerSecurity;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody Map<String, String> credentials){
        String token = customerSecurity.checkAuthentication(
            credentials.get("username"),
            credentials.get("password"));

        if(token == null){
            System.out.println("token on null");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }
    @PostMapping("/loginbasic")
    public ResponseEntity<Map<String,String>> loginBasic(@RequestHeader("authorization") String basicAuthHeader){
        String token = customerSecurity.checkBasicAuthentication(basicAuthHeader);
        System.out.println(basicAuthHeader);

        if(token == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }
    @GetMapping("/private")
    public ResponseEntity<String> getPrivate(@RequestHeader("authorization") String bearer){
        String c = customerSecurity.validateBearerToken(bearer);
        System.out.println(bearer);
        
        if (c==null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        // if (c. == Role.ADMIN){
        //     //tähän adminin oikeudella juttuja
        // }
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @GetMapping("/customers")
    public Map<String, Object> getCustomers(){
        return customerService.getCustomCustomer("sheppomies2");
    }
}