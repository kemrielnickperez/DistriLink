package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.services.DealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/dealer")
public class DealerController {

    @Autowired
    DealerService dealerService;

    @PostMapping("/registerDealer")
    public ResponseEntity<Object> registerDealer(@RequestBody Dealer dealer){
        dealerService.registerDealer(dealer);

        return new ResponseEntity<>("Dealer registered successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/getAllDealers")
    public ResponseEntity<Object> getAllDealers(){
        return new ResponseEntity<>(dealerService.getAllDealers(), HttpStatus.OK);
    }

    @GetMapping("/getDealerByID")
    public ResponseEntity<Object> getDealerByID(@RequestParam int dealerid){
        return new ResponseEntity<>(dealerService.getDealerByID(dealerid), HttpStatus.OK);
    }

}
