import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { IOrder, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: 100,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '17px',
    color: '#203949'
})

const StyledButton = styled(Button)({
    position: "relative",
    padding: 5,
    minHeight: 0,
    minWidth: 100,
    borderRadius: "22px",
    backgroundColor: '#AFD3E2',
    fontSize: '14px',
    color: '#146C94',
    textTransform: "none",
    fontWeight: "bold",
    width: 'fit-content',
    fontFamily: "Inter', sans-serif",
    display: 'inline-block',
});


const StyldeInfoHeader = styled(Typography)({
    marginTop: '35px',
    marginBottom: '130px',
    marginLeft: 120,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '150px',
    // left: '32%'
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

    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: '50px',
    top: '35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
});
const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#146C94",
    fontWeight: "bold",
    fontFamily: 'Inter',
});

const TypographyClick= styled(Typography)({
    color:'#707070',
    cursor:'pointer',
    fontWeight:550, 
    fontSize:17,
    fontFamily: 'Inter',
    textDecoration: 'underline #707070 2px',
    ':hover':{
        color: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})
export function OrderDetailsPrint({ order }: { order: IOrder }) {


    const sortedPaymemtTransactions = order?.paymenttransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);

    return (
        <div>

            {/* <ContentNameTypography>Order Transaction Details</ContentNameTypography> */}
            <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader>
            {/* set style left manually here in stack */}
            <StackStyle sx={{ left: '8%' }}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '28%' }}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{order?.dealer.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '42%' }}>
                <StyleLabel>Email Address</StyleLabel>
                <StyleData>johndoe@gmail.com</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '59%' }}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{order?.dealer.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '76%' }}>
                <StyleLabel>CurrentAddress</StyleLabel>
                <StyleData>{order?.dealer.currentaddress}</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader>
            {/* set style left and top manually here in stack */}
            <StackStyle sx={{ left: '8%', top: '310px' }}>
                <StyleLabel>Order Transaction ID</StyleLabel>
                <StyleData>{order?.orderid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '25%', top: '310px' }}>
                <StyleLabel>Order Transaction Date</StyleLabel>
                <StyleData>{order?.orderdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '42%', top: '310px' }}>
                <StyleLabel>Total Ordered Amount</StyleLabel>
                <StyleData>{order?.orderamount}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '59%', top: '310px' }}>
                <StyleLabel>Penalty Rate %</StyleLabel>
                <StyleData>{order.penaltyrate}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '76%', top: '310px' }}>
                <StyleLabel>Payment Terms</StyleLabel>
                <StyleData>{order?.paymentterms}</StyleData>
            </StackStyle>

            {/* Payment Transaction Information */}
            <StyldeInfoHeader>Payment Transaction Information</StyldeInfoHeader>
            {order?.paymenttransactions?.length !== 0 ? (
            <div>
                <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '-5% 0px 50px 6%' }}>
                    <TableContainer >
                        <Table aria-label='simple table' >
                            <TableHead style={{ backgroundColor: 'rgb(45, 133, 231, 0.08)', }}>
                                <TableRow>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Payment Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Installment Number</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Starting Date</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Ending Date</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Amount Due</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}>Status</TableHeaderCell>
                                    <TableHeaderCell align="center" sx={{ color: '#707070' }}></TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {sortedPaymemtTransactions?.map((transaction, index) => (
                                    <TableRow sx={{ backgroundColor: index % 2 === 0 ? 'inherit' : 'rgb(45, 133, 231, 0.08)' }} key={transaction.paymenttransactionid}>
                                        <TableCell align="center" sx={{ color: "#203949" }}>
                                            {transaction.paymenttransactionid}
                                        </TableCell>

                                        <TableCell align="center" sx={{ color: "#203949" }}>
                                            {transaction.installmentnumber}
                                        </TableCell>


                                        <TableCell align="center" sx={{ color: "#203949" }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Typography >{dayjs(transaction.startingdate).format('MM/DD/YYYY')}</Typography>
                                            </LocalizationProvider>
                                        </TableCell>


                                        <TableCell align="center" sx={{ color: "#203949" }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Typography >{dayjs(transaction.enddate).format('MM/DD/YYYY')}</Typography>
                                            </LocalizationProvider>
                                        </TableCell>

                                        <TableCell align='center' sx={{ color: "#203949" }}>

                                            {transaction.amountdue.toFixed(2)}

                                        </TableCell>

                                        <TableCell align="center" sx={{ color: "#203949" }}>
                                            <span style={{ color: transaction.paid ? 'green' : 'red' }}>
                                                {transaction.paid ? 'Paid' : 'Not Paid'}
                                            </span>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
             ) : (
                <div>
                    {/* <h2 style={{ color: 'grey', marginTop: '50px', textDecoration: 'underline black 2px', fontStyle: 'italic' }} onClick={() => handleH2Click()}> No schedules yet. Set Payment Transaction in the Scheduling Page. </h2> */}
                    <TypographyClick>No schedules yet.</TypographyClick>
                </div>

            )

            }





        </div>
    );

}