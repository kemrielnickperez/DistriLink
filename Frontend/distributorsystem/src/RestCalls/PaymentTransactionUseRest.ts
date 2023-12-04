import axios from "axios";
import { IDirectPaymentReceipt, IOrder, IPaymentTransaction } from "./Interfaces";
import { useState } from "react";
import { toast } from "react-toastify";



export const useRestPaymentTransaction = (): [(paymenttransactions: IPaymentTransaction[], orderid: string) => void, (paymenttransactionid: string) => void, (paymentransactionid: string, paymentransaction: IPaymentTransaction) => void, (paymenttransactionid: string) => void, (paymenttransactionid: string) => void, IPaymentTransaction | undefined, number | undefined, number | undefined] => {

    const [paymentTransaction, setPaymentTransaction] = useState<IPaymentTransaction>();
    const [isPaymentTransactionFound, setIsPaymentTransactionFound] = useState<boolean>();
    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState<boolean>();
    const [remainingPaymentAmount, setRemainingPaymentAmount] = useState(0);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);

    function createPaymentTransaction(paymenttransactions: IPaymentTransaction[], orderid: string) {
          axios.post(`http://localhost:8080/paymenttransaction/createPaymentTransaction/${orderid}`, paymenttransactions )
            .then((response) => {
            
            })
            .catch((error) => {
            });   
    }


    function getPaymentTransactionByID(paymenttransactionid: string) {
        axios.get(`http://localhost:8080/paymenttransaction/getPaymentTransactionByID/${paymenttransactionid}`)
            .then((response) => {

                setPaymentTransaction(response.data);
                
                 if (response.data !== null) {
                    setIsPaymentTransactionFound(true);
                }
                else {
                    setIsPaymentTransactionFound(false);
                }
            })
            .catch((error) => {
                
            });
    }

    

    function updatePaymentTransaction(paymentransactionid: string, paymentransaction: IPaymentTransaction) {
        axios.put(`http://localhost:8080/paymenttransaction/updatePaymentTransaction/${paymentransactionid}`, paymentransaction)
            .then((response) => {
               console.log("na update ra hoho")
                toast.success('Installment ' + paymentransaction.installmentnumber + " schedule has been updated.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                
            })
            .catch((error) => {
                console.error('Error updating payment transaction:', error);
            });
    }


    function getRemainingPaymentAmount(paymenttransactionid: string) {
        axios.get(`http://localhost:8080/paymenttransaction/getRemainingPaymentAmount/${paymenttransactionid}`)
            .then((response) => {
                setRemainingPaymentAmount(response.data)
               
            })
            .catch((error) => {
                
            });
    }


    

    function getTotalPaidAmount(paymenttransactionid: string) {
        axios.get(`http://localhost:8080/paymenttransaction/getTotalPaidAmount/${paymenttransactionid}`)
            .then((response) => {
                setTotalPaidAmount(response.data)
               
            })
            .catch((error) => {
                
            });
    }


    return [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, getRemainingPaymentAmount, getTotalPaidAmount, paymentTransaction, totalPaidAmount, remainingPaymentAmount]

}