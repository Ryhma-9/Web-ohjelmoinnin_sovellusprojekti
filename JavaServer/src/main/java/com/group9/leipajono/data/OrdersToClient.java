package com.group9.leipajono.data;

public class OrdersToClient {

    private Long customerId;
    private Long restaurantId;
    private Boolean toBeDelivered;
    private Long orderNumber;
    private Long[] productIds;
    private Long[] quantities;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Boolean getToBeDelivered() {
        return toBeDelivered;
    }

    public void setToBeDelivered(Boolean toBeDelivered) {
        this.toBeDelivered = toBeDelivered;
    }

    public Long getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long[] getProductIds() {
        return productIds;
    }

    public void setProductIds(Long[] productIds) {
        this.productIds = productIds;
    }

    public Long[] getQuantities() {
        return quantities;
    }

    public void setQuantities(Long[] quantities) {
        this.quantities = quantities;
    }

    public OrdersToClient(){}

    public OrdersToClient(
        Long customerId,
        Long restaurantId, 
        Long[] productIds,
        Boolean toBeDelivered,
        Long orderNumber,
        Long[] quantities){
            this.customerId = customerId;
            this.restaurantId = restaurantId;
            this.productIds = productIds;
            this.toBeDelivered = toBeDelivered;
            this.orderNumber = orderNumber;
            this.quantities = quantities;
    }
}