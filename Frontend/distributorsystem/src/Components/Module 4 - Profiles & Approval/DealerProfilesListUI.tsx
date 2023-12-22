import { useContext, useEffect, useRef, useState } from "react";
import { IArchivedDealer, IDealer, IDistributor, IDealerDocument } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, CircularProgress, Grid, Modal, Slide, SlideProps, Snackbar, Tab, Tabs, TextField, TextFieldProps, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import moment from "moment";
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

    const [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, resetDealer, updateDealerCreditLimit, isDealerFound, isDealerConfirmed, dealer, dealerRemainingCredit, getDealerByIDForProfile] = useRestDealer();

    const [dealers, setDealers] = useState<IDealer[] | null>(null);
    const [archivedDealer, setArchivedDealer] = useState<IArchivedDealer[] | null>(null);
    const [openPending, setOpenPending] = useState(false);
    const handlePendingOpen = () => setOpenPending(true);
    const handlePendingClose = () => setOpenPending(false);
    const [openDeclinedModal, setOpenDeclinedModal] = useState(false);
    const handleDeclinedOpen = () => setOpenDeclinedModal(true);
    const handleDeclinedClose = () => setOpenDeclinedModal(false);
    const [creditLimitModalOpen, setCreditLimitModalOpen] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [value, setValue] = useState(0);



    {/*Tabs*/ }

    const [selectedDealerId, setSelectedDealerId] = useState<string>("");

    const creditLimitRef = useRef<TextFieldProps>(null);
    const pendingReasonRef = useRef<TextFieldProps>(null);
    const declineReasonRef = useRef<TextFieldProps>(null);

    const userFromStorage = JSON.parse(localStorage.getItem("user")!);
    //userFromStorage.distributor.


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
        axios.get<IDealer[]>(`http://localhost:8080/dealer/getAllDealersByDistributorID/${userFromStorage.distributor.distributorid}`)
            .then((response) => {
                setDealers(response.data);

            })
            .catch((error) => {

            });
    }

    function getAllArchivedDealers() {
        axios.get<IArchivedDealer[]>(`http://localhost:8080/archived/getAllArchivedDealersByDistributorID/${userFromStorage.distributor.distributorid}`)
            .then((response) => {
                setArchivedDealer(response.data);


            })
            .catch((error) => {

            });
    }

    const handleConfirmOpen = () => setCreditLimitModalOpen(true);
    const handleConfirmClose = () => setCreditLimitModalOpen(false);
    const [tabValue, setTabValue] = React.useState('unconfirmed');



    const toggleTables1 = (tabValue: string) => {
        setTabValue(tabValue);
    };




    {/** Columns for DataGrid */ }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 210 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 190 },
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
            field: 'pending', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {

                return (
                    <>
                        <StyledButton variant='contained'
                            onClick={() => {
                                setSelectedDealerId(params.row.id);
                                handlePendingOpen();
                            }} >
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
                                    <StyledButton onClick={() => handlePendingClick(selectedDealerId)} sx={{ marginTop: '20px', marginLeft: '150px' }}>
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
            field: 'confirm', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {


                return (
                    <><StyledButton
                        style={{
                            width: 120
                        }}
                        onClick={() => {
                            setSelectedDealerId(params.row.id);
                            handleConfirmOpen();
                        }}
                    >
                        <CheckIcon style={{ marginTop: -5, marginLeft: -3, height: 20, width: 'auto', color: 'rgb(116, 254, 189)', fontWeight: 'bolder' }} />
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
                                        onClick={() =>
                                            handleConfirmButton(selectedDealerId)
                                        }
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
            field: 'decline', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <>
                        <StyledButton
                            style={{ width: 120 }}
                            onClick={() => {
                                setSelectedDealerId(params.row.id);
                                handleDeclinedOpen();
                            }} >
                            <CloseIcon style={{ marginTop: -3, paddingLeft: -8, height: 20, width: 'auto', color: 'rgb(227, 80, 155)', fontWeight: 'bolder' }} />
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
                                    <StyledButton onClick={() => handleDeclineClick(selectedDealerId)}
                                        sx={{ marginTop: '20px', marginLeft: '150px' }}>
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
        { field: 'remarks', headerName: 'Reason', width: 385 },
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




        //window.location.reload();

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

    useEffect(() => {
        getAllDealers();
        getAllArchivedDealers();

    }, [dealers]);









    return (
        <div>
            <StyledCard>
                {/* <ContentNameTypography>Dealer Profile List</ContentNameTypography> */}

                <Box sx={{ width: '100%', marginTop: 4, marginLeft: 0.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={(event, newValue) => toggleTables1(newValue)} style={{ marginLeft: 40 }}>
                            <TabStyle label="Unconfirmed Dealers" value="unconfirmed" />
                            <TabStyle label="Confirmed Dealers" value="confirmed" />
                            <TabStyle label="Declined Dealers" value="declined" />
                        </Tabs>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        {tabValue === 'unconfirmed' && (
                            <>
                                {dealers === null ? (
                                    // Display whatever you want when dealers is empty
                                    // For example, you can show a message or another component
                                    <div style={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
                                        marginTop: '200px'
                                    }}>
                                        <CircularProgress />
                                    </div>

                                ) : (
                                    // Display the DataGrid when dealers is not empty
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
                                )}
                            </>


                        )}

                        {tabValue === 'confirmed' && (
                            <>
                                {dealers === null ? (
                                    // Display whatever you want when dealers is empty
                                    // For example, you can show a message or another component
                                    <div style={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
                                        marginTop: '200px'
                                    }}>
                                        <CircularProgress />
                                    </div>

                                ) : (
                                    <DataGridStyle rows={rowsConfirmed} columns={columnsConfirmed.map((column) => ({
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
                            </>
                        )}

                        {tabValue === 'declined' && (
                            <>
                                {archivedDealer === null ? (
                                    // Display whatever you want when dealers is empty
                                    // For example, you can show a message or another component
                                    <div style={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
                                        marginTop: '200px'
                                    }}>
                                        <CircularProgress />
                                    </div>

                                ) : (
                                    <DataGridStyle rows={rowsDeclined} columns={columnsDeclined.map((column) => ({
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
                            </>
                        )}
                    </Box>
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