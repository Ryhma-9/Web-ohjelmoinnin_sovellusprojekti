package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.Service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantRestAPI {
    
    @Autowired
    RestaurantService myRestaurantService;

    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants(){
        List<Restaurant> restaurants = myRestaurantService.getRestaurants();
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }

        return restaurants;
    }
}
