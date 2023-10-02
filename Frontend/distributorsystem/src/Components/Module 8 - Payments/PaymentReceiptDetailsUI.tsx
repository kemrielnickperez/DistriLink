import NavBar from "../../Global Components/NavBar";
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";
import { Stack, Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";

const StyledHeaderTypography = styled(Typography)({
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: "10px",
    marginLeft: "80px",
    fontFamily: "Inter', sans-serif"
});

const StyledDealerHeader = styled(Typography)({
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "80px",
    marginLeft: "120px"
});

const StyledOrderHeader = styled(Typography)({
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "200px",
    marginLeft: "120px"
});

const StyledPaymentHeader = styled(Typography)({
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "300px",
    marginLeft: "120px"
});

const StyledAssignedHeader = styled(Typography)({
    position: "absolute",
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: "300px",
    marginLeft: "850px"
});


const FieldLabel = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    left: '80px',
    color: '#ffffff',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter, sans - serif',
});

const FieldData = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: '100px',
    top: '20px',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Inter, sans - serif',
});

const StyledCard = styled(Card)({
    borderRadius: "20px",
    padding: 1,
    width: 1000,
    position: "absolute",
    marginLeft: "130px",
    marginTop: "340px"
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#AFD3E2'
});

const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#146C94",
    fontWeight: "bold"
});


const RedirectButton = styled(Button)({
    position: "absolute",
    align: "center",
    color: "#FFFFFF",
    marginTop: "500px",
    marginLeft: "-280px"
});

export default function PaymentReceiptDetails() {

    const { objectId } = useParams();

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();


    const handleFindPaymentReceipt = () => {
        getPaymentReceiptByID(objectId!)
        //console.log(isOrderFoundError + "error")


    };

    useEffect(() => {
        handleFindPaymentReceipt();
    },
        [paymentReceipt]);


    return (
        <div>
            <h1 style={{ color: "black" }}> {paymentReceipt?.cashier?.birthdate}</h1>
            {/* <StyledHeaderTypography>Order Transaction Details</StyledHeaderTypography>
            <StyledDealerHeader>Dealer Contact Information</StyledDealerHeader>
            <Stack sx={{ position: 'absolute', top: '180px', left: '70px' }}>
                <FieldLabel>Dealer Name</FieldLabel>
                <FieldData>John Doe</FieldData>
            </Stack>
            <Stack sx={{ position: 'absolute', top: '180px', left: '230px' }}>
                <FieldLabel>Dealer ID</FieldLabel>
                <FieldData>A15-X101</FieldData>
            </Stack>
            <Stack sx={{ position: 'absolute', top: '180px', left: '370px' }}>
                <FieldLabel>Contact Number</FieldLabel>
                <FieldData>09123456789</FieldData>
            </Stack>
            <Stack sx={{ position: 'absolute', top: '180px', left: '570px' }}>
                <FieldLabel>Address</FieldLabel>
                <FieldData>306 St. Cypa , Englis V.Rama Cebu City, Cebu</FieldData>
            </Stack>

            <StyledOrderHeader>Order Transaction Information</StyledOrderHeader>
            <Stack sx={{ position: 'absolute', top: '300px', left: '70px' }}>
                <FieldLabel>Order Transaction ID</FieldLabel>
                <FieldData>45AhZh</FieldData>
            </Stack>
            <Stack sx={{ position: 'absolute', top: '300px', left: '280px' }}>
                <FieldLabel>Order Transaction Date</FieldLabel>
                <FieldData>May 11, 2023</FieldData>
            </Stack>
            <Stack sx={{ position: 'absolute', top: '300px', left: '500px' }}>
                <FieldLabel>Total Ordered Amount</FieldLabel>
                <FieldData>Php 10,000</FieldData>
            </Stack>

            <StyledPaymentHeader>Payment Transaction Information</StyledPaymentHeader>
            <StyledAssignedHeader>Assigned Collector: <b>James Reyes</b></StyledAssignedHeader>
            <StyledCard>
                <CardContent>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <StyledTableHead>
                                <TableRow>
                                    <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align="center">Payment Terms</TableHeaderCell>
                                    <TableHeaderCell align="center">Starting Date</TableHeaderCell>
                                    <TableHeaderCell align="center">Ending Date</TableHeaderCell>
                                    <TableHeaderCell align="center">Amount Due</TableHeaderCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">67CjBj</TableCell>
                                    <TableCell align="center">Installment (1st gives)</TableCell>
                                    <TableCell align="center">18/03/2023</TableCell>
                                    <TableCell align="center">02/04/2023</TableCell>
                                    <TableCell align="center">Php 5,000.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
            <Link to="/schedules"><RedirectButton>View/edit payment transactions in the Scheduling page</RedirectButton></Link>
         */}</div>
    );
}