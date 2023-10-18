import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { IPaymentTransaction } from "../../RestCalls/Interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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


export function OrderDetails() {
    const { objectId } = useParams();

    const navigate = useNavigate();

    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, paymentTransaction] = useRestPaymentTransaction();
    const [paymentTransactionsObjects, setPaymentTransactionsObjects] = useState<IPaymentTransaction[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    //sorting the payment transactions
    const sortedPaymemtTransactions = order?.paymenttransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);

    {/*Handlers*/ }
    const handleFindValue = () => {
        getOrderByID(objectId!);
    };

    {/* useEffects*/ }
    useEffect(() => {
        handleFindValue();
    },
        [order]
    );
    useEffect(() => {
        setIsMounted(true); // Set the component as mounted when it renders

        // Only make the GET request if the component is mounted
        if (isMounted) {

            handleFindValue();
        }
        return () => {
            setIsMounted(false);
        };

    },
        [isOrderFound, order, paymentTransactionsObjects]);


    const handleH2Click = () => {
        navigate(`/schedules/${order?.orderid}`);
    }


    return (
        <div>
            <ContentNameTypography>Order Transaction Details</ContentNameTypography>
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
            {order?.paymenttransactions?.length !== 0 ? (
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

                                            <TableCell>

                                                {transaction.amountdue.toFixed(2)}

                                            </TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
    );

}