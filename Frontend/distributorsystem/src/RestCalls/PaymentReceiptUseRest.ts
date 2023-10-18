import axios from "axios";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IPaymentReceipt } from "./Interfaces";
import { useState } from "react";



export const useRestPaymentReceipt = (): [(paymenttransactionid: string, directpaymentreceipt: IDirectPaymentReceipt) => void, (paymentreceiptid: string) => void, (collectionpaymentreceiptid: string, cashierid: string) => void, IPaymentReceipt | undefined, IDirectPaymentReceipt | undefined, ICollectionPaymentReceipt | undefined, boolean | undefined] => {

    const [paymentReceipt, setPaymentReceipt] = useState<IPaymentReceipt>();
    const [directPaymentReceipt, setDirectPaymentReceipt] = useState<IDirectPaymentReceipt>();
    const [collectionPaymentReceipt, setCollectionPaymentReceipt] = useState<ICollectionPaymentReceipt>();

    const [isPaymentReceiptFound, setIsPaymentReceiptFound] = useState<boolean>();


    function createDirectPaymentReceipt(paymenttransactionid: string, directpaymentreceipt: IDirectPaymentReceipt) {
          axios.post(`http://localhost:8080/paymentreceipt/createDirectPaymentReceipt/${paymenttransactionid}`, {
             //paymentreceiptid. directpaymentreceipt.paymentreceiptid,
             remarks: directpaymentreceipt.remarks,
             datepaid: directpaymentreceipt.datepaid,
             amountpaid: directpaymentreceipt.amountpaid,
             paymenttype: directpaymentreceipt.paymenttype,
              cashier: {
                //  employeeid: directpaymentreceipt.cashier!.employeeid,
                //  firstname: directpaymentreceipt.cashier!.firstname,
                //  middlename: directpaymentreceipt.cashier!.middlename,
                //  lastname: directpaymentreceipt.cashier!.lastname,
                //  birthdate: directpaymentreceipt.cashier!.birthdate,
                //  gender: directpaymentreceipt.cashier!.gender,
                //  currentaddress: directpaymentreceipt!.cashier!.currentaddress,
                //  permanentaddress: directpaymentreceipt!.cashier!.permanentaddress,
                //  contactnumber: directpaymentreceipt!.cashier!.contactnumber,
                //  iscashier: directpaymentreceipt.cashier!.is_cashier,
                //  issalesassociate: directpaymentreceipt!.cashier!.is_salesassociate,
                //  iscollector: directpaymentreceipt!.cashier!.is_collector
                    employeeid: "employee1",
                    firstname: "Mina",
                    middlename: "Yamazaki",
                    lastname: "Perez",
                    birthdate:"2004-12-30",
                    gender:"Female",
                    currentaddress:"Pajo, LLC",
                    permanentaddress:"Basak, LLC",
                    contactnumber:"000000000000",
                    is_cashier:true,
                    is_salesassociate:true,
                    is_collector:true,
             }, 
       
            
    })
        .then((response) => {
            alert("Success")
           
        })
        .catch((error) => {
            console.log(error)
            alert("Please try again.");
        }); 
    }

    function getPaymentReceiptByID(paymentreceiptid: string) {
        axios.get(`http://localhost:8080/paymentreceipt/getPaymentReceiptByID/${paymentreceiptid}`)
            .then((response) => {
                setPaymentReceipt(response.data);

                if (response.data.paymenttype === 'collection')
                    setCollectionPaymentReceipt(response.data)
                else
                    setDirectPaymentReceipt(response.data);

                if (response.data !== null) {
                    setIsPaymentReceiptFound(true);
                }
                else {
                    setIsPaymentReceiptFound(false);
                }
            })
            .catch((error) => {
                console.error('Cannot find Payment Receipt:', error);
                alert("Cannot find Payment Receipt. Please try again.");
            });
    }

    function confirmCollectionPaymentReceipt(collectionpaymentreceiptid: string, cashierid: string) {
        axios.put(`http://localhost:8080/paymentreceipt/updateCollectionPaymentReceipt/${collectionpaymentreceiptid}/${cashierid}`)
            .then((response) => {

                //setPaymentReceipt(response.data);
                // console.log(response.data);

                //if (response.data !== null) {
                //setIsPaymentTransactionFound(true);
                //}
                //else {
                //    setIsPaymentTransactionFound(false);
                //}
            })
            .catch((error) => {
                console.error('Cannot update Payment Receipt:', error);
                alert("Cannot update Payment Receipt. Please try again.");
            });

    }

    return [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound]

}