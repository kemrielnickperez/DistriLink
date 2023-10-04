import axios from "axios";
import { IDirectPaymentReceipt, IOrder, IPaymentTransaction } from "./Interfaces";
import { useState } from "react";



export const useRestPaymentTransaction = (): [(paymenttransactions: IPaymentTransaction[], orderid: string) => void, (paymenttransactionid: string) => void, (paymentransactionid: string, paymentransaction: IPaymentTransaction) => void, IPaymentTransaction | undefined] => {

    const [paymentTransaction, setPaymentTransaction] = useState<IPaymentTransaction>();
    const [isPaymentTransactionFound, setIsPaymentTransactionFound] = useState<boolean>();
    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState<boolean>();


    function createPaymentTransaction(paymenttransactions: IPaymentTransaction[], orderid: string) {
        console.log(paymenttransactions)
          axios.post(`http://localhost:8080/paymenttransaction/createPaymentTransaction/${orderid}`, paymenttransactions )
            .then((response) => {
                console.log("hoy");
               
            })
            .catch((error) => {
                alert("Please try again.");
            });   
    }


   /*  function createPaymentTransaction(paymenttransaction: IPaymentTransaction, orderid: string) {
        axios.post(`http://localhost:8080/paymenttransaction/createPaymentTransaction/${orderid}`, {
           paymenttransactionid: paymenttransaction.paymenttransactionid,
           amountdue: paymenttransaction.amountdue.toFixed(2),
           startingdate: paymenttransaction.startingdate,
           enddate: paymenttransaction.enddate,
           installmentnumber: paymenttransaction.installmentnumber,
           
           orderid: paymenttransaction.orderid,
           paid: paymenttransaction.paid,
           paymentreceiptid: paymenttransaction.paymentreceiptid
        /* {
               orderid: paymenttransaction?.order?.orderid!,
               distributiondate: paymenttransaction.order.distributiondate,
               penaltyrate: paymenttransaction.order.penaltyrate,
               paymentterms: paymenttransaction.order.paymentterms,
               orderdate: paymenttransaction.order.orderdate,
               dealer: {
                   dealerid:paymenttransaction.order.dealer.dealerid,
                   firstname: paymenttransaction.order.dealer.firstname,
                   middlename: paymenttransaction.order.dealer.middlename,
                   lastname: paymenttransaction.order.dealer.lastname,
                   birthdate: paymenttransaction.order.dealer.birthdate,
                   gender: paymenttransaction.order.dealer.gender,
                   currentaddress: paymenttransaction.order.dealer.currentaddress,
                   permanentaddress: paymenttransaction.order.dealer.permanentaddress,
                   contactnumber: paymenttransaction.order.dealer.contactnumber,
                   hasbusiness: paymenttransaction.order.dealer.hasbusiness,
                   businessname: paymenttransaction.order.dealer.businessname,
                   businessphone: paymenttransaction.order.dealer. businessphone,
                   businessaddress: paymenttransaction.order.dealer.businessaddress,
                   businesstin: paymenttransaction.order.dealer.businesstin,
                   creditlimit: paymenttransaction.order.dealer.creditlimit,
                   submissiondate: paymenttransaction.order.dealer.submissiondate,
                   attachments: paymenttransaction.order.dealer.attachments,
                   ordersid: paymenttransaction.order.dealer.orderids,
                   
               },
               collector: {
                   employeeid: paymenttransaction.order.collector?.employeeid,
                   firstname: paymenttransaction.order.collector?.firstname,
                   middlename: paymenttransaction.order.collector?.middlename,
                   lastname: paymenttransaction.order.collector?.lastname,
                   birthdate: paymenttransaction.order.collector?.birthdate,
                   gender: paymenttransaction.order.collector?.gender,
                   currentaddress: paymenttransaction.order.collector?.currentaddress,
                   permanentaddress: paymenttransaction.order.collector?.permanentaddress,
                   contactnumber: paymenttransaction.order.collector?.contactnumber,
                   is_cashier: paymenttransaction.order.collector?.is_cashier,
                   is_salesassociate: paymenttransaction.order.collector?.is_salesassociate,
                   is_collector: paymenttransaction.order.collector?.is_collector
               },
               orderedproducts:paymenttransaction.order.orderedproducts,
               paymenttransactions:paymenttransaction.order.paymenttransactions,
               
           }, 
           })
           .then((response) => {
               console.log("hoy");
               
           })
           .catch((error) => {
               alert("Please try again.");
           }); 
   }
 */


    function getPaymentTransactionByID(paymenttransactionid: string) {
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

    

    function updatePaymentTransaction(paymentransactionid: string, paymentransaction: IPaymentTransaction) {
        axios.put(`http://localhost:8080/paymenttransaction/updatePaymentTransaction/${paymentransactionid}`, paymentransaction)
            .then((response) => {
                console.log(response.data)
               // console.log(paymentransaction.startingdate)
                alert("successfully updated!")
                
            })
            .catch((error) => {
                console.error('Error updating payment transaction:', error);
            });
    }


    return [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction]

}