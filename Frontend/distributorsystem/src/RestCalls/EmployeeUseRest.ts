import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./Interfaces";







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
