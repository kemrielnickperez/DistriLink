import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer } from "./Interfaces";





export const useRestDealer = (): [ (dealerID:number) => void, (dealer:IDealer)=>void, boolean | undefined, IDealer | undefined] => {

    const [dealer, setDealer] = useState<IDealer>();
    const [isDealerFound, setIsDealerFound] = useState(false);

     function newDealer(dealer:IDealer){
            axios.post('http://localhost:8080/dealer/registerDealer',{
            // dealerid: dealer.dealerid,
                firstname: dealer.firstname,
                middlename:dealer.middlename,
                lastname: dealer.lastname,
                birthdate:dealer.birthdate,
                gender: dealer.gender,
                currentaddress: dealer.currentaddress,
                permanentaddress: dealer.permanentaddress,
                contactnumber: dealer.contactnumber,
                hasbusiness: dealer.hasbusiness,
                businessname: dealer.businessname,
                businessphone: dealer. businessphone,
                businessaddress: dealer.businessaddress,
                businesstin: dealer.businesstin,
                creditlimit: dealer.creditlimit,
                submissiondate: dealer.submissiondate,
                attachments: dealer.attachments,
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
    return [getDealerByID, newDealer, isDealerFound, dealer,]
}
