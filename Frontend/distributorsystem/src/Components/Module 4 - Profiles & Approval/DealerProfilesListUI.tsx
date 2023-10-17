import { useEffect, useState } from "react";
import { IDealer } from "../../RestCalls/Interfaces";
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
    width: '50px',
    height: 35,
    ':hover': {
        backgroundColor: '#87BAF3',
    }
})

export default function DealerProfileListUI (){
    const navigate = useNavigate();
    const [dealer, setDealer] = useState<IDealer[] | null>(null);

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
        { field: 'id', headerName: 'Dealer ID', width: 350 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 350 },
        { field: 'submissionDate', headerName: 'Date Submitted', width: 350 },
        { field: 'action', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            console.log('Button clicked for row:', params.row.id);
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
    const rows = (dealer || []).map((dealerList) => ({
        id: dealerList.dealerid,
        dealerName: `${dealerList.firstname} ${dealerList.middlename} ${dealerList.lastname}`,
        submissionDate: dealerList.submissiondate
      }));

    const handleViewButtonClick = (objectId: string) => {
        console.log(objectId);
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        navigate(`/dealerProfileDetails/${objectId}`);
      };



    return (
        <div>
            <StyledCard>
                <ContentNameTypography>Dealer Profile List</ContentNameTypography>

                <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#146C94', height: '370px', margin: '45px 30px 0 30px' }}
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
