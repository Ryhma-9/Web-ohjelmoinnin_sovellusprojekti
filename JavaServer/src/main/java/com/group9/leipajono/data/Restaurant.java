package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "restaurant")
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurantid")
    public Long restaurantId;

    @Column(name = "restaurantname")
    public String restaurantName;

    @Column(name = "restaurantaddress")
    public String restaurantAddress;

    @Column(name = "restaurantusername")
    public String restaurantUserName;

    @Column(name = "restaurantemail")
    public String restaurantEmail;

    @Column(name = "restaurantphonenumber")
    public String restaurantPhoneNumber;

    @Column(name = "restaurantstyle")
    public String restaurantStyle;

    @Column(name = "restaurantpricerange")
    public String restaurantPriceRange;

    @Column(name = "restaurantcity")
    public String restaurantCity;

    @Column(name = "openinghours")
    public String openinghours;

    @Column(name = "restaurantrating")
    public int restaurantRating;

    public Restaurant(){}

    public Restaurant(
        String restaurantName, 
        String restaurantAddress, 
        String restaurantUserName, 
        String restaurantEmail,
        String restaurantPhoneNumber, 
        String restaurantStyle, 
        String restaurantPriceRange,
        String restaurantCity,
        String openinghours,
        int restaurantRating
        ) {
            this.restaurantName = restaurantName;
            this.restaurantAddress = restaurantAddress;
            this.restaurantUserName = restaurantUserName;
            this.restaurantEmail = restaurantEmail;
            this.restaurantPhoneNumber = restaurantPhoneNumber;
            this.restaurantStyle = restaurantStyle;
            this.restaurantPriceRange = restaurantPriceRange;
            this.restaurantCity = restaurantCity;
            this.openinghours = openinghours;
            this.restaurantRating = restaurantRating;
    }

    public String getRestaurantCity() {
        return restaurantCity;
    }

}