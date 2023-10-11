import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
//import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { IEmployee } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,

    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '25px',
    color:'#203949'
})

const StyldeInfoHeader= styled(Typography)({
    marginTop: '35px',
    marginBottom: '130px',
    marginLeft: '12%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '20px',
    color:'#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute', 
    top: '150px', 
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
    fontWeight: '550',
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: '50px',
    top:'35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})

export default function RecordDirectPayment() {
    return(
        <div>   
            <ContentNameTypography>Payment Summary</ContentNameTypography>
            {/* <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader> */}
            {/* set style left manually here in stack */}
            <StackStyle sx={{left:'12%'}}>
                <StyleLabel>Receipt ID</StyleLabel>
                <StyleData>hjasg77</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'24%'}}>
                <StyleLabel>Payment Transaction ID</StyleLabel>
                <StyleData>ba9dd</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'42%'}}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>12E320X</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'58%'}}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>John Doe</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'72%'}}>
                <StyleLabel>Payment Type</StyleLabel>
                <StyleData>Direct</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'40%',left:'12%'}}>
                <StyleLabel>Date Paid</StyleLabel>
                <StyleData>20/04/2023</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'40%', left:'26%'}}>
                <StyleLabel>Amount Paid</StyleLabel>
                <StyleData>Php 10,000.00</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'40%',left:'44%'}}>
                <StyleLabel>Remarks</StyleLabel>
                <StyleData>None</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'40%',left:'60%'}}>
                <StyleLabel>Payment Status</StyleLabel>
                <StyleData>Confirmed</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'40%',left:'74%'}}>
                <StyleLabel>Date Received</StyleLabel>
                <StyleData>20/04/2023</StyleData>
            </StackStyle>
            <StackStyle sx={{top:'60%',left:'12%'}}>
                <StyleLabel>Receiver Name</StyleLabel>
                <StyleData>Charmaine Igot</StyleData>
            </StackStyle>
            {/* <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader> */}
            {/* set style left and top manually here in stack */}
            

        </div>  
    );

}
 