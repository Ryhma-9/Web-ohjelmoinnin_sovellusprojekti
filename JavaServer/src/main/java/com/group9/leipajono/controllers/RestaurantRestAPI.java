package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.Service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin

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

    @GetMapping("/restaurantcities")
    public String[] getCities() {
        String[] cities = myRestaurantService.getRestaurantsCities();
        return cities;
    }

    @GetMapping("/restaurantsByCity/{city}")
    public List<Restaurant> getRestaurantsByCity(@PathVariable String city){
        List<Restaurant> restaurants = myRestaurantService.getRestaurantsByCity(city);
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }
        return restaurants;
    }

}
