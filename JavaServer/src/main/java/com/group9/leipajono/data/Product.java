package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.group9.leipajono.enums.Types_enum;

@Entity
@Table(name="product")
public class Product {
    
    @Id
    @Column(name="productid")
    public Long productId;

    @Column(name="productname")
    public String productName;

    @Column(name="price")
    public Double price;

    @Column(name="type")
    public String type;
    // @Column(name="type")
    // public Types_enum type;

    public Product(){}

    public Product(
        String productName,
        Double price,
        String type
        // Types_enum type
    ){
            this.productName = productName;
            this.price = price;
            this.type = type;
    }

    public String getProductName() {
        return productName;
    }

    public Double getPrice() {
        return price;
    }

    public String getType() {
        return type;
    }



}
