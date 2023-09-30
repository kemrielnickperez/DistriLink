package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.repositories.OrderedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class OrderedProductService {

    @Autowired
    OrderedProductRepository orderedProductRepository;

    public OrderedProduct createOrderedProduct(OrderedProduct orderedProduct){
        return orderedProductRepository.save(orderedProduct);
    }

    public List<OrderedProduct> getAllOrderedProducts(){
        return orderedProductRepository.findAll();
    }


    /*public Set<OrderedProduct> findByOrderid(String orderid){
       return orderedProductRepository.findByOrderid(orderid);
    }*/



}

