package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, String>{
}
