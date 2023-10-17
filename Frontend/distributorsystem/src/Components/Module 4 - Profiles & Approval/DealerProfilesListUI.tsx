import { useEffect, useState } from "react";
import { IDealer } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Box, Button, Card, Grid, Modal, TextField, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React from "react";

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
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})

const StyledButton = styled(Button)({
    backgroundColor: '#2D85E7',
    color: '#FFFFFF',
    fontFamily: 'Inter',
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
    const [dealer, setDealer] = useState<IDealer[] | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios
            .get<IDealer[]>('http://localhost:8080/dealer/getAllDealers')
            .then((response) => {
                setDealer(response.data);
            })
            .catch((error) => {
                console.error('Error fetching dealer:', error);
            });
    }, []);

    {/** Columns for DataGrid */ }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Dealer ID', width: 200 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 200 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 200 },
        {
            field: 'view', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {

                            handleViewButtonClick(params.row.id);
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
                    <><StyledButton variant='contained'
                        onClick={handleOpen} >
                        Pending
                    </StyledButton><Grid item>
                            <Modal
                                open={open}
                                onClose={handleClose}
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
                                        style={{ width: '400px' }} />
                                    <Button variant='contained' sx={{
                                        background: "#2D85E7", color: "#FFFFFF", fontSize: 20, paddingLeft: 6,
                                        paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '200px', height: '60px', marginTop: '20px', marginLeft: '100px',
                                        ':hover': {
                                            backgroundColor: '#2D85E7',
                                            transform: 'scale(1.1)'
                                        },
                                        transition: 'all 0.4s',
                                    }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Modal>
                        </Grid></>

                )
            }
        },
        {
            field: 'confirm', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            
                        }}
                    >
                        Confirm
                    </StyledButton>)
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
    const rows = (dealer || []).map((dealerList) => ({
        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate
    }));

    const handleViewButtonClick = (objectId: string) => {
    
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        navigate(`/dealerProfileDetails/${objectId}`);
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
