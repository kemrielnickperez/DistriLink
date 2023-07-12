import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer } from "./DealerUseRest";
import { IEmployee } from "./EmployeeUseRest";
import dayjs, { Dayjs } from "dayjs";
import { IPaymentTransaction } from "./ScheduleUseRest";



export interface IOrderedProducts {
    product: IProduct;
    quantity: number;

}

export interface IOrder {
    orderid: number,
    distributiondate: string,
    orderdate: string,
    penaltyrate: number,
    paymentterms: number,
    orderamount:number,
    collector: IEmployee | null,
    dealer: IDealer,
    orderedProducts: IOrderedProducts[],
    paymentTransactions: IPaymentTransaction[] | null,
}


export interface IProduct {
    productid: number;
    commissionrate: number;
    name: string;
    price: number;
    unit: string;
}



export const useRest = (): [(order: IOrder) => void,  IOrder | undefined] => {

    const [order, setOrder] = useState<IOrder>();


    //pag create sa ordered products

    function newOrder(order: IOrder) {
        axios.post('http://localhost:8080/order/createOrder', {
            distributiondate: order.distributiondate,
            penaltyrate: order.penaltyrate,
            paymentterms: order.paymentterms,
            orderdate: order.orderdate,
            orderedProducts: order.orderedProducts,
            dealer: {
                dealerid:order.dealer.dealerid,
                firstname: order.dealer.firstname,
                middlename: order.dealer.middlename,
                lastname: order.dealer.lastname,
                birthdate: order.dealer.birthdate,
                gender: order.dealer.gender,
                currentaddress: order.dealer.currentaddress,
                permanentaddress: order.dealer.permanentaddress,
                contactnumber: order.dealer.contactnumber,
                hasbusiness: order.dealer.hasbusiness,
                businessname: order.dealer.businessname,
                businessphone: order.dealer. businessphone,
                businessaddress: order.dealer.businessaddress,
                businesstin: order.dealer.businesstin,
                creditlimit: order.dealer.creditlimit,
                submissiondate: order.dealer.submissiondate,
                attachments: order.dealer.attachments,
            },
            collector: null, 
            paymentTransactions: null,
            
             
 
        })
            .then((response) => {
                console.log(response.data);
                alert("success!");
            })
            .catch((error) => {
                console.error('Error creating a new record:', error);
                alert("Error creating a new record. Please try again.");
            });
    }



    return [newOrder, order]
}
