import { Alert, AlertTitle, Box, Button, Grid, LinearProgress, Paper, Slide, SlideProps, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
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
import logo5 from '../../Global Components/Images/logo5.png';

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const ContentNameTypography = styled(Typography)({
    marginTop: 40,
    marginLeft: -620,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949',
    '@media(max-width:900px)': {
        fontSize: '17px',
        marginLeft: -12,
    },

})
const TypographyClick = styled(Typography)({
    color: '#707070',
    marginTop: '140px',
    cursor: 'pointer',
    fontWeight: 550,
    fontSize: 20,
    fontFamily: 'Inter',
    textDecoration: 'underline #707070 2px',
    ':hover': {
        color: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})
const PaperStyle = styled(Paper)({
    // background: 'linear'
    background: 'linear-gradient(50deg, rgba(255,255,255,0.4) 12%,rgba(255,255,255,0.1) 77% )',
    backgroundBlendMode: '',
    // backgroundColor:'rgb(245, 247, 249,0.4)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: '0 3px 3px 1px rgba(0,0,0,0.28)',
    borderRadius: "10px",
    backgroundColor: '#ffffff',
    width: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    margin: '100px 200px 0px 8.7%'
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
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#203949'
})

const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '190px',
    //left: '32%'
})
const StyleLabel = styled(Typography)({
    // position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    // left: '165px',
    paddingTop: 80,
    marginLeft: 195,
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleLabelData = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    paddingTop: 70,
    marginLeft: -870,
    color: '#203949',
    fontSize: '20px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
    textAlign: 'left',
    width: 250,
    marginLeft: 210,
    marginTop: 10,
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})
const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#146C94",
    fontWeight: "bold",
    fontFamily: 'Inter',
});


const StyledPrintDiv = styled('div')({
    paddingTop: 40,
    marginLeft: -500,
    '& Button': {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Inter',
        width: '50px',
        height: 40,
        marginLeft: 10,
        ':hover': {
            backgroundColor: '#2C85E7',
            transform: 'scale(1.1)'
        },
        transition: 'all 0.4s',
        '@media(max-width:900px)': {
            height: 40,
            marginLeft: 350,
        },
    },

    // Print-specific styles using the @media print query
    '@media print': {

        '@page': {
            size: 'landscape',
        },
    },
});

export function OrderDetails() {
    const navigate = useNavigate();
    const { objectId } = useParams();

    const [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction] = useRestPaymentTransaction();

    const [paymentTransactions, setPaymentTransactions] = useState<IPaymentTransaction[]>();
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
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
        axios.get(`http://localhost:8080/paymenttransaction/getAllPaymentTransactionsByOrderID/${objectId}/${userFromStorage.distributor.distributorid}`)
            .then((response) => {

                setPaymentTransactions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    //sorting the payment transactions
    const sortedPaymemtTransactions = paymentTransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);

    const userFromStorage = JSON.parse(localStorage.getItem("user")!);


    {/*Handlers*/ }
    const handleFindValue = () => {
        try {
            getOrderByID(objectId!, userFromStorage.distributor.distributorid);
            getAllPaymentTransactionsByOrderID();
        } catch (error) {
            headerHandleAlert('Error', "Failed to retrieve order data. Please try again.", 'error');
        }
    };





    useEffect(() => {

        handleFindValue();

        setIsMounted(true); // Set the component as mounted when it renders




    },
        [isOrderFound, order, paymentTransactionsObjects]);


    const handleH2Click = () => {
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
                    {order ? (
                        <div>
                            <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }} >
                                <Grid>
                                    <div style={{ display: "flex", flexDirection: 'row', paddingTop: 7, paddingLeft: 20 }}>
                                        <Grid item>
                                            < ContentNameTypography > Order Transaction Details</ContentNameTypography >
                                        </Grid>
                                        <Grid item>
                                            <StyledPrintDiv>
                                                < Button variant="outlined" onClick={handlePrint} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                    </svg></Button >
                                            </StyledPrintDiv>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid container style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                    <StyleLabelData style={{ paddingTop: 75, marginLeft: -890 }}>Dealer Contact Information</StyleLabelData>
                                </Grid>
                                <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
                                    <Grid item>
                                        <StyleLabel>Dealer Name</StyleLabel>
                                        <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 20 }}>Dealer ID</StyleLabel>
                                        <StyleData style={{ marginLeft: 40 }}>{order?.dealer.dealerid}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: -50 }}>Email Address</StyleLabel>
                                        <StyleData style={{ marginLeft: -30 }}>{order?.dealer.emailaddress}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 5 }}>Contact Number</StyleLabel>
                                        <StyleData style={{ marginLeft: 20 }}>{order?.dealer.contactnumber}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 5 }}>Address</StyleLabel>
                                        <StyleData style={{ marginLeft: 20 }}>{order?.dealer.currentaddress}</StyleData>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ paddingTop: 10, position: 'relative', justifyContent: "center", alignItems: "center" }}>
                                    <StyleLabelData style={{ paddingTop: 75, marginLeft: -860 }}>Order Transaction Information</StyleLabelData>
                                </Grid>
                                <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
                                    <Grid item>
                                        <StyleLabel>Order Transaction ID</StyleLabel>
                                        <StyleData>{order?.orderid}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: -50 }}>Order Transaction Date</StyleLabel>
                                        <StyleData style={{ marginLeft: -30 }}>{order?.distributiondate}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 5 }}>Php Total Ordered Amount</StyleLabel>
                                        <StyleData style={{ marginLeft: 20 }}>{order?.orderamount}</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 5 }}>Penalty Rate</StyleLabel>
                                        <StyleData style={{ marginLeft: 20 }}>{order?.penaltyrate} %</StyleData>
                                    </Grid>

                                    <Grid item>
                                        <StyleLabel style={{ marginLeft: 5 }}>Payment Terms</StyleLabel>
                                        <StyleData style={{ marginLeft: 20 }}>{order?.paymentterms}</StyleData>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
                                    <StyleLabelData style={{ paddingTop: 100, marginLeft: -840 }}>Payment Transaction Information</StyleLabelData>
                                </Grid>
                                <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
                                    {order?.paymenttransactions?.length !== 0 ? (
                                        <div>
                                            <PaperStyle>
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



                                                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center'
                                                }} TransitionComponent={SlideTransitionDown}>
                                                    <Alert onClose={handleCloseAlert} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                                                        <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                                                        {alertMessage}
                                                    </Alert>
                                                </Snackbar>
                                            </PaperStyle>

                                        </div>

                                    ) : (
                                        <div>
                                            {/* <h2 style={{ color: 'grey', marginTop: '50px', textDecoration: 'underline black 2px', fontStyle: 'italic' }} onClick={() => handleH2Click()}> No schedules yet. Set Payment Transaction in the Scheduling Page. </h2> */}
                                            <TypographyClick onClick={() => handleH2Click()}>No schedules yet. Set Payment Transaction in the Scheduling Page.</TypographyClick>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>

                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-20px' }}>
                            <img src={logo5} alt="Logo" style={{ width: '375px', marginBottom: '-40px' }} />
                            <LinearProgress sx={{ width: '20%' }} />
                            {/* You can adjust the width as needed */}
                        </Box>
                    )}
                </div>
            ) : (
                <OrderDetailsPrint order={order!} />
            )}
        </div>

    );

}



