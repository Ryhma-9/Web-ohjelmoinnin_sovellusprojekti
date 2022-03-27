package com.group9.leipajono.Service;

import java.util.Map;
import com.group9.leipajono.security.CustomerSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }

}