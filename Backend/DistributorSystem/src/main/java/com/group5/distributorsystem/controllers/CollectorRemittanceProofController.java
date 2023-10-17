package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.CollectorRemittanceProof;
import com.group5.distributorsystem.services.CollectorRemittanceProofService;
import com.group5.distributorsystem.services.DealerPaymentProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/collectorremittanceproof")
public class CollectorRemittanceProofController {


    @Autowired
    CollectorRemittanceProofService collectorRemittanceProofService;

    @GetMapping("/findAllCollectorProofByCollectionPaymentReceiptId/{paymentreceiptid}")
    public ResponseEntity<Object> findAllCollectorProofByCollectionPaymentReceiptId(@PathVariable String paymentreceiptid){
        return new ResponseEntity<>(collectorRemittanceProofService.findAllCollectorProofByCollectionPaymentReceiptId(paymentreceiptid), HttpStatus.OK);
    }

}
