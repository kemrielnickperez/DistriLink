import { useEffect, useState } from "react";
import { IOrder } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, Slide, SlideProps, Snackbar, Tab, Tabs, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
    margin: "20px 28% 20px 7.2%",
    width: '90%',
    height: '670px',
    alignItems: 'center',
    borderRadius: '10px',
    justifyContent: 'center'
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
    backgroundColor: '#2D85E7',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '50px',
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
    marginLeft: 30,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '350px',
    height: 35,
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


    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios
            .get<IOrder[]>('http://localhost:8080/order/getAllOrders')
            .then((response) => {
                setOrder(response.data);
            })
            .catch((error) => {
                headerHandleAlert('Error', "Failed to fetch orders. Please check your internet connection.", 'error');
            });
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
            field: 'confirmed',
            headerName: 'Status',
            width: 200,
            renderCell: (params: { row: any; }) => {
                const isConfirmed = params.row.confirmed;

                return (
                    <div>
                        {isConfirmed ? <span>Confirmed</span> : <span>Pending</span>}
                    </div>
                );
            }
        },
        {
            field: 'action', headerName: '', width: 150,
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
            field: 'confirmed',
            headerName: 'Status',
            width: 200,
            renderCell: (params: { row: any; }) => {
                const isConfirmed = params.row.confirmed;

                return (
                    <div>
                        {isConfirmed ? <span>Confirmed</span> : <span>Pending</span>}
                    </div>
                );
            }
        },
        {
            field: 'action', headerName: '', width: 150,
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
                <ContentNameTypography>Product Distribution</ContentNameTypography>
                <StyledAddButton onClick={() => {
                    navigate("/distributorOrderForm");
                }}>Add new Product Distribution</StyledAddButton>
                <Box sx={{ width: '100%', marginTop: 3, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ marginLeft: 40 }}>
                            <TabStyle label="Confirmed Orders" {...a11yProps(0)} />
                            <TabStyle label="Pending Orders" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <DataGrid
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
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <DataGrid
                            rows={rowsPending}
                            sx={{ textAlign: 'center', color: '#203949', height: '370px', margin: '20px 10px 0px 14px' }}
                            columns={columnsPending.map((column) => ({
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
