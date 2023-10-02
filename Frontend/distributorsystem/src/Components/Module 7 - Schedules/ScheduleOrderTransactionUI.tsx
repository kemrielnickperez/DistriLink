import NavBar from "../../Global Components/NavBar";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, TextField, InputAdornment, TableContainer, Table, TableHead, Paper, TableRow, TableCell, TableBody, Box, IconButton, Grid, Stack, TextFieldProps } from '@mui/material';
import styled from "@emotion/styled";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { format } from 'date-fns';
import { IOrder, IPaymentTransaction } from "../../RestCalls/Interfaces";
import moment from "moment";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { v4 as uuidv4 } from 'uuid';



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

const StyledBottomButton = styled(Button)({
    position: 'relative',
    top: '30px', // Adjust this value as needed
    padding: 5,
    minHeight: 0,
    minWidth: 200,
    borderRadius: "22px",
    backgroundColor: '#AFD3E2',
    fontSize: '14px',
    color: '#146C94',
    textTransform: "none",
    fontWeight: "bold",
    width: 'fit-content',
    fontFamily: "Inter', sans-serif",
    marginLeft: "80px",
    marginTop: '50px',

});

const StyledTextField = styled(TextField)({
    borderRadius: "22px", input: {
        padding: "10px", color: "black"
    },
    width: '200px',

});

const StyledCard = styled(Card)({
    borderRadius: "20px",
    padding: 1,
    width: 700,
    height: 50,
    position: "relative",
    marginLeft: "350px",
    marginTop: "25px"
});

const StyledOrderTransactionCard = styled(Card)({
    borderRadius: "20px",
    padding: 1,
    width: 1000,
    height: 150,
    position: "relative",
    marginLeft: "200px",
    marginTop: "10px"
});

const StyledPaymentTransactionCard = styled(Card)({
    borderRadius: "20px",
    padding: 1,
    width: 1000,
    height: 300,
    position: "relative",
    marginLeft: "200px",
    marginTop: "10px"
});

const StyledTypography = styled(Typography)({
    fontSize: 15,
    color: "#146C94",
    fontWeight: "bold"
});

const StyledOrderTypography = styled(Typography)({
    fontSize: 12,
    color: "#146C94",
    fontWeight: "bold"
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#AFD3E2'
});

const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#146C94",
    fontWeight: "bold"
});





export default function Schedules() {


    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>();
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>();
    const [startDateModified, setStartDateModified] = useState(false);
    const [endDateModified, setEndDateModified] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const [paymentTransactionsObjects, setPaymentTransactionsObjects] = useState<IPaymentTransaction[]>([]);
    const orderIDRef = useRef<TextFieldProps>(null)

    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction] = useRestPaymentTransaction();
    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();


    //sorting the payment transactions
    const sortedPaymemtTransactions = order?.paymenttransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);


    const handleFindOrder = () => {
        getOrderByID(orderIDRef.current?.value + "")
        //console.log(isOrderFoundError + "error")
        if (isOrderFound === false)
            alert("Order not found. Please try again.");


    };

    const handleCreatePaymentTransaction = () => {
        const newPaymentTransactions: IPaymentTransaction[] = [];

        for (let i = 1; i <= order!.paymentterms; i++) {
            const uuid = uuidv4();
            const paymenttransactionuuid = uuid.slice(0, 8);

            const newPaymentTransaction = {
                paymenttransactionid: paymenttransactionuuid,
                amountdue: order!.orderamount / order!.paymentterms,
                startingdate: "",
                enddate: "",
                installmentnumber: i,
                paid: false,
                orderid: order!.orderid,
                paymentreceiptid: null,
            };

            newPaymentTransactions.push(newPaymentTransaction);
        }

        // After the loop is complete, update the state once with a callback.
        setPaymentTransactionsObjects((paymentTransactionsObjects) => {
            const updatedPaymentTransactions = [
                ...paymentTransactionsObjects,
                ...newPaymentTransactions,
            ];

            // Call createPaymentTransaction with the updated array.
            createPaymentTransaction(updatedPaymentTransactions, order!.orderid);

            return updatedPaymentTransactions;
        });
    };



    const handleStartDateUpdate = (newValue: Dayjs | null): void => {

        setSelectedStartDate(newValue);
        setStartDateModified(true);
    };

    const handleEndDateUpdate = (newValue: Dayjs | null): void => {

        setSelectedEndDate(newValue);
        setEndDateModified(true);
    };


    const handleSaveClick = (transaction: IPaymentTransaction) => {

        const startingDateFromDB = dayjs(transaction.startingdate);
        const endDateFromDB = dayjs(transaction.enddate);

        const updatedStartingDate = startDateModified ? selectedStartDate : startingDateFromDB;
        const updatedEndDate = endDateModified ? selectedEndDate : endDateFromDB;


        if (updatedStartingDate?.toString() === 'Invalid Date') {
            alert('Please select a start date.');
            return;
        }

        if (updatedEndDate?.toString() === 'Invalid Date') {
            alert('Please select an end date.');
            return;
        }

        setStartDateModified(false);
        setEndDateModified(false);



    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Set the component as mounted when it renders

        // Only make the GET request if the component is mounted
        if (isMounted) {

            handleFindOrder();
        }
        return () => {
            setIsMounted(false);
        };

    },
        [isOrderFound, order, paymentTransactionsObjects]);


    //put a snackbar on latur nalang sa pag notify nga wlaa ga na order/order not found
    return (
        <div>

            <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '50px' }}>
                <Grid item container sx={{ backgroundColor: 'white', width: '1000px', borderRadius: '22px', }} justifyContent={"center"}  >
                    <Grid item xs={4}>
                        <Typography sx={{ color: "#146C94", transform: 'translateY(-50%)', fontFamily: 'Inter, sans - serif', }}>Search Order Transaction ID</Typography>
                    </Grid>
                    <Grid item>
                        <Paper sx={{ backgroundColor: '#AFD3E2', borderRadius: "22px", height: "fit-content", transform: 'translateY(-50%)' }}>
                            <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={orderIDRef}

                            />
                            <IconButton type="button" aria-label="search" onClick={handleFindOrder}>
                                <SearchIcon />
                            </IconButton>

                        </Paper>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
                <Grid item >

                    <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", height: "200px", justifyContent: 'center', display: 'flex', alignItems: 'center', position: 'relative', width: '1200px' }}>

                        <Typography sx={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter, sans - serif', fontWeight: 'bold', fontSize: '30px', color: "#146C94" }}>Order Transaction Details</Typography>

                        <TableContainer>
                            <Table aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell align="center">Order Transaction ID</TableHeaderCell>
                                        <TableHeaderCell align="center">Dealer Name</TableHeaderCell>
                                        <TableHeaderCell align="center">Distribution Date</TableHeaderCell>
                                        <TableHeaderCell align="center">Payment Terms</TableHeaderCell>
                                        <TableHeaderCell align="center">Total Ordered Amount</TableHeaderCell>
                                        <TableHeaderCell align="center">Penalty Rate</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'>{order?.orderid}</TableCell>
                                        <TableCell align='center'>{order?.dealer!.firstname}  {order?.dealer!.lastname}</TableCell>
                                        <TableCell align='center'>{order?.distributiondate}</TableCell>
                                        <TableCell align='center'>{order?.paymentterms} Gives </TableCell>
                                        <TableCell align='center'>{order?.orderamount}</TableCell>
                                        <TableCell align='center'>{order?.penaltyrate}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {order?.paymenttransactions?.length !== 0 ? (
                <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '50px' }}>
                    <Grid item >
                        <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TableContainer >
                                <Table aria-label='simple table' >
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                            <TableHeaderCell align="center">Installment Number</TableHeaderCell>
                                            <TableHeaderCell align="center">Starting Date</TableHeaderCell>
                                            <TableHeaderCell align="center">Ending Date</TableHeaderCell>
                                            <TableHeaderCell align="center">Amount Due</TableHeaderCell>
                                            <TableHeaderCell align="center"></TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {sortedPaymemtTransactions?.map((transaction, index) => (
                                            <TableRow key={transaction.paymenttransactionid}>
                                                <TableCell align="center">
                                                    {transaction.paymenttransactionid}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {transaction.installmentnumber}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        disableUnderline: true
                                                                    },
                                                                    variant: "standard",
                                                                    style: { width: '50%', padding: '0 10px 0 10px' }
                                                                }
                                                            }}
                                                            value={dayjs(transaction.startingdate)}
                                                            onChange={(e) => handleStartDateUpdate(e!)}


                                                        />
                                                    </LocalizationProvider>
                                                </TableCell>


                                                <TableCell align="center">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        disableUnderline: true
                                                                    },
                                                                    // Set the variant to "standard"
                                                                    variant: "standard",
                                                                    style: { width: '50%', padding: '0 10px 0 10px' }

                                                                }
                                                            }}
                                                            value={dayjs(transaction.enddate)}
                                                            onChange={(e) => handleEndDateUpdate(e!)}

                                                        />

                                                    </LocalizationProvider>
                                                </TableCell>

                                                <TableCell>

                                                    {transaction.amountdue.toFixed(2)}

                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => handleSaveClick(transaction)}
                                                    > Update </Button>
                                                </TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                        <Grid>

                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div>
                    <h2 style={{ color: 'white', marginTop: '50px' }}> no schedules yet</h2>
                    <StyledButton onClick={
                        handleCreatePaymentTransaction
                    }> Create Schedules </StyledButton>


                </div>

            )

            }
        </div>
    );
}