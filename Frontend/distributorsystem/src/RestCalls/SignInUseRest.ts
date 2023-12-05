import axios, { } from "axios";
import { useContext, useState } from "react";
import { IDealer, IDealerDocument } from "./Interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





export const useRestSignIn = (): [(userid: string, password: string) => void] => {


    const navigate = useNavigate();

    function signIn(userid: string, password: string) {
        axios.post('http://localhost:8080/signin', {
            userId: userid,
            password: password
        })
            .then((response) => {
                console.log(response.data.tableName)
                
                 if (response.status === 200) {
                    const result = response.data;
                    if (result.tableName === 'Dealer') {
                        console.log('Login successful as Dealer');
                       
                        localStorage.setItem("dealer", JSON.stringify(response.data.dealer));
                        navigate("/dashboard")
                    } else if (result.tableName === 'Distributor') {
                        console.log('Login successful as Distributor');
                        console.log(result.distributor)
                        // Redirect to the Dealer screen
                        // setSuccessMessage("Login successful as Distributor");
                        // setOpen(true)
                       
                        navigate("/dashboard")
                        localStorage.setItem("distributor", JSON.stringify(response.data.distributor));
                    
                    } else if(result.tableName === 'Sales Associate'){
                        console.log('Login successful as Sales Associate');
                       
                        // Redirect to the Dealer screen
                        // setSuccessMessage("Login successful as Distributor");
                        // setOpen(true)
                       
                        navigate("/dashboard")
                        localStorage.setItem("salesAssociate", JSON.stringify(response.data.salesAssociate));
                    
                    }
                    else if(result.tableName === 'Cashier'){
                        console.log(response.data.tableName)
                        console.log('Login successful as Cashier');
                       
                        // Redirect to the Dealer screen
                        // setSuccessMessage("Login successful as Distributor");
                        // setOpen(true)
                       
                        navigate("/dashboard")
                        localStorage.setItem("cashier", JSON.stringify(response.data.cashier));
                    
                    }
                    
                     else if (result.tableName = 'Sales Associate and Cashier') {
                        console.log('Login successful as Employee (Sales Associate and Cashier)');
                    
                        localStorage.setItem("salesAssociate&Cashie", JSON.stringify(response.data.salesAssociateAndCashier));
                     
                        navigate("/dashboard") 
                     }
                       /*  const user = response.data.find(
                            (u: any) => u.dealerid === userid && u.password === password);
                        if (user) {
                            console.log(userid, password);
                            console.log("Login successful!");
                            sessionStorage.setItem('user', JSON.stringify(user));

                            window.location.assign('http://localhost:3000/dashboard');
                        } else {
                            console.log('Invalid username or password');

                        } */
                    else {
                        console.log('Error');

                    }
                } 
            }).catch((error) => {
                console.log(error);
            });

    }


    return [signIn];
}
