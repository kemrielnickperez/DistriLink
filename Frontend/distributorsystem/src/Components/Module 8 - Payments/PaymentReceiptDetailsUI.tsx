import { Stack, Typography, styled } from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";

export function PaymentReceiptDetails() {
    const ContentNameTypography = styled(Typography)({
        marginTop: 60,
        marginLeft: '10%',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '25px',
        color: '#203949'
    })

    const StyldeInfoHeader = styled(Typography)({
        marginTop: '35px',
        marginBottom: '130px',
        marginLeft: '12%',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '20px',
        color: '#203949'
    })
    const StackStyle = styled(Stack)({
        position: 'absolute',
        top: '150px',
        //left: '32%'
    })
    const StyleLabel = styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        fontWeight: '550',
        left: '30px',
        color: '#707070',
        fontSize: '15px',
        width: 'max-content',
        fontFamily: 'Inter',
    })
    const StyleData = styled(Typography)({
        fontWeight: '550',
        position: 'absolute',
        textAlign: 'left',
        width: 600,
        left: '50px',
        top: '35px',
        color: '#203949',
        fontSize: '15px',
        fontFamily: 'Inter, sans - serif',
    })


    const { objectId } = useParams();

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();


    const handleFindPaymentReceipt = () => {
        getPaymentReceiptByID(objectId!)
        //console.log(isOrderFoundError + "error")
    };


    const handleFindOrder = () => {
        getOrderByID(paymentReceipt?.paymenttransaction.orderid!)
    };


    const handleGets =() =>{
        handleFindPaymentReceipt();
        handleFindOrder();
    }

    useEffect(() => {
        handleGets();
    }, [paymentReceipt, order]);


    return (
        <div>
            <ContentNameTypography>Payment Summary</ContentNameTypography>
            <StackStyle sx={{ left: '12%' }}>
                <StyleLabel>Receipt ID</StyleLabel>
                <StyleData>{paymentReceipt?.paymentreceiptid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '24%' }}>
                <StyleLabel>Payment Transaction ID</StyleLabel>
                <StyleData>{paymentReceipt?.paymenttransaction.paymenttransactionid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '42%' }}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{order?.dealer.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '58%' }}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname! + " " + order?.dealer.lastname!}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '72%' }}>
                <StyleLabel>Payment Type</StyleLabel>
                <StyleData>{paymentReceipt?.paymenttype}</StyleData>
            </StackStyle>

            {paymentReceipt && paymentReceipt?.paymenttype === 'direct' ? (
                <div>

                    <StackStyle sx={{ top: '40%', left: '12%' }}>
                        <StyleLabel>Date Paid</StyleLabel>
                        <StyleData>{new Date(directPaymentReceipt?.datepaid!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '26%' }}>
                        <StyleLabel>Amount Collected</StyleLabel>
                        <StyleData>{directPaymentReceipt?.amountpaid}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '44%' }}>
                        <StyleLabel>Receiver Name</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.confirmed ? paymentReceipt?.cashier?.firstname + " " + paymentReceipt?.cashier?.lastname
                : ''} </StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '60%' }}>
                        <StyleLabel>Remarks</StyleLabel>
                        <StyleData>{paymentReceipt?.remarks}</StyleData>
                    </StackStyle>
        
                </div>

            ) : (
                <div>
                    <StackStyle sx={{ top: '40%', left: '12%' }}>
                        <StyleLabel>Date Collected</StyleLabel>
                        <StyleData>{new Date(collectionPaymentReceipt?.collectiondate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '26%' }}>
                        <StyleLabel>Amount Collected</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.collectionamount}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '44%' }}>
                        <StyleLabel>Date Remitted</StyleLabel>
                        <StyleData>{new Date(collectionPaymentReceipt?.remitteddate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '60%' }}>
                        <StyleLabel>Amount Remitted</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.remittedamount}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '40%', left: '74%' }}>
                        <StyleLabel>Collector Name</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.collector.firstname + " " + collectionPaymentReceipt?.collector.lastname}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ top: '60%', left: '12%' }}>
                        <StyleLabel>Payment Status</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.confirmed ? "Confirmed" : "Unconfirmed"}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '60%', left: '27%' }}>
                        <StyleLabel>Date Received</StyleLabel>
                        <StyleData>{new Date(collectionPaymentReceipt?.confirmationdate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '60%', left: '43%' }}>
                        <StyleLabel>Receiver Name</StyleLabel>
                        <StyleData>{collectionPaymentReceipt?.confirmed ? paymentReceipt?.cashier?.firstname + " " + paymentReceipt?.cashier?.lastname
                : ''}</StyleData>
                    </StackStyle>

                    <StackStyle sx={{ top: '60%', left: '60%' }}>
                        <StyleLabel>Remarks</StyleLabel>
                        <StyleData>{paymentReceipt?.remarks}</StyleData>
                    </StackStyle>
                </div>
            )}

        </div>



    );

}