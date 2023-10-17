package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.DealerDocument;
import com.group5.distributorsystem.models.DealerPaymentProof;
import com.group5.distributorsystem.services.DealerPaymentProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/dealerpaymentproof")
public class DealerPaymentProofController {

    @Autowired
    DealerPaymentProofService dealerPaymentProofService;

    @GetMapping("/findAllDealerProofByCollectionPaymentReceiptId/{paymentreceiptid}")
    public ResponseEntity<Object> findAllDealerProofByCollectionPaymentReceiptId(@PathVariable String paymentreceiptid){
        return new ResponseEntity<>(dealerPaymentProofService.findAllDealerProofByCollectionPaymentReceiptId(paymentreceiptid), HttpStatus.OK);
    }

}
