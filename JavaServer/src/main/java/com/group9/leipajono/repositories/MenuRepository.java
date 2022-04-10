package com.group9.leipajono.repositories;

import java.util.List;

import com.group9.leipajono.data.Menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByRestaurantId(long restaurantId);
}