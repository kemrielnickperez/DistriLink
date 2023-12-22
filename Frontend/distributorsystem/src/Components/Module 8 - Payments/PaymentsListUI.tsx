import { Alert, AlertTitle, Autocomplete, Box, Button, Card, CircularProgress, LinearProgress, Slide, SlideProps, Snackbar, Tab, Tabs, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { ICollectionPaymentReceipt, IDirectPaymentReceipt, IEmployee, IOrder, IPaymentReceipt } from "../../RestCalls/Interfaces";
import { auto } from "@popperjs/core";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const TabStyle = styled(Tab)({
    width: 320,
    fontWeight: '550',
    label: {
        color: '#707070',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    }
})

const StyledCard = styled(Card)({
    padding: '10px 10px 10px 2px',
    margin: "50px 28% 0px 7.2%",
    width: '90%',
    height: '570px',
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

    const userFromStorage = JSON.parse(localStorage.getItem("user")!);


    const cashierFromStorage = JSON.parse(localStorage.getItem("cashier")!);


    {/** useStates */ }
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [paymentreceipts, setPaymentReceipts] = useState<IPaymentReceipt[]>([]);
    const [directPaymentReceipts, setDirectPaymentReceipts] = useState<IDirectPaymentReceipt[]>([]);
    const [collectionPaymentReceipts, setCollectionPaymentReceipts] = useState<ICollectionPaymentReceipt[]>([]);

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');



    const [tabValue, setTabValue] = React.useState('direct');

    const toggleTables = (tabValue: string) => {
        setTabValue(tabValue);
    };

    const userSignedIn =
        userFromStorage.tableName === 'Cashier'
            ? userFromStorage.cashier

            : userFromStorage.tableName === 'Sales Associate'
                ? userFromStorage.salesAssociate

                : userFromStorage.tableName === 'Sales Associate and Cashier'
                    ? userFromStorage.salesAssociateAndCashier
                    : userFromStorage.distributor;


    function getAllPaymentReceipts() {

        if (userSignedIn) {
            const distributorId =
                userFromStorage.tableName === 'Cashier'
                    ? userFromStorage.cashier.distributor.distributorid

                    : userFromStorage.tableName === 'Sales Associate'
                        ? userFromStorage.salesAssociate.distributor.distributorid

                        : userFromStorage.tableName === 'Sales Associate and Cashier'
                            ? userFromStorage.salesAssociateAndCashier.distributor.distributorid
                            : userFromStorage.distributor.distributorid;

            axios
                .get<IPaymentReceipt[]>(`http://localhost:8080/paymentreceipt/getAllPaymentReceiptsByDistributorID/${distributorId}`)
                .then((response) => {
                    setPaymentReceipts(response.data);

                    const directPaymentReceipts: IDirectPaymentReceipt[] = response.data.filter(
                        (receipt) => receipt.paymenttype === 'direct'
                    ) as IDirectPaymentReceipt[];

                    const collectionPaymentReceipts: ICollectionPaymentReceipt[] = response.data.filter(
                        (receipt) => receipt.paymenttype === 'collection'
                    ) as ICollectionPaymentReceipt[];

                    setDirectPaymentReceipts(directPaymentReceipts);
                    setCollectionPaymentReceipts(collectionPaymentReceipts);
                })
                .catch((error) => {
                    // Handle errors here
                });
        }

        /*   if (userFromStorage && userFromStorage.tableName === 'Cashier') {
              axios.get<IPaymentReceipt[]>(`http://localhost:8080/paymentreceipt/getAllPaymentReceiptsByDistributorID/${userFromStorage.cashier.distributor.distributorid}`)
                  .then((response) => {
                      setPaymentReceipts(response.data);
  
                      const directPaymentReceipts: IDirectPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'direct'
                      ) as IDirectPaymentReceipt[];
  
                      // Filter CollectionPaymentReceipts
                      const collectionPaymentReceipts: ICollectionPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'collection'
                      ) as ICollectionPaymentReceipt[];
  
  
                      // You may want to set these filtered arrays in your state or use them as needed
                      setDirectPaymentReceipts(directPaymentReceipts);
                      setCollectionPaymentReceipts(collectionPaymentReceipts);
  
                  })
                  .catch((error) => {
  
                  });
          }
          else if (userFromStorage && userFromStorage.tableName === 'Sales Associate and Cashier') {
              axios.get<IPaymentReceipt[]>(`http://localhost:8080/paymentreceipt/getAllPaymentReceiptsByDistributorID/${userFromStorage.salesAssociateAndCashier.distributor.distributorid}`)
                  .then((response) => {
                      setPaymentReceipts(response.data);
  
                      const directPaymentReceipts: IDirectPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'direct'
                      ) as IDirectPaymentReceipt[];
  
                      // Filter CollectionPaymentReceipts
                      const collectionPaymentReceipts: ICollectionPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'collection'
                      ) as ICollectionPaymentReceipt[];
  
  
                      // You may want to set these filtered arrays in your state or use them as needed
                      setDirectPaymentReceipts(directPaymentReceipts);
                      setCollectionPaymentReceipts(collectionPaymentReceipts);
  
                  })
                  .catch((error) => {
  
                  });
          }
          else {
              axios.get<IPaymentReceipt[]>(`http://localhost:8080/paymentreceipt/getAllPaymentReceiptsByDistributorID/${userFromStorage.distributor.distributorid}`)
                  .then((response) => {
                      setPaymentReceipts(response.data);
  
                      const directPaymentReceipts: IDirectPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'direct'
                      ) as IDirectPaymentReceipt[];
  
                      // Filter CollectionPaymentReceipts
                      const collectionPaymentReceipts: ICollectionPaymentReceipt[] = response.data.filter(
                          (receipt) => receipt.paymenttype === 'collection'
                      ) as ICollectionPaymentReceipt[];
  
  
                      // You may want to set these filtered arrays in your state or use them as needed
                      setDirectPaymentReceipts(directPaymentReceipts);
                      setCollectionPaymentReceipts(collectionPaymentReceipts);
  
                  })
                  .catch((error) => {
  
                  });
          } */
    }

    useEffect(() => {
        getAllPaymentReceipts();
    }, [paymentreceipts, collectionPaymentReceipts]);
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
        { field: 'paymentReceiptid', headerName: 'Payment Receipt ID', width: 300 },
        { field: 'paymentTransactionid', headerName: 'Payment Transaction ID', width: 300 },
        { field: 'paymentType', headerName: 'Payment Type', width: 300 },
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


    const directColumns: GridColDef[] = [
        { field: 'paymentReceiptid', headerName: 'Payment Receipt ID', width: 300 },
        { field: 'paymentTransactionid', headerName: 'Payment Transaction ID', width: 300 },
        { field: 'receiverName', headerName: 'Receiver Name', width: 360 },
        {
            field: 'action',
            headerName: '',
            width: 350,
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

    const collectioncolumns: GridColDef[] = [
        { field: 'paymentReceiptid', headerName: 'Payment Receipt ID', width: 260 },
        { field: 'paymentTransactionid', headerName: 'Payment Transaction ID', width: 260 },

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
        { field: 'receiverName', headerName: 'Receiver Name', width: 260 },
        {
            field: 'action',
            headerName: '',
            width: 270,
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

    const directrows = directPaymentReceipts.map((paymentreceipt) => {

        return {
            id: paymentreceipt.paymentreceiptid,
            paymentReceiptid: paymentreceipt.paymentreceiptid,
            paymentTransactionid: paymentreceipt.paymenttransactionid,
            receiverName: paymentreceipt.receivername ? `${paymentreceipt.receivername}` : '',

        }
    });

    const collectionrows = collectionPaymentReceipts.map((paymentreceipt) => {
        return {
            id: paymentreceipt.paymentreceiptid,
            paymentReceiptid: paymentreceipt.paymentreceiptid,
            paymentTransactionid: paymentreceipt.paymenttransactionid,
            paymentStatus: paymentreceipt.isconfirmed ? 'Confirmed' : 'Unconfirmed',
            receiverName: paymentreceipt.receivername ? `${paymentreceipt.receivername}` : '',

        }
    });

    {/** Handle Row Selection */ }
    const handleRowSelection = (selectionModel: GridRowId[]) => {
        const selectedRowIds = selectionModel.map((id) => id + "");
        setSelectedRows(selectedRowIds);
    };
    const handleConfirmPaymentsButton = () => {

        const userSignedInID =
            userFromStorage.tableName === 'Cashier'
                ? userFromStorage.cashier.employeeid

                : userFromStorage.tableName === 'Sales Associate'
                    ? userFromStorage.salesAssociate.employeeid

                    : userFromStorage.tableName === 'Sales Associate and Cashier'
                        ? userFromStorage.salesAssociateAndCashier.employeeid

                        : userFromStorage.distributor.distributorid;


        try {
            let count = 0;
            if (!selectedRows.length) {
                headerHandleAlert('Payment Receipt Required', "Please select payment receipt to confirm", 'warning');
            }
            else {

                selectedRows.map((id) => {

                    confirmCollectionPaymentReceipt(id, userSignedInID)
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


                <Box sx={{ width: '100%', marginTop: 2, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={(event, newValue) => toggleTables(newValue)} style={{ marginLeft: 40 }}>
                            <TabStyle label="Direct Payment Receipts" value="direct" />
                            <TabStyle label="CoLlection Payment Receipts" value="collection" />
                        </Tabs>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        {tabValue === 'direct' && (
                            <>
                                {directPaymentReceipts.length === 0 ? (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', marginTop: '0', marginLeft: '5vh' }}>
                                        <Typography>No payment receipts.</Typography>
                                        <LinearProgress sx={{ width: '20%', marginTop: '20px' }} />
                                    </Box>
                                ) : (
                                    // Display the DataGrid when dealers is not empty
                                    <DataGridStyle rows={directrows} columns={directColumns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 10,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[10]}
                                    />
                                )}
                            </>

                        )}
                        {tabValue === 'collection' && (
                            <>
                                {collectionPaymentReceipts.length === 0 ? (
                                    // Display whatever you want when dealers is empty
                                    // For example, you can show a message or another component
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', marginTop: '0', marginLeft: '5vh' }}>
                                        <Typography>No payment receipts.</Typography>
                                        <LinearProgress sx={{ width: '20%', marginTop: '20px' }} />
                                    </Box>

                                ) : (
                                    <>
                                        <DataGridStyle rows={collectionrows} columns={collectioncolumns}
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

                                        />

                                        <StyledButton onClick={() => handleConfirmPaymentsButton()} sx={{ color: '#FFFFFF', justifyContent: "center" }}>
                                            Confirm
                                        </StyledButton>
                                    </>

                                )}
                            </>
                        )}
                    </Box>

                </Box>


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

        </div >



    );
}