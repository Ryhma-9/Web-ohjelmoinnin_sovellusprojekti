package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;

import java.util.List;
import com.group9.leipajono.data.Product;
import com.group9.leipajono.data.Contents;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.repositories.ProductRepository;
import com.group9.leipajono.repositories.ContentsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    @Autowired
    ProductRepository myProductRepository;
    @Autowired
    ContentsRepository myContentsRepository;

    @PostConstruct
    public void init(){
        Product p = myProductRepository.findById(8L).orElse(null);
        if(p != null){
            System.out.println("Product name: " + p.productName);
        } else {
            System.out.println("**************************product null");
        }
    }

    public MenuItem getProductAndContentsById(long id) {
        Product p = myProductRepository.findByProductId(id);
        MenuItem mi = new MenuItem(id, p.getProductName(), p.getPrice(), p.getType());
        List<Contents> contents = myContentsRepository.findByProductId(id);
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
        return mi;
    }




}
