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
             daterecorded: directpaymentreceipt.daterecorded,
             receivedamount: directpaymentreceipt.receivedamount,
             paymenttransaction: directpaymentreceipt.paymenttransaction,
             receiver: {
                id: directpaymentreceipt?.receiver?.id, 
                fullName: directpaymentreceipt?.receiver?.fullName, 
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

    function confirmCollectionPaymentReceipt(collectionpaymentreceiptid: string, receiverid: string) {
        axios.put(`http://localhost:8080/paymentreceipt/updateCollectionPaymentReceipt/${collectionpaymentreceiptid}/${receiverid}`)
            .then((response) => {

                
            })
            .catch((error) => {
                
                // alert("Cannot update Payment Receipt. Please try again.");
            });

    }

    return [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound]

}