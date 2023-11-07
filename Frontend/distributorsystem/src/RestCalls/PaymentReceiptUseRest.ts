import axios from "axios";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IPaymentReceipt } from "./Interfaces";
import { useState } from "react";



export const useRestPaymentReceipt = (): [(directpaymentreceipt: IDirectPaymentReceipt) => void, (paymentreceiptid: string) => void, (collectionpaymentreceiptid: string, cashierid: string) => void, IPaymentReceipt | undefined, IDirectPaymentReceipt | undefined, ICollectionPaymentReceipt | undefined, boolean | undefined] => {

    const [paymentReceipt, setPaymentReceipt] = useState<IPaymentReceipt>();
    const [directPaymentReceipt, setDirectPaymentReceipt] = useState<IDirectPaymentReceipt>();
    const [collectionPaymentReceipt, setCollectionPaymentReceipt] = useState<ICollectionPaymentReceipt>();

    const [isPaymentReceiptFound, setIsPaymentReceiptFound] = useState<boolean>();


    function createDirectPaymentReceipt(directpaymentreceipt: IDirectPaymentReceipt) {
        
        axios.post('http://localhost:8080/paymentreceipt/createDirectPaymentReceipt', {
             paymentreceiptid: directpaymentreceipt.paymentreceiptid,
             remarks: directpaymentreceipt.remarks,
             datepaid: directpaymentreceipt.datepaid,
             amountpaid: directpaymentreceipt.amountpaid,
             paymenttype: directpaymentreceipt.paymenttype,
             paymenttransaction: directpaymentreceipt.paymenttransaction,
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
                    middlename: "Damalerio",
                    lastname: "Perez",
                    birthdate:"2004-12-30",
                    gender:"Female",
                    emailaddress: null,
                    password: null,
                    currentaddress:"Pajo, LLC",
                    permanentaddress:"Basak, LLC",
                    contactnumber:"000000000000",
                    tinnumber: null,
                    is_cashier:true,
                    is_salesassociate:true,
                    is_collector:true,
                    orderids: [
                        "b03fbc3a",
                        "1",
                        "09e15246",
                        "47ec5867",
                        "6aade87b",
                        "0fdccd5f",
                        "49cc8ef7",
                        "e198c714",
                        "3c10ad56",
                        "9f53c238",
                        "32f65e01",
                        "8de9a5c0",
                        "b1245089",
                        "56ecd2a4",
                        "cf4e8d82",
                        "d1bc6e82",
                        "f9448c52",
                        "a0ca31ae",
                        "d1cce325",
                        "b93717ef",
                        "784accc8",
                        "78d48528",
                        "01417e43",
                        "e806fd05"
                    ],
                    paymentreceiptids: [
                        "prid49",
                        "filetest_1",
                        "prid59"
                    ]

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
               
                alert("Cannot find Payment Receipt. Please try again.");
            });
    }

    function confirmCollectionPaymentReceipt(collectionpaymentreceiptid: string, cashierid: string) {
        axios.put(`http://localhost:8080/paymentreceipt/updateCollectionPaymentReceipt/${collectionpaymentreceiptid}/${cashierid}`)
            .then((response) => {

                
            })
            .catch((error) => {
                
                // alert("Cannot update Payment Receipt. Please try again.");
            });

    }

    return [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound]

}