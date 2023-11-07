package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Distributor;
import com.group5.distributorsystem.services.DistributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;



@RestController
@CrossOrigin
@RequestMapping("/distributor")
public class DistributorController {

    @Autowired
    DistributorService distributorService;


    @PostMapping("/registerDistributor")
    public ResponseEntity<Object> registerDistributor(@RequestBody Distributor distributor)  {
        distributorService.registerDistributor(distributor);

        return new ResponseEntity<>("Distributor registered successfully!", HttpStatus.CREATED);
    }


    @GetMapping("/getAllDistributors")
    public ResponseEntity<Object> getAllDistributors(){
        return  new ResponseEntity<>(distributorService.getAllDistributors(), HttpStatus.OK);
    }
}
