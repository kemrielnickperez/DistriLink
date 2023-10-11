package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Dealer;
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

    @GetMapping("/getDealerByID")
    public ResponseEntity<Object> getDealerByID(@RequestParam String dealerid){
        return new ResponseEntity<>(dealerService.getDealerByID(dealerid), HttpStatus.OK);
    }

}
