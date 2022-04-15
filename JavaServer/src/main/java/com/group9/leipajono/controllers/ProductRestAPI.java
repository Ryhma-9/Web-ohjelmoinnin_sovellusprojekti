package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Product;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.Service.ProductService;
import com.group9.leipajono.Service.PictureService;
import com.group9.leipajono.Service.ContentsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
public class ProductRestAPI {

    @Autowired
    ProductService myProductService;
    @Autowired
    ContentsService myContentsService;
    @Autowired
    PictureService myPictureService;

    @GetMapping("/products")
    public List<Product> getProducts() {
        List<Product> products = myProductService.getProducts();
        return products;
    }

    @GetMapping("/productsbyrestaurantid/{id}")
    public List<Product> getProductsByRestaurantId(@PathVariable long restaurantId) {
        List<Product> products = myProductService.getProductsByRestaurantId(restaurantId);
        return products;
    }

    @GetMapping("/productsbymenunumber/{id}")
    public List<Product> getProductsByMenuNumber(@PathVariable long menuNumber) {
        List<Product> products = myProductService.getProductsByMenuNumber(menuNumber);
        return products;
    }

    @GetMapping("/productandcontentsbyid/{id}")
    public MenuItem getProductAndContentsById(@PathVariable long id) {
        MenuItem product = myProductService.getProductAndContentsById(id);
        return product;
    }

    @PostMapping("/addproductandcontets")
    public String addNewProductAndContens(
        @RequestParam String productName,
        @RequestParam double price,
        @RequestParam String[] allergens,
        @RequestParam String ingredients,
        @RequestParam int energyContent,
        @RequestParam String description,
        @RequestParam String type) {
            StringBuilder response = new StringBuilder();
            response.append(myProductService.addNewProduct(productName, price, type) + " and ");
            response.append(myContentsService.addNewContents(myProductService.getLastProductId(), energyContent, ingredients, description, allergens));
            return ""+response;
    }

    @PostMapping("/addproduct")
    public String addNewProduct(
        @RequestParam String productName,
        @RequestParam double price,
        @RequestParam String type) {
            return myProductService.addNewProduct(productName, price, type);
    }

    @PutMapping("/editproductandcontets")
    public String editProductAndContens(
        @RequestParam Long productId,
        @RequestParam String productName,
        @RequestParam double price,
        @RequestParam String[] allergens,
        @RequestParam String ingredients,
        @RequestParam int energyContent,
        @RequestParam String description,
        @RequestParam String type) {
            StringBuilder response = new StringBuilder();
            response.append(myProductService.editProduct(productId, productName, price, type) + " and ");
            response.append(myContentsService.editContents(productId, energyContent, ingredients, description, allergens));
            return ""+response;
    }

    @PutMapping("/editproduct")
    public String editProduct(
        @RequestParam Long productId,
        @RequestParam String productName,
        @RequestParam double price,
        @RequestParam String type) {
            return myProductService.editProduct(productId, productName, price, type);
    }

    @DeleteMapping("/deleteproductandcontentsbyproductid/{id}")
    public String deleteProductAndContentsByProductId(@PathVariable long id) {
        StringBuilder response = new StringBuilder();
        response.append(myProductService.deleteContentsByProductId(id) + " and " + myContentsService.deleteContentsByProductId(id));
        return ""+response;
    }

    @DeleteMapping("/deleteproductbyproductid/{id}")
    public String deleteContentsByProductId(@PathVariable long id) {
        return myProductService.deleteContentsByProductId(id);
    }

@PostMapping("/kuvatesti")
    public String addNewPicture(@RequestParam("file") MultipartFile file) {
            return myPictureService.postPicture(file);
    }

}
