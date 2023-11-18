import { useState } from "react";
import { IDistributor } from "./Interfaces";
import axios from "axios";

export const useRestDistributor=():[(distributorID:string) => void, (distributor:IDistributor) => void, IDistributor | undefined]=>{
    const [distributor, setDistributor] = useState<IDistributor>();
    
    function newDistributor(distributor: IDistributor){
    
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