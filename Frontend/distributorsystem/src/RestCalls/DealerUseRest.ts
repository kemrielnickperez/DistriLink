import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer, IDealerDocument } from "./Interfaces";
import { de } from "date-fns/locale";





export const useRestDealer = (): [(dealerID: string) => void, (dealer: IDealer, dealerDocuments:IDealerDocument[]) => void, boolean | undefined, IDealer | undefined] => {

    const [dealer, setDealer] = useState<IDealer>();
    const [isDealerFound, setIsDealerFound] = useState(false);

    function newDealer(dealer: IDealer, dealerDocuments: IDealerDocument[]) {
        /*  axios.post('http://localhost:8080/dealer/registerDealer', {
             dealer: {
                 dealerid: dealer.dealerid,
                 firstname: dealer.firstname,
                 middlename: dealer.middlename,
                 lastname: dealer.lastname,
                 birthdate: dealer.birthdate,
                 gender: dealer.gender,
                 currentaddress: dealer.currentaddress,
                 permanentaddress: dealer.permanentaddress,
                 contactnumber: dealer.contactnumber,
                 hasbusiness: dealer.hasbusiness,
                 businessname: dealer.businessname,
                 businessphone: dealer.businessphone,
                 businessaddress: dealer.businessaddress,
                 businesstin: dealer.businesstin,
                 creditlimit: dealer.creditlimit,
                 submissiondate: dealer.submissiondate,
                 attachments: dealer.attachments,
                 orderids: [],
             },
             documentid: ["attachmentId1"],
             name: ["attachmentName1"],
             type: ["png"],
             content: [
              "distributorsystem/public/logo192.png"
             ],
         })
             .then((response) => {
                 console.log(response.data);
                 alert("success!");
             })
             .catch((error) => {
                 console.error('Error creating a new record:', error);
                 alert("Error creating a new record. Please try again.");
             }); */


           console.log(dealerDocuments[0])
        const formData = new FormData();

        // Add dealer object properties to formData
        formData.append('dealerid', dealer.dealerid.toString());
        formData.append('firstname', dealer.firstname.toString());
        formData.append('middlename', dealer.middlename.toString());
        formData.append('lastname', dealer.lastname.toString());
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
    
       /*  documents.forEach((document, index) => {
            formData.append(`documentid`, document.documentId);
            formData.append(`name`, document.name);
            formData.append(`type`, document.type);
            // Add more fields as needed for each document
          }); */

           dealerDocuments.forEach((document, index) => {
           
            formData.append(`documentid`, document.documentid);
            formData.append(`name`, document.name);
            formData.append(`type`, document.type);
            formData.append(`content`, new Blob([document.content], { type: 'application/octet-stream' }));
          }); 
       
        console.log(formData.get('dealer.firstname'))
        // Make the POST request

         axios.post('http://localhost:8080/dealer/registerDealer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
               // console.log(response.data);
                alert('Success!');
            })
            .catch((error) => {

                console.error('Error creating a new record:', error);
                alert('Error creating a new record. Please try again.');
            }); 

            
        }

        function getDealerByID(dealerID:String) {
            axios.get(`http://localhost:8080/dealer/getDealerByID?dealerid=${dealerID}`, {
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
