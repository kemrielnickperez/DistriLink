package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public ResponseEntity<Object> getOrderByID(@PathVariable String orderid){
        return new ResponseEntity<>(orderService.getOrderByID(orderid), HttpStatus.OK);
    }


   /* @PutMapping("/assignCollector/{orderid}")
    public ResponseEntity<Object> assignCollector(@PathVariable String orderid, @RequestBody Employee collector){
        return new ResponseEntity<>(orderService.assignCollector(orderid, collector), HttpStatus.OK);
    }*/

    @PutMapping("/assignCollector/{collectorid}")
    public ResponseEntity<Object> assignCollector(@PathVariable String  collectorid, @RequestBody  String[] orderids) {
        return orderService.assignCollector(orderids, collectorid);
    }

    @PutMapping("/removeCollector/{orderid}")
    public ResponseEntity<Object> removeCollector(@PathVariable String orderid){
        return new ResponseEntity<>(orderService.removeCollector(orderid), HttpStatus.OK);
    }

    @PutMapping("/updateOrder/{orderId}")
    public ResponseEntity<Object> updateOrder(@PathVariable String orderId, @RequestBody Order updatedOrder) {
        return new ResponseEntity<>(orderService.updateOrder(orderId, updatedOrder), HttpStatus.OK);
    }

    @PutMapping("/updateOrderClosedStatus/{orderid}")
    public ResponseEntity<Object> updateOrderClosedStatus(@PathVariable String orderid) {
        return new ResponseEntity<>(orderService.updateOrderClosedStatus(orderid), HttpStatus.OK);
    }

/*    @PutMapping("/applyPenalty/{orderId}")
    public ResponseEntity<Object> applyPenalty(@PathVariable String orderId) {
        orderService.applyPenaltyForLatePayments(orderId);
        return new ResponseEntity<>("Penalty applied successfully for order " + orderId, HttpStatus.OK);
    }*/
    @PutMapping("/applyPenaltyForAllLatePayments")
    public ResponseEntity<String> applyPenaltyForAllLatePayments() {
            orderService.applyPenaltyForAllLatePayments();
            return new ResponseEntity<>("Penalties applied successfully", HttpStatus.OK);

    }


    @GetMapping("/getAllUnconfirmedOrders")
    public ResponseEntity<Object> getAllUnconfirmedOrders(){
        return new ResponseEntity<>(orderService.getAllUnconfirmedOrders(), HttpStatus.OK);
    }

    @GetMapping("/getOrderByDealerId/{dealerId}")
    public ResponseEntity<Object> getOrderByDealerId(@PathVariable String dealerId){
        return new ResponseEntity<>(orderService.getOrderByDealerId(dealerId), HttpStatus.OK);
    }

}
