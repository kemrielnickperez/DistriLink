package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.repositories.PaymentReceiptRepository;
import com.group5.distributorsystem.services.CollectionPaymentReceiptService;
import com.group5.distributorsystem.services.DirectPaymentReceiptService;
import com.group5.distributorsystem.services.PaymentReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/paymentreceipt")
public class PaymentReceiptController {

    @Autowired
    PaymentReceiptRepository paymentReceiptRepository;

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

    @GetMapping("/getPaymentReceiptByID/{paymentreceiptid}")
    public ResponseEntity<Object> getPaymentReceiptByID(@PathVariable String paymentreceiptid){
        return new ResponseEntity<>(paymentReceiptService.getPaymentReceiptByID(paymentreceiptid), HttpStatus.OK);
    }

    @GetMapping("/getAllPaymentReceiptsByDistributorID/{distributorid}")
    public ResponseEntity<Object> getAllPaymentReceiptsByDistributorID(@PathVariable String distributorid){
        return new ResponseEntity<>(paymentReceiptService.getAllPaymentReceiptsByDistributorID(distributorid), HttpStatus.OK);
    }





    @PostMapping("directpaymentreceipt/createDirectPaymentReceipt/{receiverid}")
    public ResponseEntity<Object> createDirectPaymentReceipt(@RequestBody DirectPaymentReceipt directPaymentReceipt, @PathVariable String receiverid){
        directPaymentReceiptService.createDirectPaymentReceipt(directPaymentReceipt, receiverid);
        return new ResponseEntity<>("Direct Payment Receipt created successfully!", HttpStatus.CREATED);

    }


    @GetMapping("directpaymentreceipt/getAllDirectPaymentReceipts")
    public ResponseEntity<Object> getAllDirectPaymentReceipts(){
        return new ResponseEntity<>(directPaymentReceiptService.getAllDirectPaymentReceipts(), HttpStatus.OK);
    }

    @PostMapping("collectionpaymentreceipt/createCollectionPaymentReceipt")
    public ResponseEntity<Object> createCollectionPaymentReceipt(
            @ModelAttribute CollectionPaymentReceipt collectionPaymentReceipt,
            @RequestParam("collectorproofid") List<String> collectorproofid, @RequestParam("dealerproofid") List<String> dealerproofid,
            @RequestParam("collectordocumentNames") List<String> collectordocumentNames, @RequestParam("dealerdocumentNames") List<String> dealerdocumentNames,
            @RequestParam("collectordocumentTypes") List<String> collectordocumentTypes, @RequestParam("dealerdocumentTypes") List<String> dealerdocumentTypes,
            @RequestParam("collectordocumentContents") List<MultipartFile> collectordocumentContents, @RequestParam("dealerdocumentContents") List<MultipartFile> dealerdocumentContents
    )
    {
        collectionPaymentReceiptService.createCollectionPaymentReceipt(collectionPaymentReceipt, collectorproofid, dealerproofid, collectordocumentNames, dealerdocumentNames, collectordocumentTypes, dealerdocumentTypes, collectordocumentContents, dealerdocumentContents);

        return new ResponseEntity<>("Collection Payment Receipt created successfully!", HttpStatus.CREATED);

    }

    @PutMapping("collectionpaymentreceipt/updateCollectionPaymentReceipt/{collectionpaymentreciptid}/{receiverid}")
    public ResponseEntity<Object> confirmCollectionPaymentReceipt(@PathVariable String collectionpaymentreciptid, @PathVariable String receiverid){
        return new ResponseEntity<>(collectionPaymentReceiptService.confirmCollectionPaymentReceipt(collectionpaymentreciptid, receiverid), HttpStatus.OK);
    }



    @GetMapping("collectionpaymentreceipt/getAllCollectionPaymentReceipts")
    public ResponseEntity<Object> getAllCollectionPaymentReceipts(){
        return new ResponseEntity<>(collectionPaymentReceiptService.getAllCollectionPaymentReceipts(), HttpStatus.OK);
    }

    @GetMapping("collectionpaymentreceipt/getAllUnconfirmedCollectionPaymentReceipts")
    public ResponseEntity<Object> getAllUnconfirmedCollectionPaymentReceipts(){
        return new ResponseEntity<>(collectionPaymentReceiptService.getAllUnconfirmedCollectionPaymentReceipts(), HttpStatus.OK);
    }

    @GetMapping("collectionpaymentreceipt/getAllUnconfirmedCollectionPaymentReceiptsByDistributorID/{distributorid}")
    public ResponseEntity<Object> getAllUnconfirmedCollectionPaymentReceiptsByDistributorID(@PathVariable String distributorid){
        return new ResponseEntity<>(collectionPaymentReceiptService.getAllUnconfirmedCollectionPaymentReceiptsByDistributorID(distributorid), HttpStatus.OK);
    }

}
