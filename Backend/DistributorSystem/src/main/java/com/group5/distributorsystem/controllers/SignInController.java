package com.group5.distributorsystem.controllers;


import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.repositories.DealerRepository;
import com.group5.distributorsystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/signin")
public class SignInController {

    @Autowired
    DealerRepository dealerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping("/login/{userid}/{password}")
    public ResponseEntity<Object> login(@PathVariable String userid, @PathVariable String password){

        Dealer dealer = dealerRepository.findByDealeridAndPassword(userid, password);
        Employee employee = employeeRepository.findByEmployeeidAndPassword(userid, password);

        if (dealer != null){
            return ResponseEntity.ok(dealer);
        } else if (employee != null) {
            return ResponseEntity.ok(employee);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
    }

}
