package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.repositories.ArchivedDealerRepository;
import com.group5.distributorsystem.services.ArchivedDealerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/archived")
public class ArchivedDealerController {

    @Autowired
    ArchivedDealerService archivedDealerService;


    @GetMapping("/getAllArchivedDealers")
    public ResponseEntity<Object> getAllArchivedDealer(){
        return new ResponseEntity<>(archivedDealerService.getAllArchivedDealer(), HttpStatus.OK);
    }

    @GetMapping("/getAllArchivedDealersByDistributorID/{distributorid}")
    public ResponseEntity<Object> getAllArchivedDealersByDistributorID(@PathVariable String distributorid) {
        return new ResponseEntity<>(archivedDealerService.getAllArchivedDealersByDistributorID(distributorid), HttpStatus.OK);
    }

}
