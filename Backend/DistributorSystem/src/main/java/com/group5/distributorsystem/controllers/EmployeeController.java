package com.group5.distributorsystem.controllers;

import com.group5.distributorsystem.models.Dealer;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.services.DealerService;
import com.group5.distributorsystem.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

        @PostMapping("/registerEmployee")
        public ResponseEntity<Object> registerEmployee(@RequestBody Employee employee){
            employeeService.registerEmployee(employee);

            return new ResponseEntity<>("Employee registered successfully!", HttpStatus.CREATED);
        }

        @GetMapping("/getAllEmployees")
        public ResponseEntity<Object> getAllEmployees(){
            return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
        }

    @GetMapping("/getAllCollectors")
    public ResponseEntity<Object> getAllCollectors(){
        return new ResponseEntity<>(employeeService.getAllCollectors(), HttpStatus.OK);
    }

        @GetMapping("/getEmployeeByID")
        public ResponseEntity<Object> getEmployeeByID(@RequestParam int employeeid){
            return new ResponseEntity<>(employeeService.getEmployeeByID(employeeid), HttpStatus.OK);
        }

    @GetMapping("/getCollectorByID")
    public ResponseEntity<Object> getCollectorByID(@RequestParam int employeeid){
        return new ResponseEntity<>(employeeService.getCollectorByID(employeeid), HttpStatus.OK);
    }

    }
