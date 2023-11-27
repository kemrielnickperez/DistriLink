import { useEffect, useState } from "react";
import { IDealer, IDealerDocument } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, Grid, Modal, Slide, SlideProps, Snackbar, Tab, Tabs, TextField, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { ToastContainer, toast } from "react-toastify";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import profilepicture from "../../Global Components/Images/profilepicture.png"



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledCard = styled(Card)({
    padding: '10px 10px 10px 2px',
    margin: "50px 28% 0px 7.2%",
    width: '90%',
    height: '550px',
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
const StyledButtonDecline = styled(Button)({
    backgroundColor: 'rgb(221, 91, 91,0.8)',
    borderRadius: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '100px',
    height: 35,
    ':hover': {
        backgroundColor: '#de5b5b',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
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
export default function DealerProfileListUI() {
    const navigate = useNavigate();
    const [dealer1, setDealer1] = useState<IDealer[] | null>(null);
    const [openPending, setOpenPending] = useState(false);
    const handlePendingOpen = () => setOpenPending(true);
    const handlePendingClose = () => setOpenPending(false);
    const [creditLimitModalOpen, setCreditLimitModalOpen] = useState(false);
    const handleConfirmOpen = () => setCreditLimitModalOpen(true);
    const handleConfirmClose = () => setCreditLimitModalOpen(false);
    const [remarks, setRemarks] = useState(""); // State to capture remarks
    const [creditlimit, setCreditlimit] = useState(0);
    const [getDealerByID, newDealer, updateDealer, confirmDealer, markDealerAsPending, isDealerFound, dealer,] = useRestDealer();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [value, setValue] = useState(0);
    const [filteredDealers, setFilteredDealers] = useState<IDealer[] | null>(null);
    const [filteredDealersConfirmed, setFilterDealersConfirmed] = useState<IDealer[] | null>(null);
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
            .get<IDealer[]>('http://localhost:8080/dealer/getAllDealers')
            .then((response) => {
                setDealer1(response.data);
                // headerHandleAlert('Success', "Dealers fetched successfully.", 'success');

            })
            .catch((error) => {
                console.error('Error fetching dealer:', error);
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
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 210 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 190 },
        {
            field: 'view', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <StyledButton
                        onClick={() => {
                            handleViewButtonClick(dealer.id);
                        }}
                    >
                        View
                    </StyledButton>)
            }
        },
        {
            field: 'pending', headerName: '', width: 145,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row
                return (
                    <><StyledButton
                        // variant='contained'
                        onClick={handlePendingOpen} >
                        Pending
                    </StyledButton><Grid item>
                            <Modal
                                open={openPending}
                                onClose={handlePendingClose}
                                aria-labelledby="modal-title"
                                aria-describedby="Comment"
                            >
                                <Box sx={style}>
                                    <Typography style={{ color: "#2D85E7", fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }} id="modal-title"> Reasons </Typography>
                                    <TextField
                                        id="filled-multiline-static"
                                        label="State the Reason for Pending"
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        style={{ width: '400px' }}
                                        value={remarks} // Capture the remarks
                                        onChange={(e) => setRemarks(e.target.value)}
                                    />
                                    <StyledButton onClick={() => handlePendingClick(dealer.id)} sx={{ marginTop: '20px', marginLeft: '150px' }}>
                                        Submit
                                    </StyledButton>
                                </Box>
                            </Modal>
                        </Grid></>

                )
            }
        },
        {
            field: 'confirm', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <><StyledButton
                        style={{
                            width: 120
                        }}
                        onClick={handleConfirmOpen}
                    >
                        <CheckIcon style={{ marginTop: -5, marginLeft: -3, height: 20, width: 'auto', color: 'rgb(116, 254, 189)', fontWeight: 'bolder' }} />
                        Confirm
                    </StyledButton><Grid item>
                            <Modal
                                open={creditLimitModalOpen}
                                onClose={handleConfirmClose}
                                aria-labelledby="credit-limit-modal-title"
                                aria-describedby="Credit Limit"
                            >
                                <Box sx={style}>
                                    <Typography
                                        style={{ color: "#2D85E7", fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
                                        id="credit-limit-modal-title"
                                    >
                                        Set Credit Limit
                                    </Typography>
                                    <TextField
                                        label="Credit Limit"
                                        variant="filled"
                                        style={{ width: '400px' }}
                                        value={creditlimit}
                                        onChange={(e) => setCreditlimit(parseFloat(e.target.value))}
                                    />
                                    <StyledButton
                                        onClick={() => handleConfirmButton(dealer.id)}
                                        sx={{ marginTop: '20px', marginLeft: '150px' }}
                                    >
                                        Set
                                    </StyledButton>
                                </Box>
                            </Modal>
                        </Grid></>
                );
            }
        },
        {
            field: 'decline', headerName: '', width: 160,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <StyledButton
                        style={{
                            width: 120
                        }}
                        onClick={() => {
                            //  handleDeclineClick(dealer.id)
                        }}
                    >
                        <CloseIcon style={{ marginTop: -3, paddingLeft: -8, height: 20, width: 'auto', color: 'rgb(227, 80, 155)', fontWeight: 'bolder' }} />
                        Decline
                    </StyledButton>)
            }
        },

    ]
    {/** Rows for DataGrid */ }
    const rows = (dealer1 || []).filter((dealer) => !dealer.confirmed).map((dealerList) => ({

        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate,

    }));


    {/** Columns for Confirmed */ }
    const columnsConfirmed: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 280 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 410 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 303 },
        {
            field: 'view', headerName: '', width: 320,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <StyledButton
                        onClick={() => {

                            handleViewButtonClick(dealer.id);
                        }}
                    >
                        View
                    </StyledButton>)
            }
        },

    ]
    {/** Rows for DataGrid */ }
    const rowsConfirmed = (dealer1 || []).filter((dealer) => dealer.confirmed).map((dealerList) => ({
        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate,
    }));



    // const filterRows= showConfirmDealers ? rows.filter((dealer1)?.map(dealerList)=>())
    const handleViewButtonClick = (objectId: string) => {
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        navigate(`/dealerProfileDetails/${objectId}`);
    };

    const handleConfirmButton = (objectId: string) => {
        // Find the dealer to confirm in the list
        const dealerToConfirm = dealer1?.find((dealerItem) => dealerItem.dealerid === objectId);

        if (dealerToConfirm) {
            // Create the updated dealer object with the new credit limit and confirmed status
            const updatedDealer = {
                ...dealerToConfirm,
                confirmed: true,
                creditlimit: creditlimit,
            };

            // Update the state with the updated dealer
            setDealer1((prevDealerList) => {
                if (prevDealerList) {
                    return prevDealerList.map((dealerItem) =>
                        dealerItem.dealerid === objectId ? updatedDealer : dealerItem
                    );
                } else {
                    return null; // Handle the case when dealer1 is null
                }
            });

            // Call the confirmDealer function to update the dealer's status and credit limit on the server
            //confirmDealer(objectId, creditlimit);
            // Close the modal after submitting
            handleConfirmClose();
        }

    };

    const handlePendingClick = (objectId: string) => {
        // Find the dealer to mark as pending in the list
        const dealerToMarkAsPending = dealer1?.find((dealerItem) => dealerItem.dealerid === objectId);

        if (dealerToMarkAsPending) {
            // Create the updated dealer object with "confirmed" property set to false and include remarks
            const updatedDealer = {
                ...dealerToMarkAsPending,
                confirmed: false,
                remarks: remarks,
            };

            // Update the state with the updated dealer
            setDealer1((prevDealerList) => {
                if (prevDealerList) {
                    return prevDealerList.map((dealerItem) =>
                        dealerItem.dealerid === objectId ? updatedDealer : dealerItem
                    );
                } else {
                    return null; // Handle the case when dealer1 is null
                }
            });

            // Call the markDealerAsPending function to update the dealer's status on the server
            // markDealerAsPending(objectId, remarks);

            // Close the modal after submitting
            handlePendingClose();
        }
    };


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <StyledCard>
                {/* <ContentNameTypography>Dealer Profile List</ContentNameTypography> */}
                <Box sx={{ width: '100%', marginTop: 4, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ marginLeft: 40 }}>
                            <TabStyle label="Unconfirm" {...a11yProps(0)} />
                            <TabStyle label="Confirmed" {...a11yProps(1)} />
                            <TabStyle label="Decline" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <DataGridStyle
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

                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <DataGridStyle
                            rows={rowsConfirmed}

                            columns={columnsConfirmed.map((column) => ({
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
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Decline
                    </CustomTabPanel>
                </Box>
            </StyledCard>

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
        </div>

    );
}
