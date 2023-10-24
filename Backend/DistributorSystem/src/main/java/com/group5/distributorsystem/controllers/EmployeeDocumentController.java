package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.services.DealerDocumentService;
import com.group5.distributorsystem.services.EmployeeDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/employeeDocument")
public class EmployeeDocumentController {

    @Autowired
    EmployeeDocumentService employeeDocumentService;

    /*@PostMapping("/createAttachment")
    public ResponseEntity<Object> createAttachment(
            @RequestParam("documentid") String documentid,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("content") MultipartFile content,
            @RequestParam("dealerid") String dealerid
    ) {
        employeeDocumentService(documentid, name, type, content, dealerid);
        return new ResponseEntity<>("Dealer document created successfully!", HttpStatus.CREATED);
    }*/

    @GetMapping("/findAllDocumentsByEmployeeId/{employeeid}")
    public ResponseEntity<Object> findAllDocumentsByEmployeeId(@PathVariable String employeeid){
        return new ResponseEntity<>(employeeDocumentService.findAllDocumentsByEmployeeId(employeeid), HttpStatus.OK);
    }
}
