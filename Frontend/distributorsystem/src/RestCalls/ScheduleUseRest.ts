import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer } from "./DealerUseRest";
import { IEmployee } from "./EmployeeUseRest";
import dayjs, { Dayjs } from "dayjs";
import { IOrder } from "./OrderUseRest";


export interface IPaymentTransaction {
    paymenttransactionid: number;
    amountdue: number;
    startingdate: string;
    enddate: string;
    installmentnumber: number;
    order: IOrder;
}

export const useRestSchedule = (): [(orderid: number) => void, (paymentransaction: IPaymentTransaction) => void, IOrder | undefined, boolean | undefined] => {

    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState(false);


    function getOrderByID(orderid: number) {
        axios.get(`http://localhost:8080/order/getOrderByID/${orderid}`)
            .then((response) => {
                setOrder(response.data)

                //console.log(response.data);
                //alert("hey!")
                if (response.data !== null) {
                    setIsOrderFound(true);
                    // console.log(true)
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


    function saveSchedule(paymenttransaction: IPaymentTransaction) {
        axios.post('localhost:8080/paymenttransaction/createPaymentTransaction', {
            amountdue: paymenttransaction.amountdue,
            startingdate: paymenttransaction.startingdate,
            enddate: paymenttransaction.enddate,
            installmentnumber: paymenttransaction.installmentnumber,
            order: paymenttransaction.order 
            /* {
                orderid: paymenttransaction.order.orderid,
                distributiondate: paymenttransaction.order.distributiondate,
                penaltyrate: paymenttransaction.order.penaltyrate,
                paymentterms: paymenttransaction.order.paymentterms,
                orderdate: paymenttransaction.order.orderdate,
                orderedProducts: paymenttransaction.order.orderedProducts,
                dealer: paymenttransaction.order.dealer,
                /* {
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
                collector: paymenttransaction.order.collector
            } */
            })
            .then((response) => {
               // setOrder(response.data)
               alert("hey hey")

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
                console.error('Cannot find Order:', error);
                alert("Cannot find Order. Please try again.");
            });
    }


    return [getOrderByID, saveSchedule, order, isOrderFound]
}
