package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.services.DealerEmailService;
import com.group5.distributorsystem.services.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/getCreditLimit/{dealerId}")
    public ResponseEntity<Object> getCreditLimit(@PathVariable String dealerId) {
        double creditLimit = dealerService.getDealerCreditLimit(dealerId);
        return new ResponseEntity<>(creditLimit, HttpStatus.OK);
    }

    @PutMapping("/updateCreditLimit")
    public ResponseEntity<Object> updateCreditLimit(@RequestParam String dealerId, @RequestParam double newCreditLimit) {
        dealerService.updateDealerCreditLimit(dealerId, newCreditLimit);
        return new ResponseEntity<>("Dealer credit limit updated successfully!", HttpStatus.OK);
    }

    @PutMapping("/setDealer/{dealerId}")
    public ResponseEntity<String> updateDealerDetails(@PathVariable String dealerId, @RequestBody Dealer updatedDealer) {
        try {
            dealerService.updateDealerDetails(dealerId, updatedDealer);
            return ResponseEntity.ok("Dealer set");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to set dealer" + e.getMessage());
        }
    }

    @PutMapping("/confirmDealer/{dealerId}")
    public ResponseEntity<String> confirmDealer(@PathVariable String dealerId,  @RequestBody Dealer updatedDealer ) {
        // Call the updateDealerConfirmation function to update the "confirmed" property on the server
        dealerService.updateDealerConfirmation(dealerId, updatedDealer);


        return ResponseEntity.ok("Email sent successfully!");
    }

    @PutMapping("/updateDealerPending/{dealerId}")
    public ResponseEntity<String> pendingDealer(@PathVariable String dealerId, @RequestBody Dealer updatedDealer) {
            // Call the updateDealerPending function to update the "pending" property on the server
            dealerService.updateDealerPending(dealerId, updatedDealer);


            return ResponseEntity.ok("Email sent successfully!");
        }

}
