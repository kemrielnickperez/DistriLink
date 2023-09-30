import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRestOrder } from "../../RestCalls/OrderUseRest";

export default function PaymentTransactionDetails() {

    const { objectId } = useParams();

    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();
    const [isMounted, setIsMounted] = useState(false);


    const handleFindOrder = () => {
        getOrderByID(objectId!)
        //console.log(isOrderFoundError + "error")


    };

    useEffect(() => {
        setIsMounted(true); // Set the component as mounted when it renders

        // Only make the GET request if the component is mounted
       
            handleFindOrder();

        return () => {
            setIsMounted(false);
        };

    },
        [isOrderFound, order]);


    return (
        <div>
            <h1 style={{ color: 'black' }}>
                {objectId}
            </h1>
            <button onClick={() => {
                
                console.log({ order });
            }}>
                view
            </button>
        </div>
    )
}


