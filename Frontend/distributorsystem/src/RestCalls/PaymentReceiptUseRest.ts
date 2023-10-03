import axios from "axios";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IPaymentReceipt } from "./Interfaces";
import { useState } from "react";



export const useRestPaymentReceipt = (): [(paymenttransactionid: number, directpaymentreceipt: IDirectPaymentReceipt) => void, (paymentreceiptid: string) => void, (collectionpaymentreceiptid: string, cashierid: string) => void, IPaymentReceipt | undefined, IDirectPaymentReceipt | undefined, ICollectionPaymentReceipt | undefined, boolean | undefined] => {

    const [paymentReceipt, setPaymentReceipt] = useState<IPaymentReceipt>();
    const [directPaymentReceipt, setDirectPaymentReceipt] = useState<IDirectPaymentReceipt>();
    const [collectionPaymentReceipt, setCollectionPaymentReceipt] = useState<ICollectionPaymentReceipt>();

    const [isPaymentReceiptFound, setIsPaymentReceiptFound] = useState<boolean>();


    function createDirectPaymentReceipt(paymenttransactionid: number, directpaymentreceipt: IDirectPaymentReceipt) {
        /*  axios.post(`http://localhost:8080/paymentreceipt/createDirectPaymentReceipt?paymenttransactionid=${paymenttransactionid}`, {
             //paymentreceiptid. directpaymentreceipt.paymentreceiptid,
             remarks: directpaymentreceipt.remarks,
             datepaid: directpaymentreceipt.datepaid,
             amountpaid: directpaymentreceipt.amountpaid,
             paymenttype: directpaymentreceipt.paymenttype,
            /*  cashier: {
                 employeeid: directpaymentreceipt.cashier.employeeid,
                 firstname: directpaymentreceipt.cashier.firstname,
                 middlename: directpaymentreceipt.cashier.middlename,
                 lastname: directpaymentreceipt.cashier.lastname,
                 birthdate: directpaymentreceipt.cashier.birthdate,
                 gender: directpaymentreceipt.cashier.gender,
                 currentaddress: directpaymentreceipt.cashier.currentaddress,
                 permanentaddress: directpaymentreceipt.cashier.permanentaddress,
                 contactnumber: directpaymentreceipt.cashier.contactnumber,
                 iscashier: directpaymentreceipt.cashier.iscashier,
                 issalesassociate: directpaymentreceipt.cashier.issalesassociate,
                 iscollector: directpaymentreceipt.cashier.iscollector
             }, */
        /* cashier: {
          employeeid: 1,
          firstname: "Catherine",
          middlename: "Damalerio",
          lastname: "Perez",
          birthdate: "December 23, 2002",
          gender: "Female",
          currentaddress: "Pajo, LLC",
          permanentaddress: "Basak, LLC",
          contactnumber: "000000000000",
          iscashier: true,
          issalesassociate: true,
          iscollector: true,
         
      }, 
        paymenttransaction: {
            paymenttransactionid: directpaymentreceipt.paymenttransaction?.paymenttransactionid,
            amountdue: directpaymentreceipt.paymenttransaction?.amountdue,
            startingdate: directpaymentreceipt.paymenttransaction?.startingdate,
            enddate: directpaymentreceipt.paymenttransaction?.enddate,
            installmentnumber: directpaymentreceipt.paymenttransaction?.installmentnumber,
            paid: directpaymentreceipt.paymenttransaction?.paid,
            order: {
                orderid: directpaymentreceipt.paymenttransaction?.order?.orderid,
                distributiondate: directpaymentreceipt.paymenttransaction?.order?.distributiondate,
                penaltyrate: directpaymentreceipt.paymenttransaction?.order?.penaltyrate,
                paymentterms: directpaymentreceipt.paymenttransaction?.order?.paymentterms,
                orderdate: directpaymentreceipt.paymenttransaction?.order?.orderdate,
                orderedProducts: directpaymentreceipt.paymenttransaction?.order?.orderedproducts,
                dealer: {
                    dealerid: directpaymentreceipt.paymenttransaction?.order?.dealer?.dealerid,
                    firstname: directpaymentreceipt.paymenttransaction?.order?.dealer?.firstname,
                    middlename: directpaymentreceipt.paymenttransaction?.order?.dealer?.middlename,
                    lastname: directpaymentreceipt.paymenttransaction?.order?.dealer?.lastname,
                    birthdate: directpaymentreceipt.paymenttransaction?.order?.dealer?.birthdate,
                    gender: directpaymentreceipt.paymenttransaction?.order?.dealer?.gender,
                    currentaddress: directpaymentreceipt.paymenttransaction.order?.dealer?.currentaddress,
                    permanentaddress: directpaymentreceipt.paymenttransaction.order?.dealer?.permanentaddress,
                    contactnumber: directpaymentreceipt.paymenttransaction.order?.dealer?.contactnumber,
                    hasbusiness: directpaymentreceipt.paymenttransaction.order?.dealer?.hasbusiness,
                    businessname: directpaymentreceipt.paymenttransaction.order?.dealer?.businessname,
                    businessphone: directpaymentreceipt.paymenttransaction.order?.dealer?.businessphone,
                    businessaddress: directpaymentreceipt.paymenttransaction.order?.dealer?.businessaddress,
                    businesstin: directpaymentreceipt.paymenttransaction.order?.dealer?.businesstin,
                    creditlimit: directpaymentreceipt.paymenttransaction.order?.dealer?.creditlimit,
                    submissiondate: directpaymentreceipt.paymenttransaction.order?.dealer?.submissiondate,
                    attachments: directpaymentreceipt.paymenttransaction.order?.dealer?.attachments,
                },
                collector: {
                    employeeid: directpaymentreceipt.paymenttransaction.order?.collector?.employeeid,
                    firstname: directpaymentreceipt.paymenttransaction.order?.collector?.firstname,
                    middlename: directpaymentreceipt.paymenttransaction.order?.collector?.middlename,
                    lastname: directpaymentreceipt.paymenttransaction.order?.collector?.lastname,
                    birthdate: directpaymentreceipt.paymenttransaction.order?.collector?.birthdate,
                    gender: directpaymentreceipt.paymenttransaction.order?.collector?.gender,
                    currentaddress: directpaymentreceipt.paymenttransaction.order?.collector?.currentaddress,
                    permanentaddress: directpaymentreceipt.paymenttransaction.order?.collector?.permanentaddress,
                    contactnumber: directpaymentreceipt.paymenttransaction.order?.collector?.contactnumber,
                    is_cashier: directpaymentreceipt.paymenttransaction.order?.collector?.is_cashier,
                    is_salesassociate: directpaymentreceipt.paymenttransaction.order?.collector?.is_salesassociate,
                    is_collector: directpaymentreceipt.paymenttransaction.order?.collector?.is_collector
                }
            }
        }
    })
        .then((response) => {
            alert("yey mogana :>")
            console.log("hakdog")
        })
        .catch((error) => {
            alert("Please try again.");
        }); */
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