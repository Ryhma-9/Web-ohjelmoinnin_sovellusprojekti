package com.group9.leipajono.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Orders;
import com.group9.leipajono.data.OrdersToClient;
import com.group9.leipajono.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {
    
    @Autowired
    OrdersRepository myOrdersRepository;

    @PostConstruct
    public void init(){
        Orders o = myOrdersRepository.findById(3L).orElse(null);
        if(o != null){
            System.out.println("Orders id: " + o.orderId);
        } else {
            System.out.println("**************************orders null");
        }
    }

    public List<Orders> getOrders(){
        return myOrdersRepository.findAll();
    }

    public OrdersToClient getOrderByOrderNumber(Long orderNumber){
        List<Orders> order = myOrdersRepository.findOrdersByOrderNumber(orderNumber);
        Long[] productIdListing = new Long[order.size()];
        Long[] quantitiesListing = new Long[order.size()];
        int i = 0;
        boolean firstRun = true;
        OrdersToClient oc = new OrdersToClient();
        for (Orders o : order) {
            if (firstRun == true) {
                oc.setCustomerId(o.getCustomerId());
                oc.setRestaurantId(o.getRestaurantId());
                oc.setToBeDelivered(o.getToBeDelivered());
                oc.setOrderNumber(o.getOrderNumber());
                firstRun = false;
            }
            productIdListing[i] = o.getProductId();
            quantitiesListing[i] = o.getQuantity();
            i++;
        }
        oc.setProductIds(productIdListing);
        oc.setQuantities(quantitiesListing);
        return oc;
    }
    
    public List<OrdersToClient> ordersToOrdersToclientForm(List<Orders> orders){
        List<OrdersToClient> ordersToClient = new ArrayList<>();
        Long[] orderNumberListing = new Long[orders.size()];
        int i = 0;
        for (Orders o : orders) {
            if (Arrays.asList(orderNumberListing).contains(o.getOrderNumber()) == false) {
                ordersToClient.add(getOrderByOrderNumber(o.getOrderNumber()));
                orderNumberListing[i] = o.getOrderNumber();
                i++;
            }
        }
        return ordersToClient;
    }

    public List<OrdersToClient> getOrdersByCustomerId(Long customerId){
        List<Orders> customersOrders = myOrdersRepository.findOrdersByCustomerId(customerId);
        return ordersToOrdersToclientForm(customersOrders);
    }

    public List<OrdersToClient> getOpenOrdersByCustomerId(Long customerId){
        List<Orders> customersOrders = myOrdersRepository.findOrdersByCustomerIdAndToBeDelivered(customerId, false);
        return ordersToOrdersToclientForm(customersOrders);
    }

    public List<OrdersToClient> getOrdersByRestaurantId(Long restaurantId){
        List<Orders> restaurantssOrders = myOrdersRepository.findOrdersByCustomerId(restaurantId);
        return ordersToOrdersToclientForm(restaurantssOrders);
    }

    public List<OrdersToClient> getOpenOrdersByRestaurantId(Long restaurantId){
        List<Orders> restaurantssOrders = myOrdersRepository.findOrdersByRestaurantIdAndToBeDelivered(restaurantId, false);
        return ordersToOrdersToclientForm(restaurantssOrders);
    }

    public int getOpenOrdersQuantityByRestaurantId(Long restaurantId){
        return getOpenOrdersByRestaurantId(restaurantId).size();
    }

    public String setOrderToDelivered(Long orderNumber){
        try {
            List<Orders> order = myOrdersRepository.findOrdersByOrderNumber(orderNumber);
            for (Orders o : order) {
                Orders orderToUpdate = myOrdersRepository.getById(o.getOrderId());
                orderToUpdate.setToBeDelivered(true);
                myOrdersRepository.save(orderToUpdate);
            }
            return "Delivery status updated successfully";
        }
        catch (Exception e) {
            return "Delivery status update failed";
        }      
    }   

    public String addNewOrder(Long customerId, Long restaurantId, Long[] productIds, Long[] quantityes){
        try {
            Long orderNumber = myOrdersRepository.getMaxOrderNumber()+1;
            for (int i = 0; i < productIds.length; i++) {
                Orders o = new Orders(myOrdersRepository.getMaxOrderId()+1, customerId, restaurantId, productIds[i], false, orderNumber, quantityes[i]);
                myOrdersRepository.save(o);
            }
            return "Order added successfully";
        }
        catch (Exception e) {
            return "Order addition failed";
        }        
    }
}