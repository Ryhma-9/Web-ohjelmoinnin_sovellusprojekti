package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Product;
import com.group9.leipajono.repositories.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    @Autowired
    ProductRepository myProductRepository;

    @PostConstruct
    public void init(){
        Product p = myProductRepository.findById(8L).orElse(null);

        if(p != null){
            System.out.println("Product name: " + p.productName);
        } else {
            System.out.println("**************************product null");
        }
    }
}
