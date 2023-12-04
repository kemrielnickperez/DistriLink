import { useEffect, useState } from "react";
import { IOrder } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, CircularProgress, Slide, SlideProps, Snackbar, Tab, Tabs, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}


const StyledCard = styled(Card)({
    padding: '10px 10px 10px 2px',
    margin: "45px 28% 0px 7.2%",
    width: '90%',
    height: '580px',
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

const StyledButton = styled(Button)({
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

const StyledAddButton = styled(Button)({
    backgroundColor: '#2D85E7',
    display: 'flex',
    marginTop: 26,
    marginLeft: 30,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '350px',
    height: 40,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
}
)
const TabStyle = styled(Tab)({
    width: 320,
    fontWeight: '550',
    label: {
        color: '#707070',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    }
})
const DataGridStyle = styled(DataGrid)({
    textAlign: 'center',
    fontSize: 15,
    color: '#203949',
    height: '420px',
    width: '100%',
    margin: '7px 10px 0px 0px',
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

export default function ProductDistributionList() {
    const navigate = useNavigate();

    const [order, setOrder] = useState<IOrder[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [value, setValue] = useState(0);


    {/*Tabs*/ }
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

    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);

    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios
            .get<IOrder[]>(`http://localhost:8080/order/getAllOrdersByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                headerHandleAlert('Error', "Failed to fetch orders. Please check your internet connection.", 'error');
            });

        console.log(order)
    }, []);

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
    const columnsPending: GridColDef[] = [
        { field: 'dealerId', headerName: 'Dealer ID', width: 250 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 250 },
        { field: 'orderId', headerName: 'Order Transaction ID', width: 250 },
        { field: 'orderDate', headerName: 'Order Date', width: 250 },
        {
            field: 'action', headerName: '', width: 310,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            if (params.row.confirmed === false) {

                                handleViewButtonFalse(params.row.orderId);
                            } else {
                                handleViewButtonClick(params.row.orderId);
                            }
                        }}
                    >
                        View
                    </StyledButton>
                )
            }
        }

    ]
    {/** Rows for DataGrid */ }
    const rowsPending = (order || []).filter((order) => (!order.confirmed)).map((orderItem) => ({
        id: orderItem.orderid,
        dealerId: orderItem.dealer.dealerid,
        dealerName: `${orderItem.dealer.firstname} ${orderItem.dealer.middlename} ${orderItem.dealer.lastname}`,
        orderId: orderItem.orderid,
        orderDate: orderItem.orderdate,
        confirmed: orderItem.confirmed
    }));

    {/** Rows for DataGrid */ }
    const rowsConfirmed = (order || []).filter((order) => (order.confirmed)).map((orderItem) => ({
        id: orderItem.orderid,
        dealerId: orderItem.dealer.dealerid,
        dealerName: `${orderItem.dealer.firstname} ${orderItem.dealer.middlename} ${orderItem.dealer.lastname}`,
        orderId: orderItem.orderid,
        orderDate: orderItem.orderdate,
        confirmed: orderItem.confirmed
    }));
    {/** Columns for DataGrid */ }
    const columnsConfirmed: GridColDef[] = [
        { field: 'dealerId', headerName: 'Dealer ID', width: 235 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 255 },
        { field: 'orderId', headerName: 'Order Transaction ID', width: 235 },
        { field: 'orderDate', headerName: 'Order Date', width: 235 },
        {
            field: 'action', headerName: '', width: 350,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            if (params.row.confirmed === false) {

                                handleViewButtonFalse(params.row.orderId);
                            } else {
                                handleViewButtonClick(params.row.orderId);
                            }
                        }}
                    >
                        View
                    </StyledButton>
                )
            }
        }

    ]

    const handleViewButtonClick = (objectId: string) => {
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter

        navigate(`/orderTransactionDetails/${objectId}`);
    };

    const handleViewButtonFalse = (objectId: string) => {

        navigate(`/orderConfirmation/${objectId}`);
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <StyledCard>
                <StyledAddButton onClick={() => {
                    navigate("/distributorOrderForm");
                }}>
                    Add new Product Distribution
                    <AddIcon style={{ marginTop: -5, marginLeft: 3, height: 20, width: 'auto', fontWeight: 'bolder' }} />
                </StyledAddButton>
                <Box sx={{ width: '100%', marginTop: 2, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ marginLeft: 40 }}>
                            <TabStyle label="Confirmed Orders" {...a11yProps(0)} />
                            <TabStyle label="Pending Orders" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {order === null ? (

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '200px' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <DataGridStyle
                                rows={rowsConfirmed}
                                sx={{ textAlign: 'center', color: '#203949', height: '370px', margin: '20px 10px 0px 14px' }}
                                columns={columnsConfirmed.map((column) => ({
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
                        )}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {order === null ? (

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',  marginTop: '200px'  }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <DataGridStyle
                                rows={rowsPending}
                                columns={columnsPending.map((column) => ({
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

                            />
                        )}
                    </CustomTabPanel>
                </Box>

            </StyledCard>
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
        </div>
    );
}
