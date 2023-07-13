import NavBar from "../../Global Components/NavBar";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, TextField, InputAdornment, TableContainer, Table, TableHead, Paper, TableRow, TableCell, TableBody, Box, IconButton, Grid, Stack, TextFieldProps } from '@mui/material';
import styled from "@emotion/styled";
import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { format } from 'date-fns';
import { IPaymentTransaction } from "../../RestCalls/Interfaces";

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

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const orderIDRef = useRef<TextFieldProps>(null)

    const [getOrderByID, createSchedule, order, isOrderFound] = useRestSchedule();

    //sorting the payment transactions
    const sortedPaymemtTransactions = order?.paymentTransactions?.sort((a, b) => a.installmentnumber - b.installmentnumber);

    const handleFindOrder = () => {
        //pagbutang sa isFound ot not found uy
        getOrderByID(Number(orderIDRef.current?.value))
        console.log(order)

    };


    const handleCreateSchedules = () => {

        for (let i = 1; i <= order!.paymentterms; i++) {
            createSchedule({
                paymenttransactionid: -1,
                amountdue: order!.orderamount / order!.paymentterms,
                startingdate: '',
                enddate: '',
                installmentnumber: i,
                order: order!,
            });
        }

    };


    const handleSaveClick = (index: number) => {
        console.log(order)

        /*   const paymentTerms = order?.paymentterms as number;
     
          const selectedRow = Array.from({ length: paymentTerms })[index];
     
     
     
     
          // Access the values from the selected row
          const paymentTransactionId = `Row ${index + 1}`;
          const installmentNumber = paymentTerms - (paymentTerms - (index + 1));
          // You can access the starting date and ending date values using the appropriate state or variable that holds the date values for each row.
     
          const amountDue = order?.orderamount! / paymentTerms;
     
            createSchedule({
              paymenttransactionid: -1,
              amountdue: amountDue,
              startingdate: selectedDate?.format('YYYY-MM-DD') || '',
              enddate: selectedDate?.format('YYYY-MM-DD') || '',
              installmentnumber: installmentNumber,
              order: order!,
          });  
    */
    };

    useEffect(() => {
        handleFindOrder();
    },
        [isOrderFound, order]);


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

            {order?.paymentTransactions?.length !== 0 ? (
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
                                                        // onChange={(date) => handleDateChange(date, index)}

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
                                                        // onChange={(date) => setSelectedDate(date as Dayjs | null)}
                                                        />

                                                    </LocalizationProvider>
                                                </TableCell>

                                                <TableCell>
                                                    {order?.orderamount! / order?.paymentterms!}
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleSaveClick(index)}> Save </Button>
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
                    <StyledButton onClick={handleCreateSchedules}> Create Schedules </StyledButton>
                </div>

            )

            }
        </div>
    );
}