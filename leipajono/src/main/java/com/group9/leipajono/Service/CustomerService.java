package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Customer;
import com.group9.leipajono.data.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepo;

    @PostConstruct
    public void init(){
        // System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ok.");
        // Customer c = new Customer();
        // System.out.println("*******************************"+c);
        Customer c = new Customer("firstName", "lastName", "address", "email", "phoneNumber", "userName");
        customerRepo.save(c);
        
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ c);
    }
}
