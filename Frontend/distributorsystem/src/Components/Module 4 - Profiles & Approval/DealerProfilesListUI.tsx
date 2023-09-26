import { Box, Button, Icon, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IDealer } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";

export default function DealerProfile(){
    const [dealers, setDealers]= useState<IDealer[]>([]);

    function getAllDealers(){
        axios.get<IDealer[]>('http://localhost:8080/dealer/getAllDealers')
      .then((response) => {
        setDealers(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving dealers:', error);
        alert("Error retrieving dealers. Please try again.");
      });
    }

    useEffect(()=>{
        getAllDealers();
    },[dealers]);

    const ApproveButtons: React.FC<{row:any}>=({row})=>{
        return(
            <div>
                <Button
                    variant="contained" style={{height:'35px',marginRight:'20px',color:'#146C94', backgroundColor:'#AFD3E2',fontWeight:'bold', borderRadius:'20px'}}>
                    Confirm
                  <Icon style={{color:'#2A9221', height:'25px',marginBottom:'10px', marginLeft:'2px'}}>
                    <CheckIcon/>
                  </Icon>
                </Button>

                <Button
                    variant="contained" style={{height:'35px',marginRight:'20px' ,color:'#146C94', backgroundColor:'#AFD3E2',fontWeight:'bold', borderRadius:'20px'}} >
                    Pending
                 </Button>

                 <Button
                    variant="contained" style={{height:'35px',marginRight:'20px', color:'#146C94',backgroundColor: '#AFD3E2',fontWeight:'bold', borderRadius:'20px'}} >
                    Decline
                    <Icon style={{color:'#E77D7D', height:'25px',marginBottom:'10px', marginLeft:'2px'}}>
                      <ClearIcon/>
                    </Icon>
                 </Button>
            </div>
        )
    };
    const columns: GridColDef[] = [
        //headerAlign to set alignment
        { field: 'id', headerName: 'Dealer ID', width: 300},
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'dateSubmitted', headerName: 'Date Submitted', width: 300 },
        { field:'view',headerName:'View',width: 150 , renderCell:(cellValues)=>(
          <Button
                    variant="contained" style={{height:'35px', width:'100px',color:'#146C94',backgroundColor:'#AFD3E2',fontWeight:'bold', borderRadius:'20px'}}>
                    View
          </Button>
        )
        },
        { field:'approvals',headerName:'Approvals', width: 600, renderCell:(params)=> <ApproveButtons row={params.row}/>,
        }, 
      ];
    const rows= dealers.map((dealer)=>{
        return{
            id:dealer.dealerid,
            dealerName: dealer ? `${dealer.firstname} ${dealer.lastname}` : '',
            dateSubmitted: dealer.submissiondate
        };
    });
    return (
        <div>
            <Box sx={{ height: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={rows}
            sx={{ textAlign: 'center', color: '#146C94',backgroundColor:'white', height: '500px', marginTop:'25px' }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
           // checkboxSelection
            // rowSelectionModel={selectedRows}
           // onRowSelectionModelChange={(handleRowSelection)}
            //rowSelectionModel={selectedRows}
          // disableRowSelectionOnClick
          />
        </Box>

        </div>
    )
}