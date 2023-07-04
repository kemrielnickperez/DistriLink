package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.services.PaymentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/paymenttransaction")
public class PaymentTransactionController {

    @Autowired
    PaymentTransactionService paymentTransactionService;

    @PostMapping("/createPaymentTransaction")
    public ResponseEntity<Object> createPaymentTransaction(@RequestBody PaymentTransaction paymentTransaction){
        paymentTransactionService.createPaymentTransaction(paymentTransaction);

        return new ResponseEntity<>("Payment Transaction created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllPaymentTransactions")
    public ResponseEntity<Object> getAllPaymentTransactions(){
        return new ResponseEntity<>(paymentTransactionService.getAllPaymentTransactions(), HttpStatus.OK);
    }
}
