import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";



export interface IDealer {
    dealerid:number,
    firstname: string,
    middlename: string,
    lastname: string,
    birthdate: string,
    gender: string,
    currentaddress: string,
    permanentaddress: string,
    contactnumber: string,
    hasbusiness: boolean,
    businessname: string,
    businessphone: string,
    businessaddress: string,
    businesstin: string,
    creditlimit: number,
    submissiondate: string,
    attachments: string,
}


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
                    console.log(true)
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
