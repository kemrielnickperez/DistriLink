package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.services.PaymentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/paymenttransaction")
public class PaymentTransactionController {

    @Autowired
    PaymentTransactionService paymentTransactionService;

    /*@PostMapping("/createPaymentTransaction/{orderid}")
    public ResponseEntity<Object> createPaymentTransaction(@RequestBody PaymentTransaction paymentTransaction, @PathVariable String orderid){
        paymentTransactionService.createPaymentTransaction(paymentTransaction, orderid);

        return new ResponseEntity<>("Payment Transaction created successfully!", HttpStatus.CREATED);
    }*/

    @PostMapping("/createPaymentTransaction/{orderid}")
    public ResponseEntity<Object> createPaymentTransaction(@RequestBody PaymentTransaction[] paymentTransactions, @PathVariable String orderid){
        paymentTransactionService.createPaymentTransaction(paymentTransactions, orderid);

        return new ResponseEntity<>("Payment Transaction created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllPaymentTransactions")
    public ResponseEntity<Object> getAllPaymentTransactions(){
        return new ResponseEntity<>(paymentTransactionService.getAllPaymentTransactions(), HttpStatus.OK);
    }

    @GetMapping("/getPaymentTransactionByID/{paymenttransactionid}")
    public ResponseEntity<Object> getPaymentTransactionByID(@PathVariable String paymenttransactionid){
        return new ResponseEntity<>(paymentTransactionService.getPaymentTransactionByID(paymenttransactionid), HttpStatus.OK);
    }

    @PutMapping("/updatePaymentTransaction/{paymenttransactionid}")
    public ResponseEntity<Object> updatePaymentTransaction(@PathVariable String paymenttransactionid, @RequestBody PaymentTransaction paymentTransaction){
        return new ResponseEntity<>(paymentTransactionService.updatePaymentTransaction(paymenttransactionid, paymentTransaction), HttpStatus.OK);

    }

    @PutMapping("/updatePaidPaymentTransaction/{paymenttransactionid}")
    public ResponseEntity<Object> updatePaidPaymentTransaction(@PathVariable String paymenttransactionid ){
        return new ResponseEntity<>(paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid), HttpStatus.OK);

    }
}
