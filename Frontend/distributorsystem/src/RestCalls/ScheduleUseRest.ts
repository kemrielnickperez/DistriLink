import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { IOrder, IPaymentTransaction } from "./Interfaces";





export const useRestSchedule = (): [(orderid: number) => void, (paymentransaction: IPaymentTransaction) => void, (paymentransactionid: number, paymentransaction: IPaymentTransaction) => void, IOrder | undefined, boolean | undefined] => {

    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState<boolean>();


    function getOrderByID(orderid: number) {
        axios.get(`http://localhost:8080/order/getOrderByID/${orderid}`)
            .then((response) => {

                setOrder(response.data)

                 if (response.data !== null) {
                    setIsOrderFound(true);
                }
                else {
                    setIsOrderFound(false);
                }
            })
            .catch((error) => {
                console.error('Cannot find Order:', error);
                alert("Cannot find Order. Please try again.");
            });
    }


    function createSchedule(paymenttransaction: IPaymentTransaction) {
        axios.post('http://localhost:8080/paymenttransaction/createPaymentTransaction', {
            amountdue: paymenttransaction.amountdue.toFixed(2),
            startingdate: paymenttransaction.startingdate,
            enddate: paymenttransaction.enddate,
            installmentnumber: paymenttransaction.installmentnumber,
            order: {
                orderid: paymenttransaction.order.orderid,
                distributiondate: paymenttransaction.order.distributiondate,
                penaltyrate: paymenttransaction.order.penaltyrate,
                paymentterms: paymenttransaction.order.paymentterms,
                orderdate: paymenttransaction.order.orderdate,
                orderedProducts: paymenttransaction.order.orderedProducts,
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
                    iscashier: paymenttransaction.order.collector?.is_cashier,
                    issalesassociate: paymenttransaction.order.collector?.is_salesassociate,
                    iscollector: paymenttransaction.order.collector?.is_collector
                }
            }
        })
            .then((response) => {
                // setOrder(response.data)
               // alert("hey hey")
                //console.log(response.data)

                //console.log(response.data);
                //alert("hey!")
                /*  if (response.data !== null) {
                     setIsOrderFound(true);
                     // console.log(true)
                 }
                 else {
                     setIsOrderFound(false);
                 } */
            })
            .catch((error) => {
                alert("Please try again.");
            });
    }

    function updatePaymentTransaction(paymentransactionid: number, paymentransaction: IPaymentTransaction) {
        axios.put(`http://localhost:8080/paymenttransaction/updatePaymentTransaction/${paymentransactionid}`, paymentransaction)
            .then((response) => {
                
                alert("successfully updated!")
                
            })
            .catch((error) => {
                console.error('Error updating payment transaction:', error);
            });
    }


    return [getOrderByID, createSchedule, updatePaymentTransaction, order, isOrderFound]
}

