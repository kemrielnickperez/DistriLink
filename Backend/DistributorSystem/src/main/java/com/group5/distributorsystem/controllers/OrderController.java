package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/createOrder")
    public ResponseEntity<Object> createOrder(@RequestBody Order order){

        orderService.createOrder(order);

        return new ResponseEntity<>("Order created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<Object> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/getOrderByID/{orderid}")
    public ResponseEntity<Object> getOrderByID(@PathVariable int orderid){
        return new ResponseEntity<>(orderService.getOrderByID(orderid), HttpStatus.OK);
    }


    @PutMapping("/assignCollector/{orderid}")
    public ResponseEntity<Object> assignCollector(@PathVariable int orderid, @RequestBody Employee collector){
        return new ResponseEntity<>(orderService.assignCollector(orderid, collector), HttpStatus.OK);
    }

    @PutMapping("/removeCollector/{orderid}")
    public ResponseEntity<Object> removeCollector(@PathVariable int orderid){
        return new ResponseEntity<>(orderService.removeCollector(orderid), HttpStatus.OK);
    }
}
