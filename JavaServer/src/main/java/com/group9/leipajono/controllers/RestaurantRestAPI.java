package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.Service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class RestaurantRestAPI {
    
    @Autowired
    RestaurantService myRestaurantService;

    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants() {
        List<Restaurant> restaurants = myRestaurantService.getRestaurants();
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }
        return restaurants;
    }

    @GetMapping("/restaurantbyid/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = myRestaurantService.getRestaurantById(id);
        return restaurant;
    }
    

    @GetMapping("/restaurantcities")
    public String[] getCities() {
        String[] cities = myRestaurantService.getRestaurantsCities();
        return cities;
    }

    @GetMapping("/restaurantsByCity/{city}")
    public List<Restaurant> getRestaurantsByCity(@PathVariable String city) {
        List<Restaurant> restaurants = myRestaurantService.getRestaurantsByCity(city);
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }
        return restaurants;
    }

    @PostMapping("/addrestaurant")
    public String addNewRestaurant(
        @RequestParam String restaurantName,
        @RequestParam String restaurantAddress, 
        @RequestParam String restaurantUserName,
        @RequestParam String restaurantEmail,
        @RequestParam String restaurantPhoneNumber, 
        @RequestParam String restaurantStyle, 
        @RequestParam String restaurantPriceRange,
        @RequestParam String restaurantCity,
        @RequestParam String openinghours,
        @RequestParam int restaurantRating) {
            return myRestaurantService.addNewRestaurant(
                restaurantName,
                restaurantAddress, 
                restaurantUserName,
                restaurantEmail,
                restaurantPhoneNumber, 
                restaurantStyle, 
                restaurantPriceRange,
                restaurantCity,
                openinghours,
                restaurantRating
            );
    }

    @PostMapping("/editrestaurant")
    public String editRestaurant(
        @RequestParam Long restaurantId,
        @RequestParam String restaurantName,
        @RequestParam String restaurantAddress, 
        @RequestParam String restaurantUserName,
        @RequestParam String restaurantEmail,
        @RequestParam String restaurantPhoneNumber, 
        @RequestParam String restaurantStyle, 
        @RequestParam String restaurantPriceRange,
        @RequestParam String restaurantCity,
        @RequestParam String openinghours,
        @RequestParam int restaurantRating) {
            return myRestaurantService.editRestaurant(
                restaurantId,
                restaurantName,
                restaurantAddress, 
                restaurantUserName,
                restaurantEmail,
                restaurantPhoneNumber, 
                restaurantStyle, 
                restaurantPriceRange,
                restaurantCity,
                openinghours,
                restaurantRating
            );
    }

}
