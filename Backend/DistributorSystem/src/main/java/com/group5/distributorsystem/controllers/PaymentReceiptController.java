package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.services.CollectionPaymentReceiptService;
import com.group5.distributorsystem.services.DirectPaymentReceiptService;
import com.group5.distributorsystem.services.PaymentReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/paymentreceipt")
public class PaymentReceiptController {

    @Autowired
    PaymentReceiptService paymentReceiptService;

    @Autowired
    DirectPaymentReceiptService directPaymentReceiptService;

    @Autowired
    CollectionPaymentReceiptService collectionPaymentReceiptService;

    @GetMapping("/getAllPaymentReceipts")
    public ResponseEntity<Object> getAllPaymentReceipts(){
        return new ResponseEntity<>(paymentReceiptService.getAllPaymentReceipts(), HttpStatus.OK);
    }

    //di rako need ani kay sa list of receipts kay nagsagol raman tanan
 /*   @GetMapping("/getPaymentReceiptsByDiscriminatorValue")
    public ResponseEntity<Object> getPaymentReceiptsByDiscriminatorValue(@RequestParam String discriminatorvalue){
        return new ResponseEntity<>(paymentReceiptService.getPaymentReceiptsByDiscriminatorValue(discriminatorvalue), HttpStatus.OK);
    }*/



    @PostMapping("/createDirectPaymentReceipt")
    public ResponseEntity<Object> createDirectPaymentReceipt(@RequestBody DirectPaymentReceipt directPaymentReceipt, @RequestParam String paymenttransactionid){
        directPaymentReceiptService.createDirectPaymentReceipt(directPaymentReceipt, paymenttransactionid);
        return new ResponseEntity<>("Direct Payment Receipt created successfully!", HttpStatus.CREATED);

    }

    @GetMapping("/getAllDirectPaymentReceipts")
    public ResponseEntity<Object> getAllDirectPaymentReceipts(){
        return new ResponseEntity<>(directPaymentReceiptService.getAllDirectPaymentReceipts(), HttpStatus.OK);
    }

    @PostMapping("/createCollectionPaymentReceipt")
    public ResponseEntity<Object> createCollectionPaymentReceipt(@RequestBody CollectionPaymentReceipt collectionPaymentReceipt, @RequestParam String paymenttransactionid){
        collectionPaymentReceiptService.createCollectionPaymentReceipt(collectionPaymentReceipt, paymenttransactionid);
        return new ResponseEntity<>("Collection Payment Receipt created successfully!", HttpStatus.CREATED);

    }

}
