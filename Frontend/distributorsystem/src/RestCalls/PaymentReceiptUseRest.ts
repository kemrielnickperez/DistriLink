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
                    employeeid: "3593cd2f",
                    firstname: "Victoria",
                    middlename: "Victoria",
                    lastname: "Ramirez",
                    emailaddress: "charmaineramirez05@gmail.com",
                    birthdate:"1997-10-15",
                    gender:"Female",
                    password: "test",
                    currentaddress:"2079 Humay-Humay Street",
                    permanentaddress:"Pajo",
                    contactnumber:"09123456789",
                    tinnumber: null,
                    is_cashier:true,
                    is_salesassociate:false,
                    is_collector:true,
                    submissiondate: "2023-10-23",
                    orderids: [
                        "e60e0410"
                    ],
                    paymentreceiptids: [],
                    collectionpaymentids: [],
                    documentids: [
                        "04853f62"
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
                
                alert("Cannot update Payment Receipt. Please try again.");
            });

    }

    return [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound]

}