package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customerid")
    public Long customerId;
    
    @Column(name = "firstname")
    public String firstName;
    
    @Column(name = "lastname")
    public String lastName;
    
    @Column(name = "addr")
    public String address;
    
    @Column(name = "email")
    public String email;
    
    @Column(name = "phonenumber")
    public String phoneNumber;
    
    @Column(name = "username")
    public String userName;

    public Customer(String firstName, String lastName, String address, String email, String phoneNumber, String userName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
    }
    public Customer() {
    }


}
