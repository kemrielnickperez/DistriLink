import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box, TablePagination, Autocomplete, AutocompleteRenderInputParams, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
//import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { IEmployee, IOrder, IPaymentReceipt, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { error } from "console";
import { ToastContainer } from "react-toastify";

const StyledTableRow = styled(TableRow)({
    borderBottom: "1px #203949 solid",
});
const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginBottom: 50,
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})
const ContentNameTypography2 = styled(Typography)({
    marginTop: 60,
    marginBottom: 30,
    marginLeft: '5%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})


const StackStyle = styled(Stack)({
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 525,
    left: '32%'
})
const StyleLabel = styled(Typography)({
    textAlign: 'left',
    fontWeight: '550',
    marginLeft: 180,
    marginTop: 20,
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
    left: 35,
    top: 20,
})
const LabelTypography = styled(Typography)({
    marginLeft: '30%',
    top: '200px',
    fontFamily: 'Inter',
    fontWeight: '550',
    textAlign: 'center',
    fontSize: '17px',
    color: '#203949'
})
const StyleTextField = styled(TextField)({
    top: -15,
    left: 35,
    '& input':
    {
        textAlign: 'left',
        padding: '12px 12px'
    },

    [`& fieldset`]: {
        borderRadius: 50,
        height: 50,
        width: 400,
    }
})
const StyleTextField2 = styled(TextField)({
    top: 25,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
    }
})
const StyleTextField3 = styled(TextField)({
    top: 15,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
        top: 5
    }
})


const SearchButton = styled(IconButton)({
    backgroundColor: "#2d85e7",
    top: -15,
    left: 185,
    height: 47,
    width: 50,
    borderRadius: "0 50% 50% 0",
    '&:hover': {
        backgroundColor: "#2d85e7"
    }
})
const StyledButton = styled(Button)({
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    backgroundColor: '#2C85E7',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '15px',
    width: '240px',
    height: 50,
    ':hover': {
        backgroundColor: '#87BAF3',
    }
})
const StyledPaymentTransactionCard = styled(Card)({
    borderRadius: "22px",
    borderColor: 'black',
    border: '20px',
    width: '85%',
    padding: '10px 10px 10px 0px',
    margin: '28px 28% 20px 10%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
});
const StyledDatePicker = styled(DatePicker)({
    // marginBottom:'43px',
    width: '75%',
    left: 147,
    top: 25,
    input: {
        color: '#707070',
        fontFamily: 'Inter',
        marginBottom: -5,
        marginTop: -10,
    },
    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        // width: '90%',
    }
});
const TableCellStyle = styled(TableCell)({
    fontWeight: '490',
    color: '#707070'
});

export default function RecordDirectPayment() {
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction] = useRestPaymentTransaction();
    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus,updateOrder, closedOrder] = useRestOrder();
    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedPaymentTransaction, setSelectedPaymentTransaction] = useState<IPaymentTransaction | null>();
    const [selectedpaymentTransactionID, setPaymentTransactionID] = useState('')
    const orderIDRef = useRef<TextFieldProps>(null);
    const paymentTransactionIDRef = useRef<TextFieldProps>(null)
    const amountPaidRef = useRef<TextFieldProps>(null);
    const remarksRef = useRef<TextFieldProps>(null);

    const [minDate, setMinDate] = useState<Dayjs | null>(null);

    {/** functions */ }

    const handleFindOrder = () => {
        getOrderByID(orderIDRef.current?.value + '');

    };

    /* const checkAndCloseOrder = (order: IOrder|undefined) => {
        // Check if all payment transactions are paid
        const allPaid = order?.paymenttransactions?.every((transaction) => transaction.paid);
      
        if (allPaid) {
          // Call the orderClosed function
          closedOrder(order!.orderid);
        } else {
          // Handle the case where not all payment transactions are paid
          // You can display a message or perform other actions here
          console.log('Not all payment transactions are paid.');
        }
      }; */

      const cashierObject : IEmployee = {
        employeeid: "2386f1b2",
        firstname: "Victoria",
        middlename: "I",
        lastname: "Ramirez",
        emailaddress: "charmaineramirez05@gmail.com",
        password: "test",
        birthdate: "2005-11-05",
        gender: "female",
        currentaddress: "2079 Humay-Humay Street",
        permanentaddress: "Pajo",
        contactnumber: "+639158523587",
        tinnumber: '',
        is_cashier: true,
        is_salesassociate: true,
        is_collector: true,
        submissiondate: "2023-11-07",
        distributor: {
            distributorid: "distributor9",
            firstname: "Min Gyu",
            middlename: "",
            lastname: "Kim",
            emailaddress: "capstone.distrilink@gmail.com",
            password: "doggo",
            birthdate: "1997-04-06",
            gender: "Male",
            currentaddress: "Mabolo, Cebu",
            permanentaddress: "Cebu City",
            contactnumber: "09741258963",
            dealerids: [],
            employeeids: [
                "2386f1b2"
            ],
            orderids: []
        },
        orderids: [],
        paymentreceiptids: [],
        collectionpaymentids: [],
        documentids: [
            "54219fa2"
        ]
    
      }

    const handleSaveDirectPayment = () => {
        const uuid = uuidv4();
        const paymentreceiptuuid = uuid.slice(0, 8);
        console.log(paymentreceiptuuid);
        createDirectPaymentReceipt({
            paymentreceiptid: paymentreceiptuuid,
            remarks: remarksRef.current?.value + "",
            datepaid: selectedDate?.format('YYYY-MM-DD') || '',
            amountpaid: Number(amountPaidRef.current?.value),
            receivedamount: Number(amountPaidRef.current?.value),
            paymenttype: 'direct',
            daterecorded: moment().format('YYYY-MM-DD'),
            cashier: cashierObject,
            paymenttransaction: selectedPaymentTransaction!
        })
        const allPaid = order?.paymenttransactions?.every((transaction) => transaction.paid);
        if (allPaid) {
            // Call the orderClosed function
            closedOrder(order!.orderid);
          } 
    
    }

    const sortedPaymemtTransactions = order?.paymenttransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);


    useEffect(() => {

        if (orderIDRef.current?.value + '' !== '') {
            handleFindOrder();
        }
        const allPaid = order?.paymenttransactions?.every((transaction) => transaction.paid);
        if (allPaid) {
            // Call the orderClosed function
            closedOrder(order!.orderid);
          } 

        setMinDate(dayjs() as Dayjs);

    }, [isOrderFound, order, order?.paymenttransactions, sortedPaymemtTransactions]);


    return (
        <div>
            <ContentNameTypography>Record Direct Payment</ContentNameTypography>
            {/* <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader> */}
            {/* set style left manually here in stack */}
            {/* <StackStyle sx={{left:'12%'}}>
                <StyleLabel>Receipt ID</StyleLabel>
                <StyleData>hjasg77</StyleData>
            </StackStyle> */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <LabelTypography>Enter Order Transaction ID</LabelTypography>
                <StyleTextField inputRef={orderIDRef} />
                <SearchButton type="button" aria-label="search" onClick={handleFindOrder}>
                    <SearchIcon sx={{ color: "white" }} />
                </SearchButton>

            </div>
            {order?.paymenttransactions?.length !== 0 ? (

                <StyledPaymentTransactionCard>
                    <TableContainer sx={{ borderRadius: '22px' }}>
                        <ContentNameTypography2>Payment Transactions</ContentNameTypography2>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCellStyle align="center">Payment Transaction ID</TableCellStyle>
                                    <TableCellStyle align="center">Installment Number</TableCellStyle>
                                    <TableCellStyle align="center">Payment Due Date</TableCellStyle>
                                    <TableCellStyle align="center"> Amount Due</TableCellStyle>
                                    <TableCellStyle align="center"> Status</TableCellStyle>
                                    {/* <TableCellStyle align="center">Payment Type</TableCellStyle>
                                    <TableCellStyle align="center">Remarks</TableCellStyle> */}
                                    {/* <TableCellStyle align="center">New Balance</TableCellStyle>  */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedPaymemtTransactions?.map((transaction) => (
                                    <StyledTableRow key={transaction.paymenttransactionid}>
                                        <TableCell component="th" scope="row" align="center">{transaction.paymenttransactionid}</TableCell>
                                        <TableCell component="th" scope="row" align="center">{transaction.installmentnumber}</TableCell>
                                        {/* <TableCell align="center">{transaction.installmentnumber}</TableCell>  */}
                                        {/* <TableCell component="th" scope="row" align="center">{transaction.startingdate}</TableCell> */}
                                        <TableCell align="center">{transaction.enddate}</TableCell>
                                        <TableCell align="center">{transaction.amountdue.toFixed(2)}</TableCell>
                                        <TableCell align="center">
                                            <span style={{ color: transaction.paid ? 'green' : 'red' }}>
                                                {transaction.paid ? 'Paid' : 'Not Paid'}
                                            </span>
                                        </TableCell>
                                        {/* <TableCell align="center">{paymentReceipt?.paymenttype}</TableCell>
                                        <TableCell align="center">{paymentReceipt?.remarks}</TableCell>  */}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledPaymentTransactionCard>
            ) : (
                <div>
                    <h2 style={{ color: '#707070', marginTop: '50px' }}> no schedules yet</h2>

                </div>

            )
            }

            <Grid container>
                <Grid item><StyleLabel>Payment Transaction ID</StyleLabel>

                     <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={order?.paymenttransactions!}
                        getOptionLabel={(option) => option.paymenttransactionid}
                        isOptionEqualToValue={(option, value) => option.paymenttransactionid === value.paymenttransactionid}
                        value={selectedPaymentTransaction}
                        onChange={(event, newValue) => {
                            setSelectedPaymentTransaction(newValue);
                        }}
                        filterOptions={(options, state) => {
                            // Filter out "Paid" transactions from the options
                            return options.filter((option) => !option.paid);
                        }}
                        // Style for the Autocomplete (Combo Box)
                        sx={{
                            marginTop: 2,
                            marginRight: 15,
                        }}
                        // Style for the TextField (Input)
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                    sx: {
                                        [`& fieldset`]: {
                                            borderRadius: 15,
                                            height: 40,
                                            width: 220,
                                            top: 4.5,
                                            right: -250,
                                        },
                                        left: 180,
                                    },
                                }}
                                variant="outlined"
                            />
                        )}
                    /> 


                    {/* </StyleTextField3> */}
                </Grid>
                <Grid item>
                    <StyleLabel top={1}>Date Paid</StyleLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatePicker
                            slotProps={{
                                textField: {
                                    variant: 'outlined',
                                }
                            }}
                            value={selectedDate}
                            minDate={minDate}
                            onChange={(date) => setSelectedDate(date as Dayjs | null)} />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <StyleLabel>Amount Paid</StyleLabel>
                    <StyleTextField2 style={{ marginLeft: 63 }} inputRef={amountPaidRef} />
                </Grid>
                <Grid item><StyleLabel>Remarks</StyleLabel>
                    <StyleTextField2 style={{ marginLeft: 63 }} inputRef={remarksRef} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                </Grid>
            </Grid>
            <StyledButton onClick={handleSaveDirectPayment}>Save Payment Record</StyledButton>
            {/* <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader> */}
            {/* set style left and top manually here in stack */}
            {/* Alerts */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                limit={3}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ width: 450 }}
                theme="colored"
            />

        </div>
    );

}
