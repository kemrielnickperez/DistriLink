import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box, TablePagination, Autocomplete, AutocompleteRenderInputParams, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
//import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { IEmployee, IPaymentReceipt, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { error } from "console";

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
    marginBottom:40,
    marginLeft: 20,
    backgroundColor: '#2C85E7',
    color:'#ffffff',
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
    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();
    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
   
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedPaymentTransaction, setSelectedPaymentTransaction] = useState<IPaymentTransaction | null>();
    const [selectedpaymentTransactionID, setPaymentTransactionID] = useState('')
    const orderIDRef = useRef<TextFieldProps>(null);
    const paymentTransactionIDRef = useRef<TextFieldProps>(null)
    const amountPaidRef = useRef<TextFieldProps>(null);
    const remarksRef = useRef<TextFieldProps>(null);

    {/** functions */ }

    const handleFindOrder = () => {
        getOrderByID(orderIDRef.current?.value + '');
    };


    const handleSaveDirectPayment = () => {
        const uuid = uuidv4();
        const paymentreceiptuuid = uuid.slice(0, 8);
        createDirectPaymentReceipt(selectedPaymentTransaction + '', {
            paymentreceiptid: paymentreceiptuuid,
            remarks: remarksRef.current?.value + "",
            datepaid: selectedDate?.format('YYYY-MM-DD') || '',
            amountpaid: Number(amountPaidRef.current?.value),
            receivedamount:Number(amountPaidRef.current?.value),
            paymenttype: 'direct',
            daterecorded: moment().format('YYYY-MM-DD'),
            cashier: null,
            paymenttransaction: selectedPaymentTransaction!
        })
    }
    {/** Columns for DataGrid */ }
    // const columns: GridColDef[] = [
    //     { field: 'paymentTransactionID', headerName: 'Payment Transaction ID', width: 200 },
    //     { field: 'paymentDueDate', headerName: 'Payment Due Date', width: 180 },
    //     { field: 'amountDue', headerName: 'Amount Due', width: 160 },
    //     // { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
    //     // { field: 'remarks', headerName: 'Remarks', width: 200 },
    //     // { field: 'newBalance', headerName: 'New Balance', width: 200 },
    // ]
    // {/** Rows for DataGrid */ }

    // let rows = []; 

    // if (order && order!.paymenttransactions!) {
    //     rows = order.paymenttransactions.map((transaction) => {
    //         return {
    //             id: transaction?.paymenttransactionid || '',
    //             paymentTransactionID: transaction?.paymenttransactionid || '',
    //             paymentDueDate: transaction?.enddate || '',
    //             amountDue: transaction?.amountdue || '',
    //             // remarks: transaction?.remarks || '', // Uncomment if remarks is a property of transaction
    //         };
    //     });
    // }
    const sortedPaymemtTransactions = order?.paymenttransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);


    useEffect(() => {
        handleFindOrder();
        // handleFindPaymentTransaction();
        console.log(order?.paymenttransactions)
    },
        [isOrderFound, order]);


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
                                    <TableCellStyle align="center"> Amount Paid</TableCellStyle>
                                    <TableCellStyle align="center">Payment Type</TableCellStyle>
                                    <TableCellStyle align="center">Remarks</TableCellStyle>
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
                                        <TableCell align="center">{transaction.amountdue}</TableCell>
                                        <TableCell align="center">{paymentReceipt?.amountpaid}</TableCell>
                                        <TableCell align="center">{paymentReceipt?.paymenttype}</TableCell>
                                        <TableCell align="center">{paymentReceipt?.remarks}</TableCell> 
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
                    {/* <StyleTextField3
                     variant="outlined"
                     select
                     value={selectedPaymentTransaction}
                     style={{width:230}}
                     onChange={(newValue) => {
                        setPaymentTransactionID(newValue+''); 
                    }}
                     SelectProps={{
                        native: true,
                    }}
                    
                    > 
                     {order?.paymenttransactions!.map((option)=>(
                        <MenuItem key={option.paymenttransactionid}
                        value={option.paymenttransactionid} 
                        style={{marginLeft:'200px'}}>
                            {option.paymenttransactionid}
                        </MenuItem>
                     ))} */}
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
                        // Style for the Autocomplete(Combo Box - Separated from global styling due to error )   
                         sx={{
                          marginTop:2,
                          marginRight:15
                         }}
                        // Style for the TextField(Input - Separated from global styling due to error )  
                        renderInput={
                            (params) =>
                                <TextField {...params}
                                    InputProps={{
                                        ...params.InputProps, disableUnderline: true,
                                        sx: {
                                            [`& fieldset`]: {
                                                borderRadius: 15,
                                                height: 40,
                                                width:220,
                                                top: 4.5,
                                                right:-250
                                               
                                            },
                                            left:180
                                        }
                                        // style: {
                                        //     width: 220,
                                            
                                        // }
                                    }}
                                    variant="outlined"
                                />}
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
                        onChange={(date)=>setSelectedDate(date as Dayjs | null)} />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <StyleLabel>Amount Paid</StyleLabel>
                    <StyleTextField2 style={{ marginLeft: 63 }} inputRef={amountPaidRef}/>
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


        </div>
    );

}
