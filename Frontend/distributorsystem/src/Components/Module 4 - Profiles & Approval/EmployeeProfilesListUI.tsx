import { useEffect, useState } from "react";
import { IEmployee } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Alert, AlertTitle, Button, Card, Slide, SlideProps, Snackbar, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


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

export default function EmployeeProfileListUI() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<IEmployee[] | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alerttitle, setTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    

    const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);


    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios.get<IEmployee[]>(`http://localhost:8080/employee/getAllEmployeesByDistributorID/${distributorFromStorage.distributorid}`)
            .then((response) => {
                setEmployee(response.data);
                 // headerHandleAlert('Success', "Employees fetched successfully.", 'success');
            })
            .catch((error) => {
                headerHandleAlert('Error', "Failed to fetch employees. Please check your internet connection.", 'error');
                //console.error('Error fetching employee:', error);
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
        { field: 'id', headerName: 'Employee ID', width: 300 },
        { field: 'employeeName', headerName: 'Employee Name', width: 300 },
        { field: 'position', headerName: 'Position', width: 300 },
        {
            field: 'action', headerName: '', width: 150,
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
    const rows = (employee || []).map((employeeList) => ({
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
                <ContentNameTypography>Employee Profile List</ContentNameTypography>

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
