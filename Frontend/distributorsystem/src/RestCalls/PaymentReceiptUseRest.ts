import axios from "axios";
import { IDirectPaymentReceipt } from "./Interfaces";



export const useRestPaymentReceipt = (): [(paymenttransactionid: number, directpaymentreceipt: IDirectPaymentReceipt) => void] => {


    function createDirectPaymentReceipt(paymenttransactionid: number, directpaymentreceipt: IDirectPaymentReceipt) {
        axios.post(`http://localhost:8080/paymentreceipt/createDirectPaymentReceipt?paymenttransactionid=${paymenttransactionid}`, {

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
             
          }, */
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
                    orderedProducts: directpaymentreceipt.paymenttransaction?.order?.orderedProducts,
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
            });
    }

    return [createDirectPaymentReceipt]

}