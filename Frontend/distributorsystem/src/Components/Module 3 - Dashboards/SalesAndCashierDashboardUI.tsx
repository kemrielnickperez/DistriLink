import { useEffect, useState } from "react";
import { ICollectionPaymentReceipt, IOrder } from "../../RestCalls/Interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import logo5 from '../../Global Components/Images/logo5.png';

const PendingOrdersGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})

const PendingOrdersPaper = styled(Paper)({
    top: 80,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "400px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '1300px'
})

const PendingOrderTypo = styled(Typography)({
    position: 'absolute',
    top: '8%',
    left: '18%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949"
})

const ViewOrdersTypo = styled(Typography)({
    position: 'absolute',
    top: '85%',
    cursor:'pointer',
    left: '45%',
    // transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '15px',
    color: "#203949",
    textDecoration: 'underline black 2px',
    ':hover': {
        color: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})

const TableHeaderCell = styled(TableCell)({
    top: -10,
    position: 'relative',
    fontSize: 13,
    color: "#000000",
    fontWeight: "bold"
})

const PendingPaymentsPaper = styled(Paper)({
    top: 100,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "400px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '1300px'
})

const PendingPaymentTypo = styled(Typography)({
    position: 'absolute',
    top: '8%',
    botton:8,
    left: '20%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949"
})

const ViewPaymentTypo = styled(Typography)({
    position: 'absolute',
    top: '85%',
    cursor:'pointer',
    left: '45%',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '15px',
    color: "#203949",
    textDecoration: 'underline black 2px',
    ':hover': {
        color: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})

const PendingPaymentsGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})


export default function SalesAndCashierDashboard() {
    const navigate = useNavigate();
    const [unconfirmedOrders, setUnconfirmedOrders] = useState<IOrder[]>();
    const [unconfirmedCollectionPaymentReceipts, setUnconfirmedCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>();
    
    const userFromStorage = JSON.parse(localStorage.getItem("user")!);

    const getAllUnconfirmedOrders = () => {
        axios.get(`http://localhost:8080/order/getAllUnconfirmedOrdersByDistributorID/${userFromStorage.salesAssociateAndCashier.distributor.distributorid}`)
            .then((response) => {
                setUnconfirmedOrders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    const getAllUnconfirmedCollectionPaymentReceipts = () => {
        axios.get(`http://localhost:8080/paymentreceipt/collectionpaymentreceipt/getAllUnconfirmedCollectionPaymentReceiptsByDistributorID/${userFromStorage.salesAssociateAndCashier.distributor.distributorid}`)
            .then((response) => {
                setUnconfirmedCollectionPaymentReceipts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }
    const handlePaymentsListClick = () => {
        navigate(`/paymentList`);
    }

    const handleOrdersListClick = () => {
        navigate(`/productDistributionList`);
    }
    useEffect(() => {
        getAllUnconfirmedOrders();
        getAllUnconfirmedCollectionPaymentReceipts();
    }, [unconfirmedOrders, unconfirmedCollectionPaymentReceipts]);
    return(
        <Grid container>
            {unconfirmedOrders || unconfirmedCollectionPaymentReceipts ?(
                <>
                <PendingOrdersGrid item container>
                <PendingOrdersPaper>
                    <PendingOrderTypo>Pending Orders</PendingOrderTypo>
                    <TableContainer>
                        <Table style={{ position: 'absolute', top: 90, left: 0, right: 0 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align='center'>Order Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align='center'>Order Date</TableHeaderCell>
                                    <TableHeaderCell align='center'>Total Amount</TableHeaderCell>
                                    <TableHeaderCell align='center'>Dealer Name</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unconfirmedOrders?.slice(0, 5).map((order) => (
                                    <TableRow key={order.orderid}>
                                        <TableCell align="left">{order.orderid}</TableCell>
                                        <TableCell align="left">{order.orderdate}</TableCell>
                                        <TableCell align="left">{order.orderamount}</TableCell>
                                        <TableCell align="left">{order.dealer.firstname + " " + order.dealer.lastname}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ViewOrdersTypo onClick={() => handleOrdersListClick()}> View all unconfirmed orders </ViewOrdersTypo>

                </PendingOrdersPaper>
            </PendingOrdersGrid>
            <PendingPaymentsGrid item container>
                    <PendingPaymentsPaper>
                        <PendingPaymentTypo>Pending Payments</PendingPaymentTypo>
                        <TableContainer>
                            <Table aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                        <TableHeaderCell align="center">Payment Date</TableHeaderCell>
                                        <TableHeaderCell align="center">Amount Paid</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {unconfirmedCollectionPaymentReceipts?.slice(0, 3).map((receipt) => (
                                        <TableRow key={receipt.paymentreceiptid}>
                                            <TableCell align="center">{receipt.paymentreceiptid}</TableCell>
                                            <TableCell align="center">{receipt.remitteddate}</TableCell>
                                            <TableCell align="center">{receipt.remittedamount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <ViewPaymentTypo onClick={() => handlePaymentsListClick()}> View all unconfirmed payments </ViewPaymentTypo>
                    </PendingPaymentsPaper>
                </PendingPaymentsGrid></>
            ):(
                <Box sx={{position:'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '0', marginLeft: '90vh' }}>
                <img src={logo5} alt="Logo" style={{ width: '375px', marginBottom: '-40px', marginTop:-250, marginLeft:-50 }} />
                <LinearProgress sx={{ width: '80%',marginLeft:-6 }} />
                {/* You can adjust the width as needed */}
              </Box>
            )}
        </Grid>
    )

}