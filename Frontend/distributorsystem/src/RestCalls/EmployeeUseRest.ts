import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./Interfaces";
import { multiSectionDigitalClockClasses } from "@mui/x-date-pickers";







export const useRestEmployee = (): [(employee: IEmployee) => void,(collectorID: number) => void, IEmployee | undefined] => {

    const [collector, setCollector] = useState<IEmployee>();
    //const [employee, setEmployee] = useState<IEmployee>();

    function newEmployee(employee: IEmployee) {
    
        axios.post('http://localhost:8080/employee/registerEmployee', {
            employeeid: employee.employeeid,
            firstname : employee.firstname,
            middlename : employee.middlename,
            lastname : employee.lastname,
            birthdate : employee.birthdate,
            gender : employee.gender,
            currentaddress : employee.currentaddress,
            permanentaddress : employee.permanentaddress,
            contactnumber : employee.contactnumber,
            is_cashier : employee.is_cashier,
            is_salesassociate : employee.is_salesassociate,
            is_collector : employee.is_collector,
            orderids : [],
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

    function getCollectorByID(collectorID:number) {
        
         axios.get(`http://localhost:8080/employee/getCollectorByID?employeeid=${collectorID}`)
            .then((response) => {
                setCollector(response.data)
                //console.log(response.data)
            })
            .catch((error) => {
                console.error('Error finding collector', error);
                alert("ErrorError finding collector. Please try again.");
            }); 
    }

   


    return [newEmployee, getCollectorByID, collector ]
}
