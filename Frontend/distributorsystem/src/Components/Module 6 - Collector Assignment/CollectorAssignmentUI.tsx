import { Alert, AlertTitle, Autocomplete, Box, Button, Card, CircularProgress, Slide, SlideProps, Snackbar, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { IEmployee, IOrder } from "../../RestCalls/Interfaces";
import { auto } from "@popperjs/core";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import axios from "axios";
import React from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//Imports for Toastify
//Please Install npm i react-toastify or if doesn't work, install npm i react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SlideTransitionDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const StyledCard = styled(Card)({
  padding: '10px 10px 10px 2px',
  margin: "45px 28% 0px 7.2%",
  width: '90%',
  height: '580px',
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
const LabelTypography = styled(Typography)({
  marginLeft: 50,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '15px',
  color: '#707070',
  '@media(max-width:900px)': {
    fontSize: '12px'
  }
})
const StyledButton = styled(Button)({
  marginTop: -5,
  marginLeft: 30,
  backgroundColor: '#2C85E7',
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  width: auto,
  height: 40,
  ':hover': {
    backgroundColor: '#2D85E7',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.4s',
  '@media(max-width:900px)': {
    fontSize: '9px'
  }
})

const StyledButton1 = styled(Button)({
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
  height: '479px',
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

export default function CollectorAssignment() {

  const navigate = useNavigate();


  const [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();


  {/** useStates */ }
  const [collectors, setCollectors] = useState<IEmployee[]>([]);
  const [selectedCollector, setSelectedCollector] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [alerttitle, setTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [loading, setLoading] = useState(true);


  const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);
 




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


  function getAllCollectors() {
    axios.get<IEmployee[]>(`http://localhost:8080/employee/getAllCollectorsByDistributorID/${distributorFromStorage.distributorid}`)
      .then((response) => {
        const updatedCollectors = response.data.map((collector) => {
          const assignedOrders = orders.filter((order) => order.collector?.employeeid === collector.employeeid);
          return { ...collector, orderids: assignedOrders.map((order) => order.orderid) };
        });
        setCollectors(updatedCollectors);
      })
      .catch((error) => {
        console.error('Error retrieving collectors:', error);
        headerHandleAlert('Error', "Error retrieving collectors. Please try again..", 'error');

      });
  }

  function getAllOrders() {
    axios.get<IOrder[]>(`http://localhost:8080/order/getAllOrdersByDistributorID/${distributorFromStorage.distributorid}`)
      .then((response) => {
        setOrders(response.data.filter(order => order.confirmed && !order.isclosed));
      })
      .catch((error) => {
       
        headerHandleAlert('Error', "Error retrieving orders. Please try again..", 'error');
        
      });
  }

  useEffect(() => {
    getAllCollectors();
    console.log(orders);
    getAllOrders();

  }, [orders]);


  const columns: GridColDef[] = [
    { field: 'orderID', headerName: 'Order Transaction ID', width: 200 },
    { field: 'dealerName', headerName: 'Dealer Name', width: 215 },
    { field: 'amountDue', headerName: 'Amount Due', width: 145 },
    {
      field: 'collectorStatus',
      headerName: 'Collector Status',
      width: 175,
      renderCell: (params) => (
        <div style={{
          color: params.value === 'Assigned' ? '#2A9221' : '#E77D7D'
        }}>
          {params.value}
        </div>
      ),
    },
    { field: 'collectorName', headerName: 'Collector Name', width: 220 },

    {
      field: 'unassign', headerName: '', width: 165, renderCell: (params: { row: any; }) => {
        return (
          <StyledButton1
            sx={{
              width: 120,
              backgroundColor: '#E77D7D',
              ':hover': {
                backgroundColor: '#DA4747',
              }
            }}
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleUnassignCollector(params.row, event);
            }}
            disabled={params.row.collectorStatus === 'Not Assigned'}

          >
            Unassign
          </StyledButton1>
        )
      }
    },
    {
      field: 'actionView', headerName: '', width: 143, renderCell: (params: { row: any; }) => {
        return (
          <StyledButton1
            onClick={() => {
              handleViewButtonClick(params.row.orderID);
            }}>
            View
          </StyledButton1>
        )
      }
    }
  ]
  {/** Rows for DataGrid */ }
  const rows = orders.map((order) => {
    return {
      id: order.orderid,
      orderID: order.orderid,
      dealerName: order.dealer ? `${order.dealer.firstname} ${order.dealer.lastname}` : '',
      amountDue: "₱" + order.orderamount,
      collectorStatus: order.collector !== null
        ? 'Assigned'
        : 'Not Assigned',
      collectorName: order.collector ? `${order.collector.firstname} ${order.collector.lastname}` : ''
    };
  });

  const handleViewButtonClick = (objectId: string) => {
    navigate(`/orderDetails/${objectId}`);
  };


  {/** Handle Row Selection */ }
  const handleRowSelection = (selectionModel: GridRowId[]) => {
    const selectedRowIds = selectionModel.map((id) => id + "");
    setSelectedRows(selectedRowIds);
  };



  const handleUnassignCollector = (selectedRow: any, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from propagating
    removeCollector(selectedRow.orderID);
    
    toast(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RemoveCircleIcon fontSize='medium' style={{ marginRight: '10px', alignItems: '' }} />
        {"Collector Unassigned Successfully!"}
      </div>, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: { backgroundColor: '#FA9600', color: '#ffffff' },
      theme: "colored",
    })
  }

  const handleAssignCollector = () => {
    if (selectedCollector === null) {
      headerHandleAlert('Collector Assignment Required', "To proceed, please assign a collector to the order(s).", 'warning');
    } else if (selectedRows.length === 0) {

      headerHandleAlert('Order Selection Required', "Please choose an order before assigning a collector.", 'warning');
    } else {
      assignCollector(selectedCollector.employeeid!, selectedRows);
     
      toast.success('Collector successfully assigned to selected orders!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    }
    setSelectedCollector(null);
    setSelectedRows([]);
  };

  return (
    <div>
      
      <StyledCard>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 30 }}>
          <LabelTypography>Assign to: </LabelTypography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={collectors}
            getOptionLabel={(option) => option.firstname + " " + option.lastname + " (" + option.orderids.length + "  assigned orders)"}
            isOptionEqualToValue={(option, value) => option.employeeid === value.employeeid}
            size="small"
            value={selectedCollector}
            onChange={(event, newValue) => {
              setSelectedCollector(newValue); // update the selected collector
            }}
            // Style for the Autocomplete(Combo Box - Separated from global styling due to error )   
            sx={{
              width: '35%',
              maxHeight: '50px',
              fontSize: '15px',
              margin: '0px 25px 0px 0px'
            }}
            // Style for the TextField(Input - Separated from global styling due to error )  
            renderInput={
              (params) =>
                <TextField {...params}
                  InputProps={{
                    ...params.InputProps, disableUnderline: true,
                    style: {
                      fontSize: "15px",
                      backgroundColor: 'rgb(45, 133, 231,0.2)',
                      color: 'black',
                      borderRadius: '5px',
                      height: '35px',
                      padding: '2.5px 0 0 10px',
                      margin: '-4px 0px 0px 20px'
                    }
                  }}
                  variant="standard"
                />}
          />
          {/**Assign / Reassign Button */}
          <StyledButton variant="contained" onClick={handleAssignCollector} >
            Assign / Reassign
          </StyledButton>

        </div>
       
      {/*   {rows.length === 0 ? (
  // Display circular progress when orders are empty
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Typography>No Orders yet.</Typography>
  </div>
) :  */}



{orders.length === 0  && collectors.length === 0 ? (
  // Display "No Rows" message when rows are empty
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    
    <Typography>No orders and collectors yet.</Typography>
  </div>

  
) : orders.length === 0 ? (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
<CircularProgress />
  </div>

) : (
  // Display the DataGrid when both orders and rows are not empty
  <Box sx={{ p: 2 }}>
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
      checkboxSelection
      onRowSelectionModelChange={handleRowSelection}
      rowSelectionModel={selectedRows}
    />
  </Box>
)}
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