import axios from "axios";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IPaymentReceipt } from "./Interfaces";
import { useState } from "react";
import { toast } from "react-toastify";



export const useRestPaymentReceipt = (): [(directpaymentreceipt: IDirectPaymentReceipt, receiverID: string) => void, (paymentreceiptid: string) => void, (collectionpaymentreceiptid: string, cashierid: string) => void, IPaymentReceipt | undefined, IDirectPaymentReceipt | undefined, ICollectionPaymentReceipt | undefined, boolean | undefined] => {

    const [paymentReceipt, setPaymentReceipt] = useState<IPaymentReceipt>();
    const [directPaymentReceipt, setDirectPaymentReceipt] = useState<IDirectPaymentReceipt>();
    const [collectionPaymentReceipt, setCollectionPaymentReceipt] = useState<ICollectionPaymentReceipt>();

    const [isPaymentReceiptFound, setIsPaymentReceiptFound] = useState<boolean>();


    function createDirectPaymentReceipt(directpaymentreceipt: IDirectPaymentReceipt, receiverID: string) {

        axios.post(`http://localhost:8080/paymentreceipt/directpaymentreceipt/createDirectPaymentReceipt/${receiverID}`, {
            paymentreceiptid: directpaymentreceipt.paymentreceiptid,
            remarks: directpaymentreceipt.remarks,
            datepaid: directpaymentreceipt.datepaid,
            amountpaid: directpaymentreceipt.amountpaid,
            paymenttype: directpaymentreceipt.paymenttype,
            daterecorded: directpaymentreceipt.daterecorded,
            receivedamount: directpaymentreceipt.receivedamount,
            paymenttransactionid: directpaymentreceipt.paymenttransactionid,
            receiverID: "",
            receivername: ""

        })
            .then((response) => {
                toast.success(`Payment for Payment Transaction ${directpaymentreceipt.paymenttransactionid} successfully recorded!`, {
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
                toast.error(`Payment for Payment Transaction ${directpaymentreceipt.paymenttransactionid} not recorded! Please try again.`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
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

    function confirmCollectionPaymentReceipt(collectionpaymentreceiptid: string, receiverID: string) {
        axios.put(`http://localhost:8080/paymentreceipt/collectionpaymentreceipt/updateCollectionPaymentReceipt/${collectionpaymentreceiptid}/${receiverID}`)
            .then((response) => {


            })
            .catch((error) => {

                
            });

    }

    return [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound]

}