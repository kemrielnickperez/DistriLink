import { Stack, Typography, styled } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";

export function PaymentReceiptDetails(){
    const ContentNameTypography = styled(Typography)({
        marginTop: 60,
       
        marginLeft: '28%',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        textAlign:'left',
        fontSize: '25px',
        color:'#203949'
    })
    
    const StyldeInfoHeader= styled(Typography)({
        marginTop: '35px',
        marginBottom: '130px',
        marginLeft: '30%',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        textAlign:'left',
        fontSize: '20px',
        color:'#203949'
    })
    const StackStyle = styled(Stack)({
        position: 'absolute', 
        top: '190px', 
        //left: '32%'
    })
    const StyleLabel=styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        fontWeight: '550',
        left: '30px',
        color: '#707070',
        fontSize: '15px',
        width:'max-content',
        fontFamily: 'Inter',  
    }) 
    const StyleData=styled(Typography)({
   
        position: 'absolute',
        textAlign: 'left',
        width: 600,
        left: '50px',
        top:'35px',
        color: '#203949',
        fontSize: '15px',
        fontFamily: 'Inter, sans - serif',
    })


    const { objectId } = useParams();

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();


    const handleFindPaymentReceipt = () => {
        getPaymentReceiptByID(objectId!)
        //console.log(isOrderFoundError + "error")


    };

    useEffect(() => {
        handleFindPaymentReceipt();
        console.log(paymentReceipt?.cashier?.birthdate)
    },
        [paymentReceipt]);
        
    return(
        <div>   
            <ContentNameTypography>Order Transaction Details</ContentNameTypography>
            <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader>
            {/* set style left manually here in stack */}
            <StackStyle sx={{left:'30%'}}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>John Doe</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'43%'}}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>A15-X101</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'55%'}}>
                <StyleLabel>Email Address</StyleLabel>
                <StyleData>johndoe@gmail.com</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'69%'}}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>09123456789</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'82%'}}>
                <StyleLabel>Address</StyleLabel>
                <StyleData>306 St. Cypa. Englis V. Rama, Cebu City, Cebu</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader>
            {/* set style left and top manually here in stack */}
            <StackStyle sx={{left:'30%', top:'350px'}}>
                <StyleLabel>Order Transaction ID</StyleLabel>
                <StyleData>45AhZh</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'45%', top:'350px'}}>
                <StyleLabel>Order Transaction Date</StyleLabel>
                <StyleData>11/05/2023</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'60%', top:'350px'}}>
                <StyleLabel>Total Ordered Amount</StyleLabel>
                <StyleData>Php 10,000</StyleData>
            </StackStyle>

        </div>  
    );
    
}