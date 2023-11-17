package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.DistributorRepository;
import com.group5.distributorsystem.repositories.EmployeeDocumentRepository;
import com.group5.distributorsystem.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    EmployeeDocumentRepository employeeDocumentRepository;

    @Autowired
    DistributorRepository distributorRepository;

    public Employee registerEmployee(Employee employee, List<String> documentIds, List<String> documentNames, List<String> documentTypes, List<MultipartFile> documentContents
    ){

        Employee updatedEmployee = employeeRepository.save(employee);
        Distributor distributor = distributorRepository.findById(updatedEmployee.getDistributor().getDistributorid()).get();

        for (int i = 0; i < documentIds.size(); i++) {
            EmployeeDocument document = new EmployeeDocument();
            document.setDocumentid(documentIds.get(i));
            document.setName(documentNames.get(i));
            document.setType(documentTypes.get(i));
            document.setEmployee(updatedEmployee);
            try {
                document.setContent(documentContents.get(i).getBytes());
            } catch (IOException e) {
                // Handle the exception (e.g., log an error).
                System.err.println("Error reading file bytes for attachment: " + document.getName());
                e.printStackTrace();
                continue;
            }
            updatedEmployee.getDocumentids().add(document.getDocumentid());
            employeeDocumentRepository.save(document);
        }

        updatedEmployee.setDistributor(distributor);
        distributor.getEmployeeids().add(updatedEmployee.getEmployeeid());
        distributorRepository.save(distributor);

        return employeeRepository.save(updatedEmployee);
    }

    public List<Employee> getAllEmployees(){
        return  employeeRepository.findAll();
    }

    public List<Employee> getAllCollectors(){
        List<Employee> allEmployees = employeeRepository.findAll();
        List<Employee> collectors = new ArrayList<>();

        for(Employee e : allEmployees){
            if(e.isIscollector()){
                collectors.add(e);
            }
        }

        return collectors;
    }

    public List<Employee> getAllCollectorsByDistributorID(String distributorid){
        return employeeRepository.findByDistributor_DistributoridAndIscollectorTrue(distributorid);
    }

    public Optional<Employee> getEmployeeByID(String employeeid){

        return employeeRepository.findById(employeeid);
    }


    public Employee getCollectorByID(String employeeid){

        List<Employee> allCollectors = getAllCollectors();

        Employee collector = new Employee();

        for(Employee e : allCollectors){
            if(e.getEmployeeid().equals(employeeid)){
                collector = e;
            }
        }
        return collector;
    }

    public List<Employee> getAllEmployeesByDistributorID(String distributorid) {
        return employeeRepository.findAllByDistributor_Distributorid(distributorid);
    }


    public Employee findByEmployeeidAndPassword(String employeeid, String password){
        return employeeRepository.findByEmployeeidAndPassword(employeeid, password);
    }


}
