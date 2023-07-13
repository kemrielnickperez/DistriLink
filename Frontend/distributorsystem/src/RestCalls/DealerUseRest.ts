import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer } from "./Interfaces";





export const useRestDealer = (): [(dealerID:number) => void, IDealer | undefined, boolean | undefined] => {

    const [dealer, setDealer] = useState<IDealer>();
    const [isDealerFound, setIsDealerFound] = useState(false);

     function getDealerByID(dealerID:number) {
         axios.get('http://localhost:8080/dealer/getDealerByID', {
            params:{
                dealerid: dealerID
            }
         })
            .then((response) => {
                setDealer(response.data);
        
                console.log(response.data);
                if(response.data !== null){
                    setIsDealerFound(true);

                }
                else{
                    setIsDealerFound(false);
                }
            })
            .catch((error) => {
                console.error('Error retrieving dealer data:', error);
              });
    } 
    return [getDealerByID, dealer, isDealerFound]
}
