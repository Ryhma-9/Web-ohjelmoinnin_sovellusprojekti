package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Menu;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.Service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuRestAPI {

    
    @Autowired
    MenuService myMenuService;

    @GetMapping("/menus")
    public List<Menu> getMenus(){
        List<Menu> menu = myMenuService.getMenus();
        for (Menu m : menu) {
            System.out.println("Maistuis varmaan sullekkin! " + m);
        }
        return menu;
    }

    @GetMapping("/menusByRestaurantId/{id}")
    public List<MenuItem> getMenusByRestaurantId(@PathVariable long id) {
        List<MenuItem> Menu = myMenuService.getMenusByRestaurantId(id);
        return Menu;
    }

}
