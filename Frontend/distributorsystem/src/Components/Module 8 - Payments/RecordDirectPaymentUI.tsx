import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles, IconButton, Grid, TextFieldProps, Box, TablePagination, Autocomplete, AutocompleteRenderInputParams, MenuItem, Modal, Tabs, Tab } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavBar from "../../Global Components/NavBar";
//import { useRestSchedule } from "../../RestCalls/ScheduleUseRest";
import { useContext, useEffect, useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestPaymentTransaction } from "../../RestCalls/PaymentTransactionUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IEmployee, IOrder, IPaymentReceipt, IPaymentTransaction } from "../../RestCalls/Interfaces";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";
import { error } from "console";
import { ToastContainer } from "react-toastify";


const StyledTableRow = styled(TableRow)({
    borderBottom: "1px #203949 solid",
});
const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginBottom: 50,
    marginLeft: '10%',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})
const ContentNameTypography2 = styled(Typography)({
    marginTop: 60,
    marginBottom: 30,
    marginLeft: '5%',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})


const StackStyle = styled(Stack)({
    position: 'absolute',
    justifyContent: 'flex-end',
    top: 525,
    left: '32%'
})
const StyleLabel = styled(Typography)({
    textAlign: 'left',
    fontWeight: '550',
    marginLeft: 180,
    marginTop: 20,
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter, sans-serif',
})
const StyleData = styled(Typography)({
    fontWeight: '550',
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: 35,
    top: 20,
})
const LabelTypography = styled(Typography)({
    marginLeft: '30%',
    top: '200px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '550',
    textAlign: 'center',
    fontSize: '17px',
    color: '#203949'
})
const StyleTextField = styled(TextField)({
    top: -15,
    left: 35,
    '& input':
    {
        textAlign: 'left',
        padding: '12px 12px'
    },

    [`& fieldset`]: {
        borderRadius: 50,
        height: 50,
        width: 400,
    }
})
const StyleTextField2 = styled(TextField)({
    top: 25,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
    }
})
const StyleTextField3 = styled(TextField)({
    top: 15,
    left: 125,
    '& input':
    {
        textAlign: 'left',
        padding: '6px 12px',

    },

    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        width: 220,
        top: 5
    }
})


const SearchButton = styled(IconButton)({
    backgroundColor: "#2d85e7",
    top: -15,
    left: 185,
    height: 47,
    width: 50,
    borderRadius: "0 50% 50% 0",
    '&:hover': {
        backgroundColor: "#2d85e7"
    }
})
const StyledButton = styled(Button)({
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    backgroundColor: '#2C85E7',
    color: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '15px',
    width: '240px',
    height: 50,
    ':hover': {
        backgroundColor: '#87BAF3',
    }
})
const StyledPaymentTransactionCard = styled(Card)({
    borderRadius: "22px",
    borderColor: 'black',
    border: '20px',
    width: '85%',
    padding: '10px 10px 10px 0px',
    margin: '28px 28% 20px 10%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
});

const StyledPaymentTransactionCard1 = styled(Card)({
    borderRadius: "22px",
    borderColor: 'black',
    border: '20px',
    width: '85%',
    padding: '10px 10px 10px 0px',
    margin: '28px 28% 20px 10%',
    backgroundColor: '#ffffff',

    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
});
const StyledDatePicker = styled(DatePicker)({
    // marginBottom:'43px',
    width: '75%',
    left: 147,
    top: 25,
    input: {
        color: '#707070',
        fontFamily: 'Inter, sans-serif',
        marginBottom: -5,
        marginTop: -10,
    },
    [`& fieldset`]: {
        borderRadius: 15,
        height: 40,
        // width: '90%',
    }
});
const TableCellStyle = styled(TableCell)({
    fontWeight: '490',
    color: '#707070'
});

const ModalCard = styled(Card)({
    /* position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 1000,
    backgroundColor: 'background.paper',
    border: '2px', */

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
})

const TabStyle = styled(Tab)({
    width: 320,
    fontWeight: '550',
    label: {
        color: '#707070',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    }
})


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function RecordDirectPayment() {
    const [createPaymentTransaction, getPaymentTransactionByID, updatePaymentTransaction, getRemainingPaymentAmount, getTotalPaidAmount, paymentTransaction, totalPaidAmount, remainingPaymentAmount] = useRestPaymentTransaction();
    const [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();
    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();



    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedPaymentTransaction, setSelectedPaymentTransaction] = useState<IPaymentTransaction | null>(null);
    const [selectedPaymentTransactionRow, setSelectedPaymentTransactionRow] = useState<IPaymentTransaction | null>(null);

    const [paymentTransactions, setPaymentTransactions] = useState<IPaymentTransaction[]>([]);
    const [paymentReceipts, setPaymentReceipts] = useState<IPaymentReceipt[]>([]);
    const [directPaymentReceipts, setDirectPaymentReceipts] = useState<IDirectPaymentReceipt[]>([]);
    const [collectionPaymentReceipts, setCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>([]);


    const [open, setOpen] = React.useState(false);


    //const sortedPaymentTransactions = paymentTransactions.sort((a, b) => a.installmentnumber - b.installmentnumber);

    const handleOpen = () => {

        //setPaymentReceipts(response.data.paymentreceipts);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const orderIDRef = useRef<TextFieldProps>(null);
    const amountPaidRef = useRef<TextFieldProps>(null);
    const remarksRef = useRef<TextFieldProps>(null);


    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
    const [sortedPaymentTransactions, setSortedPaymentTransactions] = useState<IPaymentTransaction[] | null>([]);



    function getAllPaymentTransactionsByOrderID(orderid: string) {
        axios.get<IPaymentTransaction[]>(`http://localhost:8080/paymenttransaction/getAllPaymentTransactionsByOrderID/${orderid}/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setPaymentTransactions(response.data);

            })
            .catch((error) => {
                alert("Error retrieving payment transactions. Please try again.");


            });
    }
    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);


    const handleFindPaymentTransactions = () => {
        getOrderByID(orderIDRef.current?.value + "", distributorFromStorage.distributorid);
        if (isOrderFound === true) {
            getAllPaymentTransactionsByOrderID(orderIDRef.current?.value + "")
        }
    };


    const cashierObject: IEmployee = {
        employeeid: "2386f1b2",
        firstname: "Victoria",
        middlename: "I",
        lastname: "Ramirez",
        emailaddress: "charmaineramirez05@gmail.com",
        password: "test",
        birthdate: "2005-11-05",
        gender: "female",
        currentaddress: "2079 Humay-Humay Street",
        permanentaddress: "Pajo",
        contactnumber: "+639158523587",
        tinnumber: '',
        iscashier: true,
        issalesassociate: true,
        iscollector: true,
        submissiondate: "2023-11-07",
        distributor: {
            distributorid: "distributor9",
            firstname: "Min Gyu",
            middlename: "",
            lastname: "Kim",
            emailaddress: "capstone.distrilink@gmail.com",
            password: "doggo",
            birthdate: "1997-04-06",
            gender: "Male",
            currentaddress: "Mabolo, Cebu",
            permanentaddress: "Cebu City",
            contactnumber: "09741258963",
            dealerids: [],
            employeeids: [
                "2386f1b2"
            ],
            orderids: [],
            archiveddealerids: [],
            paymentreceiptids: []
        },
        orderids: [],
        paymentreceiptids: [],
        collectionpaymentids: [],
        documentids: [
            "54219fa2"
        ]
    }


    const clearInputValues = () => {
        setSelectedDate(null);
        setSelectedPaymentTransaction(null);

        if (remarksRef.current || amountPaidRef.current?.value) {
            remarksRef.current!.value = '';
            amountPaidRef.current!.value = '';

        }
    }



    const handleSaveDirectPayment = () => {
        const cashierFromStorage = JSON.parse(localStorage.getItem("cashier")!);

        if (Number(amountPaidRef.current?.value) > Number(remainingPaymentAmount!.toFixed(2))) {
            alert("Amount paid is greater than amount due. Please change it to be equal or less than the amount due.")
            return;
        }

        createDirectPaymentReceipt({
            paymentreceiptid: uuidv4().slice(0, 8),
            remarks: remarksRef.current?.value + "",
            datepaid: selectedDate?.format('YYYY-MM-DD') || '',
            amountpaid: Number(amountPaidRef.current?.value),
            receivedamount: Number(amountPaidRef.current?.value),
            paymenttype: 'direct',
            daterecorded: moment().format('YYYY-MM-DD'),
            paymenttransactionid: selectedPaymentTransaction?.paymenttransactionid!,
            receiverID: "",
            receivername: ""
        }, cashierObject.employeeid)


        const allPaid = paymentTransactions.every((transaction) => transaction.paid);
        if (allPaid) {
            closedOrder(order?.orderid!);
        }

        clearInputValues();

    }


    const handleViewPaymentReceiptsButtonClick = (params: { row: any }) => {

        const selectedTransaction = paymentTransactions.find(pt => pt.paymenttransactionid === params.row.paymentTransactionID);
        setPaymentReceipts(selectedTransaction ? selectedTransaction.paymentreceipts : []);
        if (selectedTransaction) {
            // Filter payment receipts by type
            setDirectPaymentReceipts(selectedTransaction.paymentreceipts.filter(
                receipt => receipt.paymenttype === 'direct'
            ) as IDirectPaymentReceipt[]);

            setCollectionPaymentReceipts(selectedTransaction.paymentreceipts.filter(
                receipt => receipt.paymenttype === 'collection'
            ) as ICollectionPaymentReceipt[]);


        }

        getRemainingPaymentAmount(selectedTransaction ? selectedTransaction.paymenttransactionid : '');
        getTotalPaidAmount(selectedTransaction ? selectedTransaction.paymenttransactionid : '');

        handleOpen();
    }



    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 2 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const PaymentReceiptcolumns: GridColDef[] = [
        { field: 'paymentReceiptID', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 160 },
        { field: 'remarks', headerName: 'Remarks', width: 160 },
    ]

    const PaymentReceiptrows = paymentReceipts.map((pr) => {

        return {
            id: pr!.paymentreceiptid!,
            paymentReceiptID: pr.paymentreceiptid!,
            amountPaid: pr.amountpaid!,
            remarks: pr.remarks!,
            receiverName: pr!.receivername!,

        }
    });



    const DirectPaymentReceiptcolumns: GridColDef[] = [
        { field: 'paymentReceiptID', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 160 },
        { field: 'remarks', headerName: 'Remarks', width: 160 },
        { field: 'datePaid', headerName: 'Date Paid', width: 180 },
        { field: 'receivedAmount', headerName: 'Received Amount', width: 180 },
        { field: 'dateRecorded', headerName: 'Date Recorded', width: 180 },
    ]


    const DirectPaymentReceiptrows = directPaymentReceipts.map((pr) => {


        return {
            id: pr!.paymentreceiptid!,
            paymentReceiptID: pr.paymentreceiptid!,
            amountPaid: pr.amountpaid!,
            remarks: pr.remarks!,
            receiverName: pr!.receivername!,
            datePaid: pr.datepaid,
            daterecorded: pr.daterecorded,
            receivedamount: pr.receivedamount,

        }
    });


    const CollectionPaymentReceiptcolumns: GridColDef[] = [
        { field: 'paymentReceiptID', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'amountPaid', headerName: 'Amount Paid', width: 180 },
        { field: 'confirmationStatus', headerName: 'Confirmation Status', width: 180 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 160 },
        { field: 'remarks', headerName: 'Remarks', width: 160 },
        { field: 'collectionDate', headerName: 'Collection Date', width: 180 },
        { field: 'collectionAmount', headerName: 'Collection Amount', width: 180 },
        { field: 'remittedDate', headerName: 'Remitted Date', width: 180 },
        { field: 'remittedAmount', headerName: 'Remitted Amount', width: 180 },
        { field: 'confirmationDate', headerName: 'Confirmation Date', width: 180 },

    ]

    const CollectionPaymentReceiptrows = collectionPaymentReceipts.map((pr) => {
        return {
            id: pr!.paymentreceiptid!,
            paymentReceiptID: pr.paymentreceiptid!,
            amountPaid: pr.amountpaid!,
            remarks: pr.remarks!,
            receiverName: pr!.receivername!,
            collectiondate: pr.collectiondate,
            collectionamount: pr.collectionamount,
            remitteddate: pr.remitteddate,
            remittedamount: pr.remittedamount,
            confirmationdate: pr.confirmationdate,
            confirmationStatus: pr.isconfirmed ? 'Confirmed' : 'Unconfirmed',

        }
    });




    const columns: GridColDef[] = [
        { field: 'paymentTransactionID', headerName: 'Payment Transaction ID', width: 200 },
        { field: 'installmentNumber', headerName: 'Installment Number', width: 180 },
        { field: 'paymentDueDate', headerName: 'Payment Due Date', width: 160 },
        { field: 'amountDue', headerName: 'Amount Due', width: 180 },

        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            renderCell: (params) => (
                <span style={{ color: params.row.paymentStatus ? 'green' : 'red' }}>
                    {params.row.paymentStatus ? 'Paid' : 'Not Paid'}
                </span>
            ),
        },
        {
            field: 'actionView', headerName: '', width: 220, renderCell: (params: { row: any; }) => {
                return (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleViewPaymentReceiptsButtonClick(params);
                            }}>
                            View Payment Receipts
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"

                        >
                            <ModalCard>
                                <ContentNameTypography2>Payment Receipts</ContentNameTypography2>


                                <Box sx={{ width: '100%', marginTop: 3, marginLeft: 0.5 }}>

                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ marginLeft: 40 }}>
                                            <TabStyle label="Direct Payment Receipts" {...a11yProps(0)} />
                                            <TabStyle label="Collection Payment Receipts" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>


                                    <CustomTabPanel value={value} index={0}>
                                        <DataGrid
                                            rows={DirectPaymentReceiptrows}
                                            sx={{ textAlign: 'center', color: '#203949', height: '350px', width: '1000px', fontWeight: 330, margin: '50px', border: 'none', fontSize: '490' }}
                                            columns={DirectPaymentReceiptcolumns}

                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 5,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[5]}
                                        />
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>

                                        <DataGrid
                                            rows={CollectionPaymentReceiptrows}
                                            sx={{ textAlign: 'center', color: '#203949', height: '350px', width: '1000px', fontWeight: 330, margin: '50px', border: 'none', fontSize: '490' }}
                                            columns={CollectionPaymentReceiptcolumns.map((column) => ({
                                                ...column,
                                            }))}

                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 5,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[5]}
                                        />

                                    </CustomTabPanel>
                                </Box>

                                <h1>
                                    Total Amount Paid: {totalPaidAmount!.toFixed(2)}
                                </h1>
                                <h1>
                                    Remaining Payment Amount: {remainingPaymentAmount!.toFixed(2)}
                                </h1>
                                <Button variant="contained" onClick={handleClose}>Close </Button>


                            </ModalCard>
                        </Modal>
                    </div>



                )
            }
        }

    ]




    const rows = sortedPaymentTransactions!.map((pt) => {



        return {
            id: pt!.paymenttransactionid!,
            paymentTransactionID: pt!.paymenttransactionid!,
            installmentNumber: pt!.installmentnumber!,
            paymentDueDate: pt!.enddate!,
            amountDue: pt!.amountdue!,
            paymentStatus: pt!.paid,

        }
    });







    useEffect(() => {
        
        if (order && paymentTransactions) {
            const allPaid = paymentTransactions?.every((transaction) => transaction.paid);

            // Clone the array and sort it
            const sorted = [...paymentTransactions].sort((a, b) => a.installmentnumber - b.installmentnumber);
            setSortedPaymentTransactions(sorted);

            if (allPaid) {
                closedOrder(order?.orderid!);
            }
        }


    
        setMaxDate(dayjs() as Dayjs);

    }, [isOrderFound, order, order?.isclosed, paymentTransactions]);


    return (

        <div>
            <ContentNameTypography>Record Direct Payment</ContentNameTypography>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <LabelTypography>Enter Order Transaction ID</LabelTypography>
                <StyleTextField inputRef={orderIDRef} />
                <SearchButton type="button" aria-label="search" onClick={handleFindPaymentTransactions}>
                    <SearchIcon sx={{ color: "white" }} />
                </SearchButton>

            </div>

            {isOrderFound ? (
                <div>
                    {paymentTransactions.length !== 0 ? (
                        <div>

                            <StyledPaymentTransactionCard1>
                                <ContentNameTypography2>Payment Transactions</ContentNameTypography2>
                                <DataGrid
                                    rows={rows}
                                    sx={{ textAlign: 'center', color: '#203949', height: '350px', fontWeight: 330, margin: '50px', border: 'none', fontSize: '490' }}
                                    columns={columns}

                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: paymentTransactions.length,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}



                                />
                            </StyledPaymentTransactionCard1>
                        </div>

                    ) : (
                        <div>
                            <h2 style={{ color: '#707070', marginTop: '50px' }}> no schedules yet</h2>

                        </div>

                    )
                    }
                    {order?.isclosed ? (
                        <div>
                            <h1>
                                All payment transactions have been paid. Order is now closed.
                            </h1>
                        </div>
                    ) : (<div>
                        <Grid container>
                            <Grid item><StyleLabel>Payment Transaction ID</StyleLabel>
                                {/* <StyleTextField3
                     variant="outlined"
                     select
                     value={selectedPaymentTransaction}
                     style={{width:230}}
                     onChange={(newValue) => {
                        setPaymentTransactionID(newValue+''); 
                    }}
                     SelectProps={{
                        native: true,
                    }}
                    
                    > 
                     {order?.paymenttransactions!.map((option)=>(
                        <MenuItem key={option.paymenttransactionid}
                        value={option.paymenttransactionid} 
                        style={{marginLeft:'200px'}}>
                            {option.paymenttransactionid}
                        </MenuItem>
                     ))} */}
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={paymentTransactions!}
                                    getOptionLabel={(option) => option.paymenttransactionid}
                                    isOptionEqualToValue={(option, value) => option.paymenttransactionid === value.paymenttransactionid}
                                    value={selectedPaymentTransaction}
                                    onChange={(event, newValue) => {
                                        setSelectedPaymentTransaction(newValue);
                                        getRemainingPaymentAmount(newValue?.paymenttransactionid!);
                                    }}
                                    filterOptions={(options, state) => {
                                        // Filter out "Paid" transactions from the options
                                        return options.filter((option) => !option.paid);
                                    }}
                                    // Style for the Autocomplete (Combo Box)
                                    sx={{
                                        marginTop: 2,
                                        marginRight: 15,
                                    }}
                                    // Style for the TextField (Input)
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                                sx: {
                                                    [`& fieldset`]: {
                                                        borderRadius: 15,
                                                        height: 40,
                                                        width: 220,
                                                        top: 4.5,
                                                        right: -250,
                                                    },
                                                    left: 180,
                                                },
                                            }}
                                            variant="outlined"
                                        />
                                    )}
                                />


                                {/* </StyleTextField3> */}
                            </Grid>
                            <Grid item>
                                <StyleLabel top={1}>Date Paid</StyleLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StyledDatePicker
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                            }
                                        }}
                                        value={selectedDate}
                                        maxDate={maxDate}
                                        onChange={(date) => setSelectedDate(date as Dayjs | null)} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item>
                                <StyleLabel>Amount Paid</StyleLabel>
                                <StyleTextField2 style={{ marginLeft: 63 }} inputRef={amountPaidRef} />
                            </Grid>
                            <Grid item><StyleLabel>Remarks</StyleLabel>
                                <StyleTextField2 style={{ marginLeft: 63 }} inputRef={remarksRef} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                            </Grid>
                        </Grid>
                        <StyledButton onClick={handleSaveDirectPayment}>Save Payment Record</StyledButton>
                        {/* <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader> */}
                        {/* set style left and top manually here in stack */}
                        {/* Alerts */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            limit={3}
                            hideProgressBar
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            style={{ width: 450 }}
                            theme="colored"
                        />
                    </div>)}
                </div>
            ) : (
                <div>
                    {/* Display an empty field or a message when the order is not found */}
                    <h2 style={{ color: 'black', marginTop: '50px' }}>Order Not Found</h2>
                    {/* You can add more components or customize the message as needed */}
                </div>
            )}



        </div>
    );

}
