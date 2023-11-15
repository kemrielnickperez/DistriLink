package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.services.DealerDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/dealerdocument")
public class DealerDocumentController {

    @Autowired
    DealerDocumentService dealerDocumentService;

    @PostMapping("/createAttachment")
    public ResponseEntity<Object> createAttachment(
            @RequestParam("documentid") String documentid,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("content") MultipartFile content,
            @RequestParam("dealerid") String dealerid
    ) {
        dealerDocumentService.createDealerDocument(documentid, name, type, content, dealerid);
        return new ResponseEntity<>("Dealer document created successfully!", HttpStatus.CREATED);
    }

    @GetMapping("/findAllDocumentsByDealerId/{dealerid}")
    public ResponseEntity<Object> findAllDocumentsByDealerId(@PathVariable String dealerid){
        return new ResponseEntity<>(dealerDocumentService.findAllDocumentsByDealerId(dealerid), HttpStatus.OK);
    }
}
