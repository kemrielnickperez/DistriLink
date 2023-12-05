import { useState } from "react";
import { IDirectPaymentReceipt, IDistributor, IDistributorDocument } from "./Interfaces";
import axios from "axios";

export const useRestDistributor=():[(distributorID:string) => void, (distributor:IDistributor, distributorDocuments: IDistributorDocument[]) => void, IDistributor | undefined]=>{
    const [distributor, setDistributor] = useState<IDistributor>();
    

    function newDistributor(distributor: IDistributor, distributorDocuments: IDistributorDocument[]) {


        //console.log(dealer.distributor.dealerids)
        const formData = new FormData();

        // Add dealer object properties to formData
        formData.append('distributorid', distributor.distributorid.toString());
        formData.append('firstname', distributor.firstname.toString());
        formData.append('middlename', distributor.middlename.toString());
        formData.append('lastname', distributor.lastname.toString());
        formData.append('emailaddress', distributor.emailaddress.toString());
        formData.append('password', distributor.password.toString());
        formData.append('birthdate', distributor.birthdate.toString());
        formData.append('gender', distributor.gender.toString());
        formData.append('currentaddress', distributor.currentaddress.toString());
        formData.append('permanentaddress', distributor.permanentaddress.toString());
        formData.append('contactnumber', distributor.contactnumber.toString());
     
        
        distributor.dealerids.forEach((dealerid) => {
            formData.append(`distributor.distributorids`, dealerid);
        });


        distributor.employeeids.forEach((employeeid) => {
            formData.append(`distributor.employeeids`, employeeid);
        });

        distributor.orderids.forEach((orderid) => {
            formData.append(`distributor.orderids`, orderid);
        });

        distributor.paymentreceiptids.forEach((paymentreceiptid) => {
            formData.append(`distributor.paymentreceiptids`, paymentreceiptid);
        });

        distributor.archiveddealerids.forEach((archiveddealerid) => {
            formData.append(`distributor.archiveddealerids`, archiveddealerid);
        });

        distributorDocuments.forEach((document) => {

            formData.append(`documentid`, document.documentid.toString());
            formData.append(`name`, document.name.toString());
            formData.append(`type`, document.type.toString());
            formData.append(`content`, new Blob([document.content], { type: 'application/octet-stream' }));
        });


        axios.post('http://localhost:8080/distributor/registerDistributor', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {

               // alert('Success!');
            })
            .catch((error) => {
                console.log(error)
                alert('Error creating a new record. Please try again.');
            });


    }

    /* function newDistributor(distributor: IDistributor){
    
        axios.post('http://localhost:8080/distributor/registerDistributor', {
                distributorid: distributor.distributorid,
                firstname: distributor.firstname,
                middlename: distributor.middlename,
                lastname: distributor.lastname,
                emailaddress: distributor.emailaddress,
                password: distributor.password,
                birthdate: distributor.birthdate,
                gender: distributor.gender,
                currentaddress: distributor.currentaddress,
                permanentaddress: distributor.permanentaddress,
                contactnumber: distributor.contactnumber,
                dealerids:[],
                employeeids:[],
                orderids:[],
                paymentreceiptids:[]
        })
            .then((response) => {
             
                // alert('Success!');
            })
            .catch((error) => {
                console.log(error)
                 alert('Error creating a new record. Please try again.');
            });  
    }
 */


    function getDistributorByID(distributorID:String){
        axios.get(`http://localhost:8080/distributor/getDistributorByID/${distributorID}`)
        .then((response)=>{
            setDistributor(response.data)
           
        })
        .catch((error)=>{
            console.error('Error Finding Distributor', error);
    
        });
    }
    
    return[getDistributorByID, newDistributor,distributor]
}