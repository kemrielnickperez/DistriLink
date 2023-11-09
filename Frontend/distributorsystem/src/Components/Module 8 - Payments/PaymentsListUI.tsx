import { Alert, AlertTitle, Autocomplete, Button, Card, Slide, SlideProps, Snackbar, TextField, Typography, styled } from "@mui/material";
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
    margin: "50px 28% 20px 10%",
    width: '85%',
    height: '550px',
    alignItems: 'center',
    borderRadius: '25px',
    justifyContent: 'left'
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
    marginTop: -5,
    marginLeft: 30,
    backgroundColor: '#2C85E7',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '150px',
    height: 40,
    ':hover': {
        backgroundColor: '#87BAF3',
    }
})

export default function PaymentList() {

    const navigate = useNavigate();


    {/** useStates */ }
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [paymentreceipts, setPaymentReceipts] = useState<IPaymentReceipt[]>([]);

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    function getAllPaymentReceipts() {
        axios.get<IDirectPaymentReceipt[]>('http://localhost:8080/paymentreceipt/getAllPaymentReceipts')
            .then((response) => {
                setPaymentReceipts(response.data);

            })
            .catch((error) => {
                alert("Error retrieving payment receipts. Please try again.");
                headerHandleAlert('Error', "Error retrieving payment receipts. Please try again..", 'error');
            });
    }

    useEffect(() => {
        getAllPaymentReceipts();
       
       

    }, [paymentreceipts]);
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
        { field: 'paymentStatus', headerName: 'Payment Status', width: 200 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 200 },
        {
            field: 'action',
            headerName: '',
            width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // Handle button click for this row here

                            handleViewButtonClick(params.row.paymentReceiptid);
                        }}
                    >
                        View
                    </Button>
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
            console.log(paymentreceipt.isconfirmed)
        }

        return {
            id: paymentreceipt.paymentreceiptid,
            paymentReceiptid: paymentreceipt.paymentreceiptid,
            paymentTransactionid: paymentreceipt.paymenttransaction ? paymentreceipt.paymenttransaction.paymenttransactionid : '',
            paymentType: paymentreceipt.paymenttype,
            paymentStatus: paymentreceipt.paymenttype === 'collection'
                ? (isconfirmed ? 'Confirmed' : 'Unconfirmed')
                : '',
            receiverName: paymentreceipt.cashier ? `${paymentreceipt.cashier.firstname} ${paymentreceipt.cashier.lastname}` : '',

        }
    });

    {/** Handle Row Selection */ }
    const handleRowSelection = (selectionModel: GridRowId[]) => {
        const selectedRowIds = selectionModel.map((id) => id + "");
        setSelectedRows(selectedRowIds);
    };
    const handleConfirmPaymentsButton = () => {
        try{
            
        
        let count = 0;
        if (!selectedRows.length) {
            headerHandleAlert('Payment Receipt Required', "Please select payment receipt to confirm", 'warning');
        }
        else {
            
            selectedRows.map((id) => {
              
                confirmCollectionPaymentReceipt(id, 'd5be5e4b')
                count++;

                if (count === selectedRows.length) {
                    //  alert(count + " Payment Receipts Confirmed Successfully!")
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
    }catch(error){
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
                <ContentNameTypography>Payment Receipts</ContentNameTypography>


                {/**DataGrid */}
                <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#146C94', height: '350px', margin: '35px 20px 0 20px' }}
                    columns={columns.map((column) => ({
                        ...column,
                    }))
                    }
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

                    isRowSelectable={(params) => {
                        // Check the payment type of the row and disable the checkbox for direct payment types
                        return params.row.paymentType !== 'direct';
                    }}
                />
            </StyledCard>
            <StyledButton onClick={() => handleConfirmPaymentsButton()} sx={{ color: '#FFFFFF', marginTop: '20px' }}>
                Confirm
            </StyledButton>

            {/* Alerts */}
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