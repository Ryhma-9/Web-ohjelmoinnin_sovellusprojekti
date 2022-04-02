package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Customer;
import com.group9.leipajono.repositories.CustomerRepository;
import com.group9.leipajono.security.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService extends PasswordEncoder {
    @Autowired
    CustomerRepository customerRepo;

    @PostConstruct
    public void init(){

    
        // Customer c = new Customer("Kalja", "Kaljanen", "Kaljatie 16", "kalja@gmail.com", "3453546456", "Kalja", passwordEncoder("kalja"), Role.CUSTOMER);
        // customerRepo.save(c);
        // System.out.println("*******************************"+c.password);

        // Customer c = customerRepo.findById(3L).orElse(null);
        // if (c!=null){
        //     c.firstName = "Tero";
        //     c.lastName = "Vahasarja";
        //     c.address = "Kuninkaiden laakso 666";
        //     c.phoneNumber = "43453453234";
        //     c.userId = "Terbinaattori";
        //     c.email = "drttdsrdrtzdrt@gmail.com";
        //     System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+ c.firstName + c.lastName);
        //     customerRepo.save(c);
        // }     
    }
    public List<Customer> getCustomers(){
        return customerRepo.findAll();
    } 
    public Customer getCustomer(String userName){
        Customer c = customerRepo.findById(userName).orElse(null);
        return c;
    }
    public Map<String, Object> getCustomCustomer(String userName){
        Customer c = this.getCustomer(userName);
        Map<String, Object> json = new HashMap<>();
        json.put("username", c.userName);
        json.put("firstname", c.firstName);

        return json;
    }
}
