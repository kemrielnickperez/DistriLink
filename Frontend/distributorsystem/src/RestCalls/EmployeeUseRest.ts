import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./Interfaces";







export const useRestEmployee = (): [(employee:IEmployee)=>void,(collectorID:number) => void, IEmployee | undefined,  IEmployee | undefined, ] => {

    const [collector, setCollector] = useState<IEmployee>();
    const [employee, setEmployee]=useState<IEmployee>();

    function getCollectorByID(collectorID:number) {
        
         axios.get(`localhost:8080/employee/getCollectorByID/${collectorID}`)
            .then((response) => {
                setCollector(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error creating a new record:', error);
                alert("Error creating a new record. Please try again.");
            }); 
    }

    function newEmployee(employee:IEmployee){
        axios.post('http://localhost:8080/employee/registerEmployee',{
            firstname: employee.firstname,
            middlename:employee.middlename,
            lastname: employee.lastname,
            birthdate:employee.birthdate,
            gender: employee.gender,
            currentaddress:employee.currentaddress,
            permanentadderss: employee.permanentaddress,
            contactnumber:employee.contactnumber,
            is_cashier:employee.iscashier,
            is_salesassociate:employee.issalesassociate,
            is_collector:employee.iscollector,
    })
    .then((response) => {
        console.log(response.data);
        alert("success!");
    })
    .catch((error) => {
        console.error('Error creating a new record:', error);
        alert("Error creating a new record. Please try again.");
    });
}
    
    




    return [newEmployee, getCollectorByID, employee, collector ]
}
