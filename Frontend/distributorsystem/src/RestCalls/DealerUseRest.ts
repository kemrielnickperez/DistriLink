import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer, IDealerDocument } from "./Interfaces";
import { de } from "date-fns/locale";
import { error } from "console";





export const useRestDealer = (): [(dealerID: string) => void, (dealer: IDealer, dealerDocuments:IDealerDocument[]) => void,(dealerID: string) => void, (dealerID:string, creditlimit: number) => void, (dealerID: string, remarks: string) => void, boolean | undefined, IDealer | undefined] => {

    const [dealer, setDealer] = useState<IDealer>();
    const [isDealerFound, setIsDealerFound] = useState(false);

    function newDealer(dealer: IDealer, dealerDocuments: IDealerDocument[]) {
       
        console.log(dealerDocuments.length)
        const formData = new FormData();

        // Add dealer object properties to formData
        formData.append('dealerid', dealer.dealerid.toString());
        formData.append('firstname', dealer.firstname.toString());
        formData.append('middlename', dealer.middlename.toString());
        formData.append('lastname', dealer.lastname.toString());
        formData.append('emailaddress', dealer.email.toString());
        formData.append('password', dealer.password.toString());
        formData.append('birthdate', dealer.birthdate.toString());
        formData.append('gender', dealer.gender.toString());
        formData.append('currentaddress', dealer.currentaddress);
        formData.append('permanentaddress', dealer.permanentaddress);
        formData.append('contactnumber', dealer.contactnumber);
        formData.append('hasbusiness', dealer.hasbusiness.toString());
        formData.append('businessname', dealer.businessname);
        formData.append('businessphone', dealer.businessphone);
        formData.append('businessaddress', dealer.businessaddress);
        formData.append('businesstin', dealer.businesstin);
        formData.append('creditlimit', dealer.creditlimit.toString());
        formData.append('submissiondate', dealer.submissiondate);
        formData.append('confirmed', dealer.confirmed.toString());
        formData.append('remarks', dealer.remarks);
    
           dealerDocuments.forEach((document, index) => {
           
            formData.append(`documentid`, document.documentid);
            formData.append(`name`, document.name);
            formData.append(`type`, document.type);
            formData.append(`content`, new Blob([document.content], { type: 'application/octet-stream' }));
          }); 
       
        
        
        

         axios.post('http://localhost:8080/dealer/registerDealer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
               
                alert('Success!');
            })
            .catch((error) => {

                alert('Error creating a new record. Please try again.');
            }); 

            
        }

        function confirmDealer(dealerID: string, creditlimit: number){
            const confirmDealer ={
                dealerid: dealerID,
                confirmed: true,
                creditlimit: creditlimit,
            };

            axios.put(`http://localhost:8080/dealer/confirmDealer/${dealerID}`, confirmDealer,{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                alert('The dealer confirmed successfully!');
            })
            .catch((error) => {
                alert('Error dealer confirmation. Please try again.');
            });
        }

        function markDealerAsPending(dealerID: string, remarks: string) {
            const pendingDealer = {
              dealerid: dealerID,
              confirmed: false,
              remarks: remarks,
            };

            axios.put(`http://localhost:8080/dealer/updateDealerPending/${dealerID}`, pendingDealer, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                alert('Dealer status updated to pending successfully!');
            })
            .catch((error) => {
                alert('Error updating dealer status to pending. Please try again.');
            });
        }

        function updateDealer(dealerID: string){
            const updatedDealer = {
                dealerid: dealerID,
                confirmed: true,
            };
        
            axios.put(`http://localhost:8080/dealer/setDealer/${dealerID}`, updatedDealer, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                alert('Dealer confirmation updated successfully!');
            })
            .catch((error) => {
                alert('Error updating dealer confirmation. Please try again.');
            });
        }

        function getDealerByID(dealerID:String) {
            axios.get(`http://localhost:8080/dealer/getDealerByID/${dealerID}`, {
               params:{
                   dealerid: dealerID
               }
            })
               .then((response) => {
                   setDealer(response.data);
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
    return [getDealerByID, newDealer, updateDealer, confirmDealer, markDealerAsPending, isDealerFound, dealer,]
}
