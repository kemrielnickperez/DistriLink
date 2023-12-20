import { useNavigate } from "react-router-dom";
import { ICollectionPaymentReceipt } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Box, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import logo5 from '../../Global Components/Images/logo5.png';


const PendingPaymentsGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})
const PendingPaymentsPaper = styled(Paper)({
    top: 80,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "500px",
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
const TableHeaderCell = styled(TableCell)({
    top: -10,
    position: 'relative',
    fontSize: 13,
    color: "#000000",
    fontWeight: "bold"
})
const ViewPaymentTypo = styled(Typography)({
    position: 'absolute',
    top: '85%',
    cursor:'pointer',
    left: '43%',
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



export default function CashierDashboard(){
    const navigate = useNavigate();

    const [unconfirmedCollectionPaymentReceipts, setUnconfirmedCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>();
   
    

    const userFromStorage = JSON.parse(localStorage.getItem("user")!);
    //userFromStorage.distributor.
    const handlePaymentsListClick = () => {
        navigate(`/paymentList`);
    }

    const getAllUnconfirmedCollectionPaymentReceipts = () => {
        axios.get(`http://localhost:8080/paymentreceipt/collectionpaymentreceipt/getAllUnconfirmedCollectionPaymentReceiptsByDistributorID/${userFromStorage.cashier.distributor.distributorid}`)
            .then((response) => {
                setUnconfirmedCollectionPaymentReceipts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    useEffect(() => {
        getAllUnconfirmedCollectionPaymentReceipts();
    }, [unconfirmedCollectionPaymentReceipts]);

    return(
        
        <Grid container>
        {unconfirmedCollectionPaymentReceipts?(
            <PendingPaymentsGrid item container>
                            <PendingPaymentsPaper>
                                <PendingPaymentTypo>Pending Payments</PendingPaymentTypo>
                                <TableContainer>
                                    <Table style={{ position: 'absolute', top: 90, left: 0, right: 0 }} aria-label='simple table'>
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
                        </PendingPaymentsGrid>


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