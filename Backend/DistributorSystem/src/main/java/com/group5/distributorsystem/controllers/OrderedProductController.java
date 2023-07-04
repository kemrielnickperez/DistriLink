package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.OrderedProduct;
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

    @PostMapping("/createOrderedProduct")
    public ResponseEntity<Object> createOrderedProduct(@RequestBody OrderedProduct orderedProduct){
        orderedProductService.createOrderedProduct(orderedProduct);

        return new ResponseEntity<>("Ordered Product created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllOrderedProducts")
    public ResponseEntity<Object> getAllOrderedProducts(){
        return new ResponseEntity<>(orderedProductService.getAllOrderedProducts(), HttpStatus.OK);
    }
}
