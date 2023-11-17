import { Alert, AlertTitle, Button, Grid, Paper, Slide, SlideProps, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { IOrder, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { OrderDetailsPrint } from "./OrderDetailsPrint";
import axios from "axios";

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '12%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
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
    marginLeft: '15%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '190px',
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


const StyledPrintDiv = styled('div')({

    '& Button': {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Inter',
        width: '50px',
        height: 40,
        marginLeft: 20,
        ':hover': {
            backgroundColor: '#2C85E7',
            transform: 'scale(1.1)'
        },
        transition: 'all 0.4s',
    },

    // Print-specific styles using the @media print query
    '@media print': {

        '@page': {
            size: 'landscape',
        },
    },
});

export function OrderDetails() {
    const { objectId } = useParams();

    const [paymentTransactions, setPaymentTransactions] = useState<IPaymentTransaction[]>();


    const [openAlert, setOpenAlert] = useState(false);

    const [alerttitle, setTitle] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const [alertSeverity, setAlertSeverity] = useState('success');



    const navigate = useNavigate();

    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction] = useRestPaymentTransaction();
    const [paymentTransactionsObjects, setPaymentTransactionsObjects] = useState<IPaymentTransaction[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    {/**Handler for Alert - Function to define the type of alert*/ }
    function headerHandleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
        setTitle(title);
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpenAlert(true);
    }

    {/**Handler to Close Alert Snackbar*/ }
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const getAllPaymentTransactionsByOrderID = () => {
        axios.get(`http://localhost:8080/paymenttransaction/getAllPaymentTransactionsByOrderID/${objectId}`)
            .then((response) => {
             
                setPaymentTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    //sorting the payment transactions
    const sortedPaymemtTransactions = paymentTransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);


    
    {/*Handlers*/ }
    const handleFindValue = () => {
        try {
            getOrderByID(objectId!);
            getAllPaymentTransactionsByOrderID();
        } catch (error) {
            headerHandleAlert('Error', "Failed to retrieve order data. Please try again.", 'error');
        }
    };

    



     useEffect(() => {

         
        handleFindValue();
       
        setIsMounted(true); // Set the component as mounted when it renders

      /*   // Only make the GET request if the component is mounted
        if (isMounted) {
         
        }
        return () => {
            setIsMounted(false);
        }; */

    },
        [isOrderFound, order, paymentTransactionsObjects]);


    const handleH2Click = () => {
        console.log(order?.orderid)
        navigate(`/schedules/${order?.orderid}`);
    }

    const [printing, setPrinting] = useState(false);

    const handlePrint = () => {

        const printSettings = {
            scale: 0.7, // Set the scale to 70%
            orientation: 'landscape', // Set the orientation to landscape
        };


        setPrinting(true);
        setTimeout(() => {
            window.print();
            setPrinting(false);
        }, 10); // Add a delay to ensure rendering before printing (optional)
    };


    return (
        <div>
            {!printing ? (

                <div>
                    <StyledPrintDiv>
                        < ContentNameTypography > Order Transaction Details
                            < Button variant="outlined" onClick={handlePrint} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                </svg></Button >
                        </ContentNameTypography >
                    </StyledPrintDiv>


                    <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader>
                    {/* set style left manually here in stack */}
                    <StackStyle sx={{ left: '15%' }}>
                        <StyleLabel>Dealer Name</StyleLabel>
                        <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '33%' }}>
                        <StyleLabel>Dealer ID</StyleLabel>
                        <StyleData>{order?.dealer.dealerid}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '45%' }}>
                        <StyleLabel>Email Address</StyleLabel>
                        <StyleData>johndoe@gmail.com</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '59%' }}>
                        <StyleLabel>Contact Number</StyleLabel>
                        <StyleData>{order?.dealer.contactnumber}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '72%' }}>
                        <StyleLabel>Address</StyleLabel>
                        <StyleData>{order?.dealer.currentaddress}</StyleData>
                    </StackStyle>
                    <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader>
                    {/* set style left and top manually here in stack */}
                    <StackStyle sx={{ left: '15%', top: '350px' }}>
                        <StyleLabel>Order Transaction ID</StyleLabel>
                        <StyleData>{order?.orderid}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '33%', top: '350px' }}>
                        <StyleLabel>Order Transaction Date</StyleLabel>
                        <StyleData>{order?.orderdate}</StyleData>
                    </StackStyle>
                    <StackStyle sx={{ left: '50%', top: '350px' }}>
                        <StyleLabel>Total Ordered Amount</StyleLabel>
                        <StyleData>{order?.orderamount}</StyleData>
                    </StackStyle>

                    {/* Payment Transaction Information */}
                    <StyldeInfoHeader>Payment Transaction Information</StyldeInfoHeader>
                    {paymentTransactions?.length !== 0 ? (
                        <div>
                            <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '-5% 0px 50px 12%' }}>
                                <TableContainer >
                                    <Table aria-label='simple table' >
                                        <TableHead>
                                            <TableRow>
                                                <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                                <TableHeaderCell align="center">Installment Number</TableHeaderCell>
                                                <TableHeaderCell align="center">Starting Date</TableHeaderCell>
                                                <TableHeaderCell align="center">Ending Date</TableHeaderCell>
                                                <TableHeaderCell align="center">Amount Due</TableHeaderCell>
                                                <TableHeaderCell align="center">Status</TableHeaderCell>
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
                                                            <Typography >{dayjs(transaction.startingdate).format('MM/DD/YYYY')}</Typography>
                                                        </LocalizationProvider>
                                                    </TableCell>


                                                    <TableCell align="center">
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <Typography >{dayjs(transaction.enddate).format('MM/DD/YYYY')}</Typography>
                                                        </LocalizationProvider>
                                                    </TableCell>

                                                    <TableCell align='center'>

                                                        {transaction.amountdue.toFixed(2)}

                                                    </TableCell>

                                                    <TableCell align="center">
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

                                
                                 {/* Alerts */}              
                                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }} TransitionComponent={SlideTransitionDown}>
                                    <Alert onClose={handleCloseAlert} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                                        <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                                        {alertMessage}
                                    </Alert>
                                </Snackbar>
                            </Paper>

                            <h2 style={{ color: 'grey', marginTop: '50px', textDecoration: 'underline black 2px', fontStyle: 'italic' }} onClick={() => handleH2Click()}> Edit Payment Transaction in the Scheduling Page. </h2>

                        </div>

                    ) : (
                        <div>
                            <h2 style={{ color: 'grey', marginTop: '50px', textDecoration: 'underline black 2px', fontStyle: 'italic' }} onClick={() => handleH2Click()}> No schedules yet. Set Payment Transaction in the Scheduling Page. </h2>
                        </div>

                    )

                    }



                </div>
            ) : (
                <OrderDetailsPrint order={order!} paymentTransactions={paymentTransactions!} />
            )}
        </div>

    );

}