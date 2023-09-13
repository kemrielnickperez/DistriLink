import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./Interfaces";
import { multiSectionDigitalClockClasses } from "@mui/x-date-pickers";







<<<<<<< Updated upstream
export const useRestEmployee = (): [(employees: IEmployee) => void,(collectorID: number) => void, IEmployee | undefined] => {
=======
export const useRestEmployee = (): [(employees: IEmployee)=> void, (collectorID:number) => void, IEmployee | undefined] => {
>>>>>>> Stashed changes

    const [collector, setCollector] = useState<IEmployee>();
    const [employees, setEmployees] = useState<IEmployee>();

    function newEmployee(employees: IEmployee) {
    
        axios.post('http://localhost:8080/employee/registerEmployee', {
            firstname : employees.firstname,
            middlename : employees.middlename,
            lastname : employees.lastname,
            birthdate : employees.birthdate,
            gender : employees.gender,
            currentaddress : employees.currentaddress,
            permanentaddress : employees.permanentaddress,
            contactnumber : employees.contactnumber,
            is_cashier : employees.is_cashier,
            is_salesassociate : employees.is_salesassociate,
            is_collector : employees.is_collector,
            orders : null,/* {
                distributordate :employees.order.distributiondate,
                penaltyrate: employees.order.penaltyrate,
            paymentterms: employees.order.paymentterms,
            orderdate: employees.order.orderdate,
            orderedProducts: employees.order.orderedProducts,
            dealer: {
                dealerid:employees.order.dealer.dealerid,
                firstname: employees.order.dealer.firstname,
                middlename:employees. order.dealer.middlename,
                lastname: employees.order.dealer.lastname,
                birthdate: employees.order.dealer.birthdate,
                gender: employees.order.dealer.gender,
                currentaddress: employees.order.dealer.currentaddress,
                permanentaddress: employees.order.dealer.permanentaddress,
                contactnumber: employees.order.dealer.contactnumber,
                hasbusiness: employees.order.dealer.hasbusiness,
                businessname: employees.order.dealer.businessname,
                businessphone: employees.order.dealer. businessphone,
                businessaddress: employees.order.dealer.businessaddress,
                businesstin: employees.order.dealer.businesstin,
                creditlimit: employees.order.dealer.creditlimit,
                submissiondate: employees.order.dealer.submissiondate,
                attachments: employees.order.dealer.attachments,
            }
            collector: null, 
            paymentTransactions: null,
            } */
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

<<<<<<< Updated upstream
   


    return [newEmployee, getCollectorByID, collector ]
=======
    function newEmployee(employees: IEmployee) {

        axios.post('http://localhost:8080/employee/registerEmployee', {
            firstname : employees.firstname,
            middlename : employees.middlename,
            lastname : employees.lastname,
            currentaddress : employees.currentaddress,
            permanentaddress : employees.permanentaddress,
            contactnumber : employees.contactnumber,
            is_cashier : employees.is_cashier,
            is_salesassociate : employees.is_salesassociate,
            is_collector : employees.is_collector,
            orders : null,
            collectionPaymentReceipts: null
        })
            .then((response) => {
                console.log(response.data);
            }); 
    }




    return [newEmployee, getCollectorByID, collector]
>>>>>>> Stashed changes
}
