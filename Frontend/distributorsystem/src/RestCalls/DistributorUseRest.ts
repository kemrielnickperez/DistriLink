import { useState } from "react";
import { IDistributor } from "./Interfaces";
import axios from "axios";

export const useRestDistributor=():[(distributorID:string)=>void, (distributor:IDistributor)=>void, IDistributor | undefined]=>{
    const [distributor, setDistributor]=useState<IDistributor>();
    
    function newDistributor(distributor:IDistributor){
        
       
        // Add distributor object properties to formData
      
        
        axios.post('http://localhost:8080/distributor/registerDistributor', {
                distributorid: distributor.distributorid.toString(),
                firstname: distributor.firstname.toString(),
                middlename: distributor.middlename.toString(),
                lastname: distributor.lastname.toString(),
                emailaddress: distributor.emailaddress.toString(),
                password: distributor.password.toString(),
                birthdate: distributor.birthdate.toString(),
                gender: distributor.gender.toString(),
                currentaddress: distributor.currentaddress.toString(),
                permanentaddress: distributor.permanentaddress.toString(),
                contactnumber: distributor.contactnumber.toString(),
                dealerids:[],
                employeeids:[],
                orderids:[]
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