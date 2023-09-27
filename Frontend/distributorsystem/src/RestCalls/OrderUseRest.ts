import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { IEmployee, IOrder } from "./Interfaces";





export const useRestOrder = (): [(order: IOrder) => void, (orderid: string) => void, (orderID: string, collector: IEmployee) => void, (orderID: string) => void, IOrder | undefined, boolean | undefined, boolean | undefined, boolean | undefined] => {

    const [order, setOrder] = useState<IOrder>();
    const [isOrderFound, setIsOrderFound] = useState<boolean>(true);
    const [isOrderFoundError, setIsOrderFoundError] = useState<boolean>(false);
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
                attachments: order.dealer.attachments,
            },
            collector: null,
            paymenttransactions: [],



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
                if (error.response) {
                    // The request was made, and the server responded with a non-2xx status code
                    let errorMessage = `Error Response Data: ${error.response.data}\nStatus Code: ${error.response.status}`;
              
                    // You can differentiate errors based on the status code
                    if (error.response.status === 400) {
                      errorMessage += '\nBad Request Error';
                    } else if (error.response.status === 401) {
                      errorMessage += '\nUnauthorized Error';
                    }// else if (error.response.status === 404) {
                     // errorMessage += '\nNot Found Error';
                    //}
                     //else {
                    //  errorMessage += '\nOther Error';
                    //}
              
                    // Display the error message in an alert dialog
                    window.alert(errorMessage);
                  } else if (error.request) {
                    // The request was made, but no response was received
                    window.alert('No Response Received');
                  } else {
                    // Something happened in setting up the request that triggered an error
                    window.alert(`Error: ${error.message}`);
                  }
            })
            .finally(() =>{
               // setIsOrderFound(true);
            });
    }


    function assignCollector(orderID: string, collector: IEmployee) {
        console.log(assignedStatus)
          axios.put(`http://localhost:8080/order/assignCollector/${orderID}`, collector)
            .then((response) => {
                setAssignedStatus(true);
            })
            .catch((error) => {
                setAssignedStatus(false);
                console.error('Error assigning collector:', error);
            });  
    }

    function removeCollector(orderID: string) {
        axios.put(`http://localhost:8080/order/removeCollector/${orderID}`)
            .then((response) => {
                setRemoveStatus(true);
            })
            .catch((error) => {
                setRemoveStatus(false);
                console.error('Error removing collector:', error);
                alert("Error removing collector. Please try again.");
            });
    }


    return [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus]
}
