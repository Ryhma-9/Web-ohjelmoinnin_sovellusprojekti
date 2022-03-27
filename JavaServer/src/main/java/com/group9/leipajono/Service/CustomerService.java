package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Customer;
import com.group9.leipajono.data.CustomerRepository;
import com.group9.leipajono.data.Role;
import com.group9.leipajono.security.CustomerPwEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepo;

    @PostConstruct
    public void init(){

        Customer c = new Customer("Kalle", "Kalunen", "Kalukatu 6", "kallunen666", "666666666", "kallekalu", "kakakakakak", Role.CUSTOMER);
        customerRepo.save(c);
        System.out.println("*******************************"+c);

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
        return customerRepo.findById(userName).orElse(null);
    }
}
