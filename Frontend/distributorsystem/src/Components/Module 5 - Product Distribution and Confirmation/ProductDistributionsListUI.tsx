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
    height: '590px',
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

const StyledAddButton = styled(Button)({
    backgroundColor: '#2D85E7',
    display: 'flex',
    marginLeft: 30,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '350px',
    height: 35,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
}
)

export default function ProductDistributionList() {
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
        { field: 'dealerId', headerName: 'Dealer ID', width: 250 },
        { field: 'dealerName', headerName: 'Dealer Name', width: 250 },
        { field: 'orderId', headerName: 'Order Transaction ID', width: 250 },
        { field: 'orderDate', headerName: 'Order Date', width: 250 },
        {field: 'confirmed', headerName: 'Status', width: 250},
        {
            field: 'action', headerName: '', width: 150,
            renderCell: (params: { row: any; }) => {
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            console.log('Button clicked for row:', params.row.orderId);
                            if(params.row.confirmed === false){

                                handleViewButtonFalse(params.row.orderId);
                            }else{
                            handleViewButtonClick(params.row.orderId);
                        }
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
        confirmed: orderItem.confirmed
    }));

    const handleViewButtonClick = (objectId: string) => {
        console.log(objectId);
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter
        
        navigate(`/orderTransactionDetails/${objectId}`);
    };

    const handleViewButtonFalse = (objectId : string) => {

        navigate(`/orderConfirmation/${objectId}`);
    }


    return (
        <div>
            <StyledCard>
                <ContentNameTypography>Product Distribution</ContentNameTypography>
                <StyledAddButton onClick={() => {
                    console.log('Button clicked for adding a new order');
                    navigate("/distributorOrderForm");
                }}>Add new Product Distribution</StyledAddButton>
                <DataGrid
                    rows={rows}
                    sx={{ textAlign: 'center', color: '#203949', height: '370px', margin: '40px 30px 0px 30px' }}
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
