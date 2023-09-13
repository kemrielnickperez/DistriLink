import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { IEmployee } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";


export default function RecordDirectPayment() {




    const StyledTableRow = styled(TableRow)({
        borderBottom: "2px #AFD3E2 solid",
    });

    const StyledHeaderTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "60px",
        marginTop: "20px",
        fontWeight: "bold",
        fontSize: 50,
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledOrderTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "78px",
        marginTop: "206px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledPaymentTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "345px",
        marginTop: "105px",
        fontSize: 25,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledPaymentIDTypography = styled(Typography)({
        position: "absolute",
        left: "170px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledTypography = styled(Typography)({
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledOrderTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
            borderRadius: '25px',
            color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "80px",
        top: "290px",
    }
    ));

    const StyledPaymentIDTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
            borderRadius: '25px',
            color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "170px",
        top: "577px",
    }
    ));





    const StyledPaymentTransactionCard = styled(Paper)({
        borderRadius: "22px",
        borderColor: 'black',
        border: '20px',
        width: 1200,
        marginLeft: "330px",
        marginTop: "140px",
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',


    });

    const StyledDatePaidTypography = styled(Typography)({
        position: "absolute",
        left: "470px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledDatePaidTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
            borderRadius: '25px',
            color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "471px",
        top: "577px",
    }
    ));

    const StyledAmountPaidTypography = styled(Typography)({
        position: "absolute",
        left: "775px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledAmountPaidTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
            borderRadius: '25px',
            color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "776px",
        top: "577px",
    }
    ));

    const StyledRemarksTypography = styled(Typography)({
        position: "absolute",
        left: "1070px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledRemarksTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
            borderRadius: '25px',
            color: "#000000",
            height: 150,
            width: 300
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        height: 148,
        width: 318,
        fontSize: 10,
        left: "1072px",
        top: "577px",
    }
    ));


    //currently gamit nako 12-Aug-2023
    const StyledDatePicker = styled(DatePicker)({
        backgroundColor: "#ffffff", borderRadius: "22px", input: {
            padding: "10px"
        },
    });

    const StyledTextField = styled(TextField)({
        backgroundColor: "#ffffff", borderRadius: "22px", input: {
            padding: "10px", color: "black"
        },
        width: '200px'

    });

    const StyledButton = styled(Button)({
        //EPAL LAGE NING HOVER, NEED PA DOUBLE CLICK PARA MOGANA ANG BUTTON
       /*  '&:hover': {
            backgroundColor: '#FFFFFF',
        }, */
        borderRadius: "15px",
        backgroundColor: '#AFD3E2',
        fontSize: '18px',
        color: '#146C94',
        textTransform: "none",
        fontWeight: "bold",
        width: 300,
        height: 55,
        marginTop: '30px',
        fontFamily: "Inter', sans-serif",
    });

   /*  const dummyCashier: IEmployee  = {
        employeeid: 1,
        firstname: "Catherine",
        middlename: "Damalerio",
        lastname: "Perez",
        birthdate: "December 23, 2002",
        gender: "Female",
        currentaddress: "Pajo, LLC",
        permanentaddress: "Basak, LLC",
        contactnumber: "000000000000",
        iscashier: true,
        issalesassociate: true,
        iscollector: true,
    } */

    const [getOrderByID, createSchedule, updatePaymentTransaction, order, isOrderFound] = useRestSchedule();

    const [createDirectPaymentReceipt ] = useRestPaymentReceipt();

    const [getPaymentTransactionByID, paymentTransaction ] = useRestPaymentTransaction();

    const [getCollectorByID, collector] = useRestEmployee();


    const orderIDRef = useRef<TextFieldProps>(null);
    const paymentTransactionIDRef = useRef<TextFieldProps>(null)
    const amountPaidRef = useRef<TextFieldProps>(null);
    const remarksRef = useRef<TextFieldProps>(null);



    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);



    //sorting the payment transactions
    const sortedPaymemtTransactions = order?.paymentTransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);


    const handleFindOrder = () => {
        // console.log("hoy")
        //pagbutang sa isFound ot not found uy
        getOrderByID(Number(orderIDRef.current?.value))
        //console.log(order?.paymentTransactions)
        //alert("naa ra!")

    };

    const handleSaveDirectPayment = () =>
    {
        createDirectPaymentReceipt(Number(paymentTransactionIDRef.current?.value), {
            receiptid: -1,
            remarks: remarksRef.current?.value+"",
            datepaid: selectedDate?.format('YYYY-MM-DD') || '',
            amountpaid: Number(amountPaidRef.current?.value),
            paymenttype: 'direct',
            //tangtang sa kay dala panganib
           /*  cashier: collector!,  */
            paymenttransaction: paymentTransaction!
        })
    }

    const handleFindPaymentTransaction = () => {
        getPaymentTransactionByID(Number(paymentTransactionIDRef.current?.value));
        getCollectorByID(1);
    }

    useEffect(() => {
        handleFindOrder();
        handleFindPaymentTransaction();
    },
        [isOrderFound, order]);



    return (
        <div>
            <StyledHeaderTypography>Record Direct Payment</StyledHeaderTypography>

            <Grid container spacing={4} sx={{
                position: "absolute",
                marginLeft: "8px",
                marginTop: "206px"
            }}>
                <Typography sx={{ color: "white" }}>Order ID</Typography>
                <Paper sx={{ backgroundColor: "#ffffff", borderRadius: "22px", height: "fit-content" }}>
                    <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={orderIDRef}
                        sx={{ paddingLeft: '15px', paddingTop: '5px' }} />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFindOrder} >
                        <SearchIcon />
                    </IconButton>

                </Paper>
            </Grid>


            <StyledPaymentTypography>Payment Transactions</StyledPaymentTypography>

            {order?.paymentTransactions?.length !== 0 ? (
                <Grid item container spacing={4}  >
                    <Grid item >
                        <StyledPaymentTransactionCard>
                            {/* please change sad ning border radius later sa tables sa scheduling. thanks self */}
                            <TableContainer sx={{ borderRadius: '22px' }}>
                                <Table  >
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="center">Payment Transaction ID</TableCell>
                                            <TableCell align="center">Installment Number</TableCell>
                                            <TableCell align="center"> Starting Date</TableCell>
                                            <TableCell align="center"> Ending Date</TableCell>
                                            <TableCell align="center"> Amount Due</TableCell>
                                            <TableCell align="center">idk unsay name ani, nakabayad naba or wala</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortedPaymemtTransactions?.map((transaction) => (
                                            <StyledTableRow key={transaction.paymenttransactionid}>
                                                <TableCell component="th" scope="row" align="center">{transaction.paymenttransactionid}</TableCell>
                                                <TableCell align="center">{transaction.installmentnumber}</TableCell>
                                                <TableCell component="th" scope="row" align="center">{transaction.startingdate}</TableCell>
                                                <TableCell align="center">{transaction.enddate}</TableCell>
                                                <TableCell align="center">{transaction.amountdue}</TableCell>
                                                <TableCell align="center">{transaction.paid ? 'Paid' : 'Not Paid'}</TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </StyledPaymentTransactionCard>
                        <Grid>

                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div>
                    <h2 style={{ color: 'white', marginTop: '50px' }}> no schedules yet</h2>

                </div>

            )
            }




            <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '50px', }}>

                <Grid item >
                    <Typography sx={{ color: "white" }}>Payment Transaction ID</Typography>
                    <Paper sx={{ backgroundColor: "#ffffff", borderRadius: "22px", height: "fit-content" }}>
                        <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} 
                            sx={{ paddingLeft: '15px', paddingTop: '5px' }} inputRef={paymentTransactionIDRef} />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFindPaymentTransaction}>
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                </Grid>

                <Grid item>
                    <Typography sx={{ color: "white" }}>Date Paid</Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ borderColor: 'white' }}
                            slotProps={{
                                textField: {
                                    InputProps: {
                                        disableUnderline: true
                                    },
                                    // Set the variant to "standard"
                                    variant: "standard",
                                    style: { width: '90%', padding: '0 10px 0 10px' }

                                }
                            }}
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date as Dayjs | null)}
                        />

                    </LocalizationProvider>
                </Grid>

                <Grid item>
                    <Typography sx={{ color: "white" }}>Amount Paid</Typography>
                    <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} 
                    inputRef={amountPaidRef}/>
                </Grid>


                <Grid item>
                    <Typography sx={{ color: "white" }}>Remarks</Typography>
                    <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }}
                    inputRef={remarksRef}/>
                </Grid>


            </Grid>
            <Box textAlign='center'>
                <StyledButton onClick={handleSaveDirectPayment}>Save Payment Record</StyledButton>

            </Box>





        </div>

    )

}