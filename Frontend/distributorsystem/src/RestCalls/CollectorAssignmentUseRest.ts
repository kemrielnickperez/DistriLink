import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { IEmployee } from "./EmployeeUseRest";



export const useRest = (): [(orderID: number, collector: IEmployee)=> void, (orderID: number) => void, boolean | undefined,  boolean | undefined] => {

    const [assignedStatus, setAssignedStatus] = useState<boolean>(true);
    const [removeStatus, setRemoveStatus] = useState<boolean>(true);

    function assignCollector(orderID: number, collector: IEmployee) {
        axios.put(`http://localhost:8080/order/assignCollector/${orderID}`, collector)
            .then((response) => {
                console.log(response.data)
                setAssignedStatus(true);
            })
            .catch((error) => {
                setAssignedStatus(false);
                console.error('Error assigning collector:', error);
            });
    }

    function removeCollector(orderID: number) {
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

    return [assignCollector, removeCollector, assignedStatus, removeStatus]
}
