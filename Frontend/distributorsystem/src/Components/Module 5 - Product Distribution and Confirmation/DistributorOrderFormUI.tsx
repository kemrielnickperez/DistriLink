import { useEffect, useState } from "react";
import { IOrder } from "../../RestCalls/Interfaces";
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

export default function ProductDistributionList(){
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder[] | null>(null);

    useEffect(() => {
      // Make an Axios GET request to fetch all orders
      axios
        .get<IOrder[]>('http://localhost:8080/order/getAllOrders')
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }, []);
  
    {/** Columns for DataGrid */ }
    const columns: GridColDef[] = [
        { field: 'dealerId', headerName: 'Dealer ID', width: 300 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
        { field: 'orderId', headerName: 'Order Transaction ID', width: 300 },
        { field: 'orderDate', headerName: 'Order Date', width: 300 },
        { field: 'action', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            console.log('Button clicked for row:', params.row.orderId);
                           handleViewButtonClick(params.row.orderId);
                        }}
                        >
                            View
                        </StyledButton>
                )
            }
        }

    ]
    {/** Rows for DataGrid */ }
    const rows = (order || []).map((orderItem) => ({
        id: orderItem.orderid,
        dealerId: orderItem.dealer.dealerid,
        dealerName: `${orderItem.dealer.firstname} ${orderItem.dealer.middlename} ${orderItem.dealer.lastname}`,
        orderId: orderItem.orderid,
        orderDate: orderItem.orderdate,
    }));

    const handleViewButtonClick = (objectId: string) => {
        console.log(objectId);
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        navigate(`/orderTransactionDetails/${objectId}`);
      };



    return (
        <div>
            <StyledCard>
                <ContentNameTypography>Product Distribution</ContentNameTypography>

                <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#146C94', height: '370px', margin: '40px 30px 0px 30px' }}
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