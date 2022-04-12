package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Restaurant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findRestaurantsByRestaurantCity(String restaurantCity);
}
