package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.services.DealerEmailService;
import com.group5.distributorsystem.services.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/dealer")
public class DealerController {

    @Autowired
    DealerService dealerService;

    @Autowired
    DealerEmailService dealerEmailService;

    @PostMapping("/registerDealer")
    public ResponseEntity<Object> registerDealer(
            @ModelAttribute Dealer dealer,
            @RequestParam("documentid") List<String> documentIds,
            @RequestParam("name") List<String> documentNames,
            @RequestParam("type") List<String> documentTypes,
            @RequestParam("content") List<MultipartFile> documentContents
    )  {

        dealerService.registerDealer(dealer, documentIds, documentNames, documentTypes, documentContents);
        return new ResponseEntity<>("Dealer registered successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllDealers")
    public ResponseEntity<Object> getAllDealers(){
        return new ResponseEntity<>(dealerService.getAllDealers(), HttpStatus.OK);
    }

    @GetMapping("/getDealerByID/{dealerid}")
    public ResponseEntity<Object> getDealerByID(@PathVariable String dealerid){
        return new ResponseEntity<>(dealerService.getDealerByID(dealerid), HttpStatus.OK);
    }


    @PutMapping("/updateCreditLimit/{dealerId}")
    public ResponseEntity<Object> updateCreditLimit(@PathVariable String dealerId, @RequestParam double creditlimit) {
        dealerService.updateDealerCreditLimit(dealerId, creditlimit);
        return ResponseEntity.ok("Dealer credit limit updated successfully!");
    }

    @PutMapping("/confirmDealer/{dealerId}")
    public ResponseEntity<String> confirmDealer(@PathVariable String dealerId,  @RequestParam Double creditlimit ) {
        // Call the updateDealerConfirmation function to update the "confirmed" property on the server
        dealerService.updateDealerConfirmation(dealerId, creditlimit);


        return ResponseEntity.ok("Email sent successfully!");
    }

    @PutMapping("/updateDealerPending/{dealerId}")
    public ResponseEntity<String> pendingDealer(@PathVariable String dealerId, @RequestParam String remarks) {
            // Call the updateDealerPending function to update the "pending" property on the server
            dealerService.updateDealerPending(dealerId, remarks);


            return ResponseEntity.ok("Email sent successfully!");
        }

    @PutMapping("/updateDealerDecline/{dealerId}")
    public ResponseEntity<String> declineDealer(@PathVariable String dealerId, @RequestParam String remarks, @RequestParam LocalDate datearchived){
        dealerService.updateArchivedDealer(dealerId, remarks, datearchived);

        return ResponseEntity.ok("Email sent successfully!");
    }

    @GetMapping("/getAllUnconfirmedDealers")
    public ResponseEntity<Object> getAllUnconfirmedDealers(){
        return new ResponseEntity<>(dealerService.getAllUnconfirmedDealers(), HttpStatus.OK);
    }

}
