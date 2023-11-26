import { useContext, useEffect, useRef, useState } from "react";
import { IArchivedDealer, IDealer, IDistributor } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, Grid, Modal, Slide, SlideProps, Snackbar, Tab, Tabs, TextField, TextFieldProps, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";



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
    margin: "50px 28% 20px 7.2%",
    width: '90%',
    height: '650px',
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
    width: '100px',
    height: 35,
    ':hover': {
        backgroundColor: '#2D85E7',
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
export default function DealerProfileListUI() {
    const navigate = useNavigate();
    const [dealers, setDealers] = useState<IDealer[] | null>(null);
    const [archivedDealer, setArchivedDealer] = useState<IArchivedDealer[] | null>(null);
    const [openPending, setOpenPending] = useState(false);
    const handlePendingOpen = () => setOpenPending(true);
    const handlePendingClose = () => setOpenPending(false);
    const [openDeclinedModal, setOpenDeclinedModal] = useState(false);
    const handleDeclinedOpen = () => setOpenDeclinedModal(true);
    const handleDeclinedClose = () => setOpenDeclinedModal(false);
    const [creditLimitModalOpen, setCreditLimitModalOpen] = useState(false);

    const [remarks, setRemarks] = useState(""); // State to capture remarks
    const [creditlimit, setCreditlimit] = useState(0);
    const  [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, updateDealerCreditLimit, isDealerFound, isDealerConfirmed, dealer,] = useRestDealer();
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



    const creditLimitRef = useRef<TextFieldProps>(null);
    const pendingReasonRef = useRef<TextFieldProps>(null);
    const declineReasonRef = useRef<TextFieldProps>(null);

    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);


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


    function getAllDealers() {
        axios.get<IDealer[]>(`http://localhost:8080/dealer/getAllDealersByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setDealers(response.data);

            })
            .catch((error) => {

                alert("Error retrieving payment receipts. Please try again.");
            });
    }

    function getAllArchivedDealers() {
        axios.get<IArchivedDealer[]>(`http://localhost:8080/archived/getAllArchivedDealersByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setArchivedDealer(response.data);

            })
            .catch((error) => {

                alert("Error retrieving payment receipts. Please try again.");
            });
    }

    const handleConfirmOpen = () => setCreditLimitModalOpen(true);
    const handleConfirmClose = () => setCreditLimitModalOpen(false);

    useEffect(() => {

        getAllDealers();
        getAllArchivedDealers();
      

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
        { field: 'submissionDate', headerName: 'Date Submitted', width: 203 },


        
        {
            field: 'view',
            headerName: '',
            width: 150,
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
            field: 'confirm', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <><StyledButton
                        onClick={handleConfirmOpen} >
                        Confirm
                    </StyledButton>
                         <Grid item>
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

                                        inputRef={creditLimitRef}

                                    />
                                    <StyledButton
                                        onClick={() => handleConfirmButton(dealer.id)}
                                        sx={{ marginTop: '20px', marginLeft: '150px' }}
                                    >
                                        Set
                                    </StyledButton>
                                </Box>
                            </Modal>
                        </Grid> 
                    </>
                );
            }
        },
        {
            field: 'pending', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row
                return (
                    <>
                        <StyledButton variant='contained'
                            onClick={handlePendingOpen} >
                            Pending
                        </StyledButton>
                          <Grid item>
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
                                        inputRef={pendingReasonRef}
                                    />
                                    <StyledButton onClick={() => handlePendingClick(dealer.id)} sx={{ marginTop: '20px', marginLeft: '150px' }}>
                                        Submit
                                    </StyledButton>
                                </Box>
                            </Modal>
                        </Grid> 
                    </>

                )
            }
        },

        {
            field: 'decline', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                return (
                    <>
                        <StyledButton
                            onClick={handleDeclinedOpen} >
                            Decline
                        </StyledButton>
                         <Grid item>
                            <Modal
                                open={openDeclinedModal}
                                onClose={handleDeclinedClose}
                                aria-labelledby="modal-title"
                                aria-describedby="Comment"
                            >
                                <Box sx={style}>
                                    <Typography style={{ color: "#2D85E7", fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }} id="decline-modal-title"> Reasons </Typography>
                                    <TextField
                                        label="State the Reason for Decline"
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        style={{ width: '400px' }}
                                        inputRef={declineReasonRef}
                                    />
                                    <StyledButton onClick={() => handleDeclineClick(dealer.id)} sx={{ marginTop: '20px', marginLeft: '150px' }}>
                                        Submit
                                    </StyledButton>
                                </Box>
                            </Modal>
                        </Grid> 
                    </>
                );
            }
        },

    ]
    {/** Rows for DataGrid */ }

    const rows = (dealers || []).filter((dealer) => !dealer.confirmed).map((dealerList) => ({

        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate,


    }));

    {/** Columns for Confirmed */ }
    const columnsConfirmed: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 210 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 203 },
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

    ]
    {/** Rows for DataGrid */ }
    const rowsConfirmed = (dealers || []).filter((dealer) => dealer.confirmed).map((dealerList) => ({
        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate,
    }));

    {/** Columns for Declined */ }

    const columnsDeclined: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 210 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 210 },
        { field: 'archiveDate', headerName: 'Date Declined', width: 210 },
        { field: 'remarks', headerName: 'Reason', width: 210 },
    ]
    {/** Rows for DataGrid */ }
    const rowsDeclined = (archivedDealer || []).map((archivedDealerList) => ({
        id: archivedDealerList.dealerid,
        dealerName: `${archivedDealerList.firstname} ${archivedDealerList.middlename} ${archivedDealerList.lastname}`,
        submissionDate: archivedDealerList.submissiondate,
        archiveDate: archivedDealerList.datearchived,
        remarks: archivedDealerList.remarks,
    }));




    // const filterRows= showConfirmDealers ? rows.filter((dealer1)?.map(dealerList)=>())
    const handleViewButtonClick = (objectId: string) => {
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        navigate(`/dealerProfileDetails/${objectId}`);
    };

    const handleConfirmButton = (objectId: string) => {

        // Call the confirmDealer function to update the dealer's status and credit limit on the server
        confirmDealer(objectId, Number(creditLimitRef.current?.value));

        // Close the modal after submitting
        handleConfirmClose();
        getAllDealers();

    };

    const handlePendingClick = (objectId: string) => {

        // Call the markDealerAsPending function to update the dealer's status on the server
        markDealerAsPending(objectId, pendingReasonRef.current!.value + "");

        // Close the modal after submitting
        handlePendingClose();


    };

    const handleDeclineClick = (objectId: string) => {
        // Find the dealer to mark as pending in the list

        const dateArchive = moment().format('YYYY-MM-DD');


        // Call the declineDealer function to update the dealer's status on the server
        declineDealer(objectId, declineReasonRef.current!.value + "", dateArchive);

        handleDeclinedClose();
        getAllArchivedDealers();
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <StyledCard>
                <ContentNameTypography>Dealer Profile List</ContentNameTypography>
                <Box sx={{ width: '100%', marginTop: 3, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ marginLeft: 40 }}>
                            <TabStyle label="Unconfirmed Dealers" {...a11yProps(0)} />
                            <TabStyle label="Confirmed Dealers" {...a11yProps(1)} />
                            <TabStyle label="Declined Dealers (Archived)" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <DataGrid
                            rows={rows}
                            sx={{ textAlign: 'center', fontSize: 15, color: '#203949', height: '370px', margin: '30px 10px 0px 17px' }}
                            columns={columns.map((column) => ({
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
                            rows={rowsConfirmed}
                            sx={{ textAlign: 'center', fontSize: 15, color: '#203949', height: '370px', margin: '30px 10px 0px 17px' }}
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
                    <CustomTabPanel value={value} index={2}>
                        <DataGrid
                            rows={rowsDeclined}
                            sx={{ textAlign: 'center', fontSize: 15, color: '#203949', height: '370px', margin: '30px 10px 0px 17px' }}
                            columns={columnsDeclined.map((column) => ({
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
