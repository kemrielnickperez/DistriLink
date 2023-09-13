import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./Interfaces";







export const useRestEmployee = (): [(collectorID:number) => void, IEmployee | undefined] => {

    const [collector, setCollector] = useState<IEmployee>();

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




    return [getCollectorByID, collector]
}
