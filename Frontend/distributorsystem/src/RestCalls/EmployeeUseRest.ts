import axios, { } from "axios";
import {  useState } from "react";
import { IEmployee, IEmployeeDocument } from "./Interfaces";







export const useRestEmployee = (): [(employee: IEmployee, employeeDocuments: IEmployeeDocument[]) => void, (employeid: string) => void , (collectorID: string) => void, IEmployee | undefined] =>  {

    const [collector, setCollector] = useState<IEmployee>();
    const [employee, setEmployee] = useState<IEmployee>();

    function newEmployee(employee: IEmployee, employeeDocuments: IEmployeeDocument[]) {


    
        const formData = new FormData();

        // Add dealer object properties to formData
        formData.append('employeeid', employee.employeeid.toString());
        formData.append('firstname', employee.firstname.toString());
        formData.append('middlename', employee.middlename.toString());
        formData.append('lastname', employee.lastname.toString());
        formData.append('emailaddress', employee.emailaddress.toString());
        formData.append('password', employee.password.toString());
        formData.append('birthdate', employee.birthdate.toString());
        formData.append('gender', employee.gender.toString());
        formData.append('currentaddress', employee.currentaddress);
        formData.append('permanentaddress', employee.permanentaddress);
        formData.append('contactnumber', employee.contactnumber);
        formData.append('submissiondate', employee.submissiondate);
        formData.append('is_cashier', employee.is_cashier.toString());
        formData.append('is_salesassociate', employee.is_salesassociate.toString());
        formData.append('is_collector', employee.is_collector.toString());
        formData.append('distributor.distributorid', employee.distributor.distributorid);
        formData.append('distributor.firstname', employee.distributor.firstname.toString());
        formData.append('distributor.middlename', employee.distributor.middlename.toString());
        formData.append('distributor.lastname', employee.distributor.lastname.toString());
        formData.append('distributor.emailaddress', employee.distributor.emailaddress.toString());
        formData.append('distributor.password', employee.distributor.password.toString());
        formData.append('distributor.birthdate', employee.distributor.birthdate.toString());
        formData.append('distributor.gender', employee.distributor.gender.toString());
        formData.append('distributor.currentaddress', employee.distributor.currentaddress);
        formData.append('distributor.permanentaddress', employee.distributor.permanentaddress);
        formData.append('distributor.contactnumber', employee.distributor.contactnumber);

        employee.distributor.dealerids.forEach((dealerid) => {
            formData.append(`distributor.dealer`, dealerid);
        });

        employee.distributor.employeeids.forEach((employeeid) => {
            formData.append(`distributor.employees`, employeeid);
        });

        employee.distributor.dealerids.forEach((orderid) => {
            formData.append(`distributor.orderids`, orderid);
        });


           employeeDocuments.forEach((document, index) => {
           
            formData.append(`documentid`, document.documentid);
            formData.append(`name`, document.name);
            formData.append(`type`, document.type);
            formData.append(`content`, new Blob([document.content], { type: 'application/octet-stream' }));
          }); 

         

       /*  axios.post('http://localhost:8080/employee/registerEmployee', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
            
                alert("success!");
            })
            .catch((error) => {
                
                alert("Error creating a new record. Please try again.");
            }); */
    }

    

    function getCollectorByID(collectorID:string) {
        
         axios.get(`http://localhost:8080/employee/getCollectorByID/${collectorID}`)
            .then((response) => {
                setCollector(response.data)
                
            })
            .catch((error) => {
                console.error('Error finding collector', error);
                alert("Error finding collector. Please try again.");
            }); 
    }

    function getEmployeeByID(employeeid:string) {
        
        axios.get(`http://localhost:8080/employee/getEmployeeByID/${employeeid}`)
           .then((response) => {
               setEmployee(response.data)
              
           })
           .catch((error) => {
               console.error('Error finding employee', error);
               alert("Error finding employee. Please try again.");
           }); 
   }
   


    return [newEmployee, getEmployeeByID, getCollectorByID, employee  ]
}
