package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.services.DistributorDocumentService;
import com.group5.distributorsystem.services.EmployeeDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/distributorDocument")
public class DistributorDocumentController {

    @Autowired
    DistributorDocumentService distributorDocumentService;



    @GetMapping("/findAllDocumentsByDistributorId/{distributorid}")
    public ResponseEntity<Object> findAllDocumentsByEmployeeId(@PathVariable String distributorid){
        return new ResponseEntity<>(distributorDocumentService.findAllDocumentsByDistributorId(distributorid), HttpStatus.OK);
    }
}
