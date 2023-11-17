import { Grid, Paper, Autocomplete, Typography, styled, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ICollectionPaymentReceipt, IDealer, IDirectPaymentReceipt, IDistributor, IOrder, IPaymentReceipt } from "../../RestCalls/Interfaces";
import { useNavigate } from "react-router-dom";


const ProductName = styled(Typography)({
    position: 'relative',
    left: 30,
    top: -50
})

const QuantityName = styled(Typography)({
    position: 'relative',
    left: -20,
    top: -50
})

const PendingOrdersGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})

const PendingOrdersPaper = styled(Paper)({
    top: 80,
    left: -280,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "300px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '700px'
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
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '15px',
    color: "#203949",
    textDecoration: 'underline black 2px',
    fontStyle: 'italic'
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
    left: -280,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "300px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '700px'
})

const PendingPaymentTypo = styled(Typography)({
    position: 'absolute',
    top: '8%',
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
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '15px',
    color: "#203949",
    textDecoration: 'underline black 2px',
    fontStyle: 'italic'
})

const PendingPaymentsGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})

const PendingDealerPaper = styled(Paper)({
    top: -540,
    left: 420,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "628px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '580px'
})

const PendingDealerTypo = styled(Typography)({
    position: 'absolute',
    top: '4%',
    left: '35%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949",

})

const ViewDealersTypo = styled(Typography)({
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '15px',
    color: "#203949",
    textDecoration: 'underline black 2px',
    fontStyle: 'italic'
})



const PendingDealerGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})


export default function Dashboard() {

    const navigate = useNavigate();

    const [unconfirmedDealers, setUnconfirmedDealers] = useState<IDealer[]>();
    const [unconfirmedOrders, setUnconfirmedOrders] = useState<IOrder[]>();
    const [unconfirmedCollectionPaymentReceipts, setUnconfirmedCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>();


    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);
 

    const getAllUnconfirmedDealers = () => {
        axios.get(`http://localhost:8080/dealer/getAllUnconfirmedDealersByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setUnconfirmedDealers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    const getAllUnconfirmedOrders = () => {
        axios.get(`http://localhost:8080/order/getAllUnconfirmedOrdersByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setUnconfirmedOrders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    const getAllUnconfirmedCollectionPaymentReceipts = () => {
        axios.get(`http://localhost:8080/paymentreceipt/collectionpaymentreceipt/getAllUnconfirmedCollectionPaymentReceiptsByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setUnconfirmedCollectionPaymentReceipts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    const handleDealersListClick = () => {
        navigate(`/dealerProfileList`);
    }

    const handlePaymentsListClick = () => {
        navigate(`/paymentList`);
    }

    const handleOrdersListClick = () => {
        //console.log(localStorage.getItem("salesAssociate"));
        //console.log(JSON.parse(localStorage.getItem("salesAssociateAndCashier")!));
        console.log(localStorage.getItem("salesAssociate"));
        console.log(JSON.parse(localStorage.getItem("distributor")!));
        // navigate(`/productDistributionList`);
    }



    useEffect(() => {
        getAllUnconfirmedDealers();
        getAllUnconfirmedOrders();
        getAllUnconfirmedCollectionPaymentReceipts();
    }, []);

    //unconfirmedDealers, unconfirmedOrders, unconfirmedCollectionPaymentReceipts

    return (
        <Grid container>
            <PendingOrdersGrid item container>
                <PendingOrdersPaper>
                    <PendingOrderTypo>Pending Orders</PendingOrderTypo>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align='center'>Order Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align='center'>Order Date</TableHeaderCell>
                                    <TableHeaderCell align='center'>Total Amount</TableHeaderCell>
                                    <TableHeaderCell align='center'>Dealer Name</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unconfirmedOrders?.map((order) => (
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
                                {unconfirmedCollectionPaymentReceipts?.map((receipt) => (
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
            </PendingPaymentsGrid>
            <PendingDealerGrid item container>
                <PendingDealerPaper>
                    <PendingDealerTypo>Pending Dealer Registration</PendingDealerTypo>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align='left'>Dealer Name</TableHeaderCell>
                                    <TableHeaderCell align='left'>Submission Date</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unconfirmedDealers?.map((dealer) => (
                                    <TableRow key={dealer.dealerid}>
                                        <TableCell align="left">{dealer.firstname + " " + dealer.lastname}</TableCell>
                                        <TableCell align="left">{dealer.submissiondate}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ViewDealersTypo onClick={() => handleDealersListClick()}> View all unconfirmed dealers </ViewDealersTypo>
                </PendingDealerPaper>


            </PendingDealerGrid>
        </Grid>
    )
}