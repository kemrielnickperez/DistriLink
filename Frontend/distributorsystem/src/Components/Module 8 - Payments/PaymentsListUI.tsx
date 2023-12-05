import { Alert, AlertTitle, Autocomplete, Box, Button, Card, CircularProgress, LinearProgress, Slide, SlideProps, Snackbar, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { IDirectPaymentReceipt, IEmployee, IOrder, IPaymentReceipt } from "../../RestCalls/Interfaces";
import { auto } from "@popperjs/core";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const StyledCard = styled(Card)({
    padding: '10px 10px 10px 2px',
    margin: "50px 28% 0px 7.2%",
    width: '90%',
    height: '530px',
    background: 'linear-gradient(50deg, rgba(255,255,255,0.4) 12%,rgba(255,255,255,0.1) 77% )',
    backgroundBlendMode: '',
    // backgroundColor:'rgb(245, 247, 249,0.4)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: '0 4px 7px 1px rgba(0,0,0,0.28)',
    alignItems: 'center',
    borderRadius: '10px',
    justifyContent: 'center',
    position: 'fixed'
})
const ContentNameTypography = styled(Typography)({

    marginTop: 60,
    marginBottom: 35,
    marginLeft: 65,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})
const LabelTypography = styled(Typography)({
    marginLeft: 50,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '15px',
    color: '#707070'
})
const StyledButton = styled(Button)({
    paddingTop: -40,
    marginLeft: 30,
    backgroundColor: '#2C85E7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '150px',
    height: 40,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s',
})
const StyledButton1 = styled(Button)({
    backgroundColor: 'rgb(45, 133, 231,0.8)',
    borderRadius: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '100px',
    height: 35,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})

const DataGridStyle = styled(DataGrid)({

    textAlign: 'center',
    fontSize: 15,
    color: '#203949',
    height: '420px',
    width: '100%',
    margin: '10px 10px 0px 0px',
    borderRadius: '5px',
    border: '0px solid #e0e0e0',
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgb(45, 133, 231, 0.2)',
        fontWeight: 'bold'
    },

    '& .MuiDataGrid-row:nth-child(even)': {
        backgroundColor: 'rgb(45, 133, 231, 0.1)',
    },
})

export default function PaymentList() {

    const navigate = useNavigate();

    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);
    const cashierFromStorage = JSON.parse(localStorage.getItem("cashier")!);


    {/** useStates */ }
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [paymentreceipts, setPaymentReceipts] = useState<IPaymentReceipt[]>([]);

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    function getAllPaymentReceipts() {
        axios.get<IDirectPaymentReceipt[]>(`http://localhost:8080/paymentreceipt/getAllPaymentReceiptsByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setPaymentReceipts(response.data);

            })
            .catch((error) => {
               
            });
    }

    useEffect(() => {
        getAllPaymentReceipts();
        console.log(paymentreceipts)


    }, [[paymentreceipts]]);
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


    {/** Columns for DataGrid */ }
    const columns: GridColDef[] = [
        { field: 'paymentReceiptid', headerName: 'Payment Receipt ID', width: 200 },
        { field: 'paymentTransactionid', headerName: 'Payment Transaction ID', width: 200 },
        { field: 'paymentType', headerName: 'Payment Type', width: 200 },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 200,
            renderCell: (params) => (
                <div style={{
                    color: params.value === 'Unconfirmed' ? '#E77D7D' : '#2A9221'
                }}>
                    {params.value}
                </div>
            ),
        },
        { field: 'receiverName', headerName: 'Receiver Name', width: 200 },
        {
            field: 'action',
            headerName: '',
            width: 260,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton1
                        onClick={() => {
                            // Handle button click for this row here
                            handleViewButtonClick(params.row.paymentReceiptid);
                        }}
                    >
                        View
                    </StyledButton1>
                )
            }
        }

    ]
    {/** Rows for DataGrid */ }
    const rows = paymentreceipts.map((paymentreceipt) => {

        let isconfirmed = null; // Initialize with null

        // Check if the payment receipt is of type ICollectionPaymentReceipt
        if (paymentreceipt.paymenttype === 'collection' && 'isconfirmed' in paymentreceipt) {
            // If it is, set the confirmed value

            isconfirmed = paymentreceipt.isconfirmed;

        }

        return {
            id: paymentreceipt.paymentreceiptid,
            paymentReceiptid: paymentreceipt.paymentreceiptid,
            paymentTransactionid: paymentreceipt.paymenttransactionid,
            paymentType: paymentreceipt.paymenttype,
            paymentStatus: paymentreceipt.paymenttype === 'collection'
                ? (isconfirmed ? 'Confirmed' : 'Unconfirmed')
                : '',
            receiverName: paymentreceipt.receivername ? `${paymentreceipt.receivername}` : '',

        }
    });

    {/** Handle Row Selection */ }
    const handleRowSelection = (selectionModel: GridRowId[]) => {
        const selectedRowIds = selectionModel.map((id) => id + "");
        setSelectedRows(selectedRowIds);
    };
    const handleConfirmPaymentsButton = () => {
        try {
            let count = 0;
            if (!selectedRows.length) {
                headerHandleAlert('Payment Receipt Required', "Please select payment receipt to confirm", 'warning');
            }
            else {

                selectedRows.map((id) => {
                    console.log(id)
                    confirmCollectionPaymentReceipt(id, 'd5be5e4b')
                    count++;

                    if (count === selectedRows.length) {
                        
                        toast.success(count + ' Payment Receipt(s) Confirmed Successfully!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                    }

                });
            }
        } catch (error) {
            headerHandleAlert('Unexpected Error', "Cannot update Payment Receipt. Please try again.", 'error');
        }

        setSelectedRows([]);
    }

    const handleViewButtonClick = (objectId: string) => {

        navigate(`/paymentReceiptDetails/${objectId}`);
    };




    return (
        <div>
            <StyledCard>

                {/*  <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#203949', height: '350px', margin: '35px 20px 0 20px', fontWeight: 330 }}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    onRowSelectionModelChange={(handleRowSelection)}
                    rowSelectionModel={selectedRows}
                /> */}



                <><Box sx={{ pt: 2, pr: 2, pl: 2 }}>
                    {paymentreceipts.length === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', marginTop: '0', marginLeft: '5vh' }}>
                          <Typography>No payment receipts.</Typography>
                          <LinearProgress sx={{ width: '20%', marginTop: '20px' }} />
                        </Box>

                    ) : (

                        <><DataGridStyle
                                    rows={rows}
                                    columns={columns.map((column) => ({
                                        ...column,
                                    }))}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[10]}
                                    checkboxSelection
                                    onRowSelectionModelChange={(handleRowSelection)}
                                    rowSelectionModel={selectedRows}

                                    isRowSelectable={(params) => {
                                        // Check the payment type of the row and disable the checkbox for direct payment types
                                        return params.row.paymentType !== 'direct';
                                    } } /><StyledButton onClick={() => handleConfirmPaymentsButton()} sx={{ color: '#FFFFFF', marginTop: '20px', justifyContent: "center" }}>
                                        Confirm
                                    </StyledButton></>
                    )}

                </Box></>

            </StyledCard>




            {/**DataGrid */}


            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} TransitionComponent={SlideTransitionDown}>
                <Alert onClose={handleCloseAlert} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                    <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Snackbar>

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

        </div>



    );
}