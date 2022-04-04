package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Orders;
import com.group9.leipajono.repositories.OrdersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {
    
    @Autowired
    OrdersRepository myOrdersRepository;

    @PostConstruct
    public void init(){
        Orders o = myOrdersRepository.findById(3L).orElse(null);

        if(o != null){
            System.out.println("Orders id: " + o.orderId);
        } else {
            System.out.println("**************************orders null");
        }
    }

    public List<Orders> getOrders(){
        return myOrdersRepository.findAll();
    }
}
