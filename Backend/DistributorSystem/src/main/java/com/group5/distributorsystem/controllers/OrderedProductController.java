package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.repositories.OrderRepository;
import com.group5.distributorsystem.services.OrderedProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/orderedproduct")
public class OrderedProductController {

    @Autowired
    OrderedProductService orderedProductService;

    @Autowired
    OrderRepository orderRepository;

    @PostMapping("/createOrderedProduct")
    public ResponseEntity<Object> createOrderedProduct(@RequestBody OrderedProduct orderedProduct){
        orderedProductService.createOrderedProduct(orderedProduct);

        return new ResponseEntity<>("Ordered Product created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllOrderedProducts")
    public ResponseEntity<Object> getAllOrderedProducts(){
        return new ResponseEntity<>(orderedProductService.getAllOrderedProducts(), HttpStatus.OK);
    }

    @PostMapping("/addOrderedProduct/{orderid}")
    public ResponseEntity<Object> addOrderedProduct(@PathVariable String orderid, @RequestBody OrderedProduct orderedProduct) {
        // Check if the provided orderid corresponds to an existing Order
        Order existingOrder = orderRepository.findById(orderid).orElse(null);

        if (existingOrder == null) {
            // The provided orderid does not match an existing Order, so return an error response
            return new ResponseEntity<>("Invalid orderid. No matching Order found.", HttpStatus.BAD_REQUEST);
        }


        // Set the orderid for the orderedProduct
        orderedProduct.setOrderid(orderid);



        // Proceed to create the OrderedProduct
        OrderedProduct savedOrderedProduct = orderedProductService.createOrderedProduct(orderedProduct);

        existingOrder.getOrderedproducts().add(savedOrderedProduct);

        orderRepository.save(existingOrder);

        return new ResponseEntity<>("Ordered Product added successfully!", HttpStatus.CREATED);
    }
}
