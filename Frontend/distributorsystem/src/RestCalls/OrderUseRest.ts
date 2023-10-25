import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { IEmployee, IOrder } from "./Interfaces";





export const useRestOrder = (): [
    (order: IOrder) => void,
    (orderid: string) => void,
    (collectorid: string, orderids:string[]) => void,
    (orderID: string) => void,
    IOrder | undefined,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined,
    (orderID: string | undefined, updatedOrder: IOrder) => void] => {

    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState<boolean>(true);
    const [assignedStatus, setAssignedStatus] = useState<boolean>(true);
    const [removeStatus, setRemoveStatus] = useState<boolean>(true);


    function newOrder(order: IOrder) {

        axios.post('http://localhost:8080/order/createOrder', {
            orderid: order.orderid,
            distributiondate: order.distributiondate,
            penaltyrate: order.penaltyrate,
            paymentterms: order.paymentterms,
            orderdate: order.orderdate,
            orderedproducts: order.orderedproducts,
            dealer: {
                dealerid: order.dealer.dealerid,
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
                businessphone: order.dealer.businessphone,
                businessaddress: order.dealer.businessaddress,
                businesstin: order.dealer.businesstin,
                creditlimit: order.dealer.creditlimit,
                submissiondate: order.dealer.submissiondate,

            },
            collector: null,
            paymenttransactions: [],
            confirmed: order.confirmed

        })
            .then((response) => {

                alert("success!");
            })
            .catch((error) => {

                alert("Error creating a new record. Please try again.");
            });
    }

    function updateOrder(orderID: string | undefined, updatedOrder: IOrder) {
        updatedOrder.orderedproducts.map((op) => {
            console.log(op)
        })
        axios.put(`http://localhost:8080/order/updateOrder/${orderID}`, updatedOrder)
            .then((response) => {

                alert("Order updated successfully!");
            })
            .catch((error) => {

                alert("Error updating the order. Please try again.");
            });
    }


    function getOrderByID(orderid: string) {
    
        axios.get(`http://localhost:8080/order/getOrderByID/${orderid}`)
            .then((response) => {

                setOrder(response.data)
                if (response.data !== null) {
                    setIsOrderFound(true);
                    //setIsOrderFoundError(false);

                }
                else {
                    setIsOrderFound(false);

                    //setIsOrderFoundError(false);
                }

            })
            .catch((error) => {

                alert("Error finding the order. Please try again.");
            });
        }
           

/* 
    function assignCollector(orderID: string, collector: IEmployee) {
        axios.put(`http://localhost:8080/order/assignCollector/${orderID}`, collector)
            .then((response) => {
                setAssignedStatus(true);
            })
            .catch((error) => {
                setAssignedStatus(false);
                console.error('Error assigning collector:', error);
            });
    } */
    function assignCollector(collectorid: string, orderids:string[]) {
        axios.put(`http://localhost:8080/order/assignCollector/${collectorid}`, orderids)
            .then((response) => {
                setAssignedStatus(true);
            })
            .catch((error) => {
                setAssignedStatus(false);
                console.error('Error assigning collector to multiple orders:', error);
            });
    }

    function removeCollector(orderID: string) {
        axios.put(`http://localhost:8080/order/removeCollector/${orderID}`)
            .then((response) => {
                setRemoveStatus(true);
            })
            .catch((error) => {
                setRemoveStatus(false);
                alert("Error removing collector. Please try again.");
            });
    }


    return [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus, updateOrder];
}
