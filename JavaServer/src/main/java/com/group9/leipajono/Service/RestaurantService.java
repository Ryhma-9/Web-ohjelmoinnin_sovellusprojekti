package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {
    
    @Autowired
    RestaurantRepository myRestaurantRepository;

    @PostConstruct
    public void init(){
        Restaurant r = myRestaurantRepository.findById(1L).orElse(null);

        if(r != null){
            System.out.println("Restaurants name: " + r.restaurantName);
        } else {
            System.out.println("**************************restaurant null");
        }
    }

    public List<Restaurant> getRestaurants(){
        return myRestaurantRepository.findAll();
    }
}
