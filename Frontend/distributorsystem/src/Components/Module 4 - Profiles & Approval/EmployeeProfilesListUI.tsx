import { useEffect, useState } from "react";
import { IEmployee } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Box, Button, Card, CircularProgress, Slide, SlideProps, Snackbar, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

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

const DataGridStyle = styled(DataGrid)({

    textAlign: 'center',
    fontSize: 15,
    color: '#203949',
    height: '520px',
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

export default function EmployeeProfileListUI() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<IEmployee[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');


    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);


    function getAllEmployees() {
        axios.get<IEmployee[]>(`http://localhost:8080/employee/getAllEmployeesByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setEmployees(response.data);
               
            })
            .catch((error) => {
                headerHandleAlert('Error', "Failed to fetch employees. Please check your internet connection.", 'error');
               
            });
    }


    useEffect(() => {
       getAllEmployees();
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
        { field: 'id', headerName: 'Employee ID', width: 300 },
        { field: 'employeeName', headerName: 'Employee Name', width: 300 },
        { field: 'position', headerName: 'Position', width: 350 },
        {
            field: 'action', headerName: '', width: 350,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            handleViewButtonClick(params.row.id);
                        }}
                    >
                        View
                    </StyledButton>
                )
            }
        }

    ]
    {/** Rows for DataGrid */ }
    const rows = (employees || []).map((employeeList) => ({
        id: employeeList.employeeid,
        employeeName: `${employeeList.firstname} ${employeeList.middlename} ${employeeList.lastname}`,
        position: [
            employeeList.iscashier && "Cashier",
            employeeList.iscollector && (employeeList.iscashier ? 'Collector' : 'Collector'),
            employeeList.issalesassociate && (employeeList.iscashier || employeeList.iscollector ? 'Sales Associate' : 'Sales Associate')
        ].filter(Boolean).join(', ')
    }));

    const handleViewButtonClick = (objectId: string) => {
        navigate(`/employeeProfileDetails/${objectId}`);
    };



    return (
        <div>
            
            <StyledCard>
                <Box sx={{p:2}}>
                {employees === null ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' , marginTop: '200px'}}>
                <CircularProgress />
              </div>
            ) : (
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
