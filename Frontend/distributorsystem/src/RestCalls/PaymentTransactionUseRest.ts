import axios from "axios";
import { IDirectPaymentReceipt, IPaymentTransaction } from "./Interfaces";
import { useState } from "react";



export const useRestPaymentTransaction = (): [(paymenttransactionid: number) => void, IPaymentTransaction | undefined] => {

    const [paymentTransaction, setPaymentTransaction] = useState<IPaymentTransaction>();
    const [isPaymentTransactionFound, setIsPaymentTransactionFound] = useState<boolean>();

    function getPaymentTransactionByID(paymenttransactionid: number) {
        axios.get(`http://localhost:8080/paymenttransaction/getPaymentTransactionByID/${paymenttransactionid}`)
            .then((response) => {

                setPaymentTransaction(response.data);
                //console.log(response.data);
                
                 if (response.data !== null) {
                    setIsPaymentTransactionFound(true);
                }
                else {
                    setIsPaymentTransactionFound(false);
                }
            })
            .catch((error) => {
                console.error('Cannot find Payment Transaction:', error);
                alert("Cannot find Payment Transaction. Please try again.");
            });
    }
    return [getPaymentTransactionByID, paymentTransaction]

}