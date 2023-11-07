import { useEffect, useState } from "react";
import { IDealer } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Box, Button, Card, Grid, Modal, TextField, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";

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
    margin: "50px 28% 20px 10%",
    width: '85%',
    height: '550px',
    alignItems: 'center',
    borderRadius: '25px',
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
    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios
            .get<IDealer[]>('http://localhost:8080/dealer/getAllDealers')
            .then((response) => {
                setDealer1(response.data);
            })
            .catch((error) => {
                console.error('Error fetching dealer:', error);
            });
    }, []);

    {/** Columns for DataGrid */ }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 200 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 200 },
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
            field: 'pending', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row
                return (
                    <><StyledButton variant='contained'
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
                        onClick={handleConfirmOpen} >
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
            field: 'decline', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here

                        }}
                    >
                        Decline
                    </StyledButton>)
            }
        },

    ]
    {/** Rows for DataGrid */ }
    const rows = (dealer1 || []).map((dealerList) => ({
        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate
    }));

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
            confirmDealer(objectId, creditlimit);
    
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
            markDealerAsPending(objectId, remarks);

            // Close the modal after submitting
            handlePendingClose();
        }
    };



    return (
        <div>
            <StyledCard>
                <ContentNameTypography>Dealer Profile List</ContentNameTypography>

                <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#203949', height: '370px', margin: '45px 30px 0 30px' }}
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
            </StyledCard>
        </div>
    );
}
