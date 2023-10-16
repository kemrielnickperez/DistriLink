package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.repositories.CollectionPaymentReceiptRepository;
import com.group5.distributorsystem.services.CollectionPaymentReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/collectionPaymentReceipt")
public class CollectorPaymentReceiptController {

    @Autowired
    CollectionPaymentReceiptRepository collectionPaymentReceiptRepository;

    @Autowired
    CollectionPaymentReceiptService collectionPaymentReceiptService;

    @GetMapping("/unconfirmed")
    public ResponseEntity<Object> getUnconfirmedReceipts(){
        return new ResponseEntity<>(collectionPaymentReceiptService.findByIsConfirmedFalse(), HttpStatus.OK);
    }
}
