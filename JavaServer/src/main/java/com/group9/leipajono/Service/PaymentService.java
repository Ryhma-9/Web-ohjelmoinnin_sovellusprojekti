package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Payment;
import com.group9.leipajono.repositories.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    
    @Autowired
    PaymentRepository myPaymentRepository;

    @PostConstruct
    public void init(){
        Payment p = myPaymentRepository.findById(1L).orElse(null);

        if(p != null){
            System.out.println("Payment orders id: " + p.orderId + " and payments id: " + p.paymentId);
        } else {
            System.out.println("**************************payment null");
        }
    }

    public List<Payment> getPayments(){
        return myPaymentRepository.findAll();
    }
}
