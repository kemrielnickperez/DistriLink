package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    public Employee registerEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public Iterable<Employee> getAllEmployees(){
        return  employeeRepository.findAll();
    }

    public List<Employee> getAllCollectors(){
        Iterable<Employee> allEmployees = employeeRepository.findAll();
        List<Employee> collectors = new ArrayList<>();

        for(Employee e : allEmployees){
            if(e.isIs_collector()){
                collectors.add(e);
            }
        }

        return collectors;
    }

    public Optional<Employee> getEmployeeByID(int employeeid){
        return employeeRepository.findById(employeeid);
    }


    public Employee getCollectorByID(int employeeid){

        Iterable<Employee> allCollectors = getAllCollectors();

        Employee collector = new Employee();

        for(Employee e : allCollectors){
            if(e.getEmployeeID() == employeeid){
                collector = e;
            }
        }
        return collector;
    }




}
