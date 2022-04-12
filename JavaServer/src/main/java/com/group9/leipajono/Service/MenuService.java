package com.group9.leipajono.Service;

import java.util.List;
import java.util.ArrayList;
import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Menu;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    
  @Autowired
  MenuRepository myMenuRepository;
  @Autowired
  ProductService myProductService;


  @PostConstruct
  public void init(){
    Menu m = myMenuRepository.findById(5L).orElse(null);
    if(m != null){
      System.out.println(m.menuId + " " + m.restaurantId + " " + m.productId);
    } else {
      System.out.println("**************************menu null");
    }
  }

  public List<Menu> getMenus(){
    return myMenuRepository.findAll();
  }

  public List<MenuItem> getMenusByRestaurantId(long id) {
    List<MenuItem> menuItems = new ArrayList<>();
    List<Menu> menu = myMenuRepository.findByRestaurantId(id);
    for (Menu m : menu) {
      menuItems.add(myProductService.getProductAndContentsById(m.getProductId()));
    }
    return menuItems;
  }

}
