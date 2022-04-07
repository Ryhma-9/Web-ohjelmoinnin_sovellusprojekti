package com.group9.leipajono.Service;

import java.util.List;
import java.util.ArrayList;
import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Menu;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.data.Contents;
import com.group9.leipajono.data.Product;
import com.group9.leipajono.repositories.MenuRepository;
import com.group9.leipajono.repositories.ContentsRepository;
import com.group9.leipajono.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    
  @Autowired
  MenuRepository myMenuRepository;
  @Autowired
  ContentsRepository myContentsRepository;
  @Autowired
  ProductRepository myProductRepository;

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
      Product p = myProductRepository.findByProductId(m.getProductId());
      MenuItem mi = new MenuItem(m.getProductId(), p.getProductName(), p.getPrice(), p.getType());
      List<Contents> contents = myContentsRepository.findByProductId(m.getProductId());
      String[] allergens = new String[contents.size()];
      int i = 0;
      for (Contents c : contents) {
        if (mi.getEnergyContent() == -1) {
          mi.setEnergyContent(c.getEnergyContents());
        }
        if (mi.getDescription() == "initialized") {
            mi.setDescription(c.getDescription());
        }
        if (mi.getIngredients() == "initialized") {
            mi.setIngredients(c.getIngredients());
        }
        allergens[i] = (c.getAllergens());
        i++;
      }
      mi.setAllergens(allergens);
      menuItems.add(mi);
    }
    return menuItems;
  }

}
