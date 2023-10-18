import { useEffect, useState } from "react";
import { IEmployee } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Button, Card, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


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

    useEffect(() => {
        // Make an Axios GET request to fetch all orders
        axios.get<IEmployee[]>('http://localhost:8080/employee/getAllEmployees')
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee:', error);
            });
    }, []);

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
            employeeList.is_cashier && "Cashier",
            employeeList.is_collector && (employeeList.is_cashier ? 'Collector' : 'Collector'),
            employeeList.is_salesassociate && (employeeList.is_cashier || employeeList.is_collector ? 'Sales Associate' : 'Sales Associate')
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
        </div>
    );
}
