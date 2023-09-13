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

    @GetMapping("/getPaymentTransactionByID/{paymenttransactionid}")
    public ResponseEntity<Object> getPaymentTransactionByID(@PathVariable int paymenttransactionid){
        return new ResponseEntity<>(paymentTransactionService.getPaymentTransactionByID(paymenttransactionid), HttpStatus.OK);
    }

    @PutMapping("/updatePaymentTransaction/{paymenttransactionid}")
    public ResponseEntity<Object> updatePaymentTransaction(@PathVariable int paymenttransactionid, @RequestBody PaymentTransaction paymentTransaction){
        return new ResponseEntity<>(paymentTransactionService.updatePaymentTransaction(paymenttransactionid, paymentTransaction), HttpStatus.OK);

    }

    @PutMapping("/updatePaidPaymentTransaction/{paymenttransactionid}")
    public ResponseEntity<Object> updatePaidPaymentTransaction(@PathVariable int paymenttransactionid ){
        return new ResponseEntity<>(paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid), HttpStatus.OK);

    }
}
