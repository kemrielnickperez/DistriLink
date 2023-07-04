import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";



export interface IEmployee {
    employeeid:number,
    firstname: string,
    middlename: string,
    lastname: string,
    birthdate: string,
    gender: string,
    currentaddress: string,
    permanentaddress: string,
    contactnumber: string,
    iscashier: boolean,
    issalesassociate: boolean,
    iscollector: boolean
}



export const useRestEmployee = (): [(collectorID:number) => void, IEmployee | undefined] => {

    const [collector, setCollector] = useState<IEmployee>();

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




    return [getCollectorByID, collector]
}
