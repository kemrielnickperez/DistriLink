package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.repositories.CollectionPaymentReceiptRepository;
import com.group5.distributorsystem.services.CollectionPaymentReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/collectionPaymentReceipt")
public class CollectionPaymentReceiptController {

    @Autowired
    CollectionPaymentReceiptRepository collectionPaymentReceiptRepository;

    @Autowired
    CollectionPaymentReceiptService collectionPaymentReceiptService;

    @GetMapping("/getAllCollectionPaymentReceipts")
    public ResponseEntity<Object> getAllCollectionPaymentReceipts(){
        return new ResponseEntity<>(collectionPaymentReceiptService.getAllCollectionPaymentReceipts(), HttpStatus.OK);
    }

    @GetMapping("/getAllUnconfirmedCollectionPaymentReceipts")
    public ResponseEntity<Object> getAllUnconfirmedCollectionPaymentReceipts(){
        return new ResponseEntity<>(collectionPaymentReceiptService.getAllUnconfirmedCollectionPaymentReceipts(), HttpStatus.OK);
    }
}
