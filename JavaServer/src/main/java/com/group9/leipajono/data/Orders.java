package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @Column(name = "orderid")
    public Long orderId;

    @Column(name = "customerid")
    public Long customerId;

    @Column(name = "productid")
    public Long productId;

    @Column(name = "restaurantid")
    public Long restaurantId;

    @Column(name = "tobedelivered")
    public Boolean toBeDelivered;

    public Orders(){}

    public Orders(
        Long customerId,
        Long restaurantId, 
        Long productId,
        Boolean toBeDelivered){

            this.customerId = customerId;
            this.restaurantId = restaurantId;
            this.productId = productId;
            this.toBeDelivered = toBeDelivered;
        }
}