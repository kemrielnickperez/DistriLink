import axios, { } from "axios";
import {  useState } from "react";
import { IEmployee } from "./Interfaces";







export const useRestEmployee = (): [(employee: IEmployee) => void, (employeid: number) => void , (collectorID: number) => void, IEmployee | undefined] =>  {

    const [collector, setCollector] = useState<IEmployee>();
    const [employee, setEmployee] = useState<IEmployee>();

    function newEmployee(employee: IEmployee) {
    
        axios.post('http://localhost:8080/employee/registerEmployee', {
            employeeid: employee.employeeid,
            firstname : employee.firstname,
            middlename : employee.middlename,
            lastname : employee.lastname,
            emailaddress :employee.emailaddress,
            password: employee.password,
            birthdate : employee.birthdate,
            gender : employee.gender,
            currentaddress : employee.currentaddress,
            permanentaddress : employee.permanentaddress,
            contactnumber : employee.contactnumber,
            tinnumber: employee.tinnumber,
            is_cashier : employee.is_cashier,
            is_salesassociate : employee.is_salesassociate,
            is_collector : employee.is_collector,
            orderids : [],
        })
            .then((response) => {
            
                alert("success!");
            })
            .catch((error) => {
                
                alert("Error creating a new record. Please try again.");
            });
    }

    function getCollectorByID(collectorID:number) {
        
         axios.get(`http://localhost:8080/employee/getCollectorByID?employeeid=${collectorID}`)
            .then((response) => {
                setCollector(response.data)
                
            })
            .catch((error) => {
                console.error('Error finding collector', error);
                alert("ErrorError finding collector. Please try again.");
            }); 
    }

    function getEmployeeByID(employeeid:number) {
        
        axios.get(`http://localhost:8080/employee/getEmployeeByID?employeeid=${employeeid}`)
           .then((response) => {
               setEmployee(response.data)
              
           })
           .catch((error) => {
               console.error('Error finding employee', error);
               alert("ErrorError finding employee. Please try again.");
           }); 
   }
   


    return [newEmployee, getEmployeeByID, getCollectorByID, employee  ]
}
