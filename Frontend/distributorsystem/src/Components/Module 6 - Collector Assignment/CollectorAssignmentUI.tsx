import * as React from 'react';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams, GridRowParams, GridApi, GridFilterModel } from '@mui/x-data-grid';
import CardActions from '@mui/material/CardActions';
import { Autocomplete, Button, Card, TextField, Typography, Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useRestOrder } from '../../RestCalls/OrderUseRest';
import axios from 'axios';
import { IDealer, IEmployee, IOrder } from '../../RestCalls/Interfaces';



//DataGrid Function 
export default function CollectorAssignment() {

  const headerClassName = "custom-header"; // For Header Columns and styling

  const [collectors, setCollectors] = useState<IEmployee[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [selectedCollector, setSelectedCollector] = useState<any>(null); // State for the selected collector
  const [selectedCollectorId, setSelectedCollectorId] = useState<string | null>(null); // State for the selected collector ID
  const [selectedRows, setSelectedRows] = useState<string[]>([]); // State for selection of rows 
  //const [rows, setRows] = React.useState(initialRows); // State for grouping order transaction
  const [groupByValue, setGroupByValue] = useState(''); // // State for the groupBy input value


  const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();


  function getAllCollectors() {
    axios.get<IEmployee[]>('http://localhost:8080/employee/getAllCollectors')
      .then((response) => {
        setCollectors(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving collectors:', error);
        alert("Error retrieving collectors. Please try again.");
      });
  }

  function getAllOrders() {
    axios.get<IOrder[]>('http://localhost:8080/order/getAllOrders')
      .then((response) => {
        setOrders(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving collectors:', error);
        alert("Error retrieving collectors. Please try again.");
      });
  }


  useEffect(() => {
    getAllCollectors();
    getAllOrders();

  }, [orders]);



  const columns: GridColDef[] = [
    //headerAlign to set alignment
    { field: 'orderID', headerName: 'Order ID', width: 300 },
    { field: 'dealerName', headerName: 'Dealer Name', width: 300 },
    { field: 'orderAmount', headerName: 'Order Amount', width: 300 },
    { field: 'collectorStatus', headerName: 'Collector Status', width: 300 },
    { field: 'collectorName', headerName: 'Collector Name', width: 400 },
  ];

  const rows = orders.map((order) => {

    return {
      id: order.orderid,
      orderID: order.orderid,
      dealerName: order.dealer ? `${order.dealer.firstname} ${order.dealer.lastname}` : '',
      orderAmount: "₱" + order.orderamount,
      collectorStatus: order.collector !== null
        ? 'Assigned'
        : 'Not Assigned',
      collectorName: order.collector ? `${order.collector.firstname} ${order.collector.lastname}` : '',
    };
  });


  // Handler for removing collector Button 
  const handleRemoveCollector = () => {

    let count = 0;
    for (const selectedOrderID of selectedRows) {
      console.log(selectedOrderID)
      if (removeStatus === false) {
        break;
      }
      else {
        removeCollector(selectedOrderID);
        count++;
      }
    }
    if (count === selectedRows.length) {
      alert("All assigned collector of the selected orders are removed successfully!")
    }
    else {
      alert(`Only ${count}! number of orders was removed successfully.`)
    }
  };

  // Handler for Assigning Collector Button 
  const handleAssignCollector = () => {
    let count = 0;
    console.log(assignedStatus)
    for (const selectedOrderID of selectedRows) {
      //ngano mogana mani og true diri pero if false kay maguba
      if (assignedStatus === false) {
        break;
      }
      else {
        assignCollector(selectedOrderID, selectedCollector)
        count++;
      }
    }

    if (count === selectedRows.length) {
      alert("Collector assigned successfully to all of the selected orders!")
    }
    else {
      alert(`Only ${count}! number of orders was assigned.`)
    }

  };


  // Handler for Group Transaction Button 
  /* const handleGroupTransaction = () => {
    const count = parseInt(groupByValue.trim());
    const selectedRowIds = rows.slice(0, count).map((row) => row.orderID);
    setSelectedRows(selectedRowIds);
  }; */


  // Handler for data grid in row selection
  const handleRowSelection = (selectionModel: GridRowId[]) => {
    const selectedRowIds = selectionModel.map((id) => id + "");
    setSelectedRows(selectedRowIds);
  };




  // **Return Statement Here**
  return (
    <div>
      <Box sx={{ height: 400, width: '100%', color: '#146C94' }}>
        <Card sx={{ height: 550, margin: "10px 0px 20px 0px", borderRadius: "25px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '0px 0px 0px 30px', color: '#146C94', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ textAlign: 'left', fontSize: '18px' }}>Group Transactions by</span>

                <TextField
                  value={groupByValue}
                  onChange={(e) => setGroupByValue(e.target.value)}
                  id="standard-basic"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    margin: '0px 0px 0px 20px',
                    width: '100px',
                    background: "#E9E9E9",
                    borderRadius: '5px',
                    input: { padding: "10px", color: '#146C94' }
                  }} />
              </Typography>

               <CardActions sx={{ alignItems: 'center', marginLeft: '10px' }}>
                <Button onClick={handleGroupTransaction} variant="contained"
                  sx={{
                    height: '50px',
                    borderRadius: '15px',
                    color: '#146C94',
                    fontWeight: 'bold',
                    backgroundColor: '#AFD3E2',
                    '&:hover': { backgroundColor: '#AFD3E2FF' }
                  }}>
                  Group Transaction
                </Button>
              </CardActions> 
            </div>*/}

            <div style={{ display: "flex", alignItems: "center", marginTop: '20px' }}>

              <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '0px 0px 10px 20px', color: '#146C94', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ textAlign: 'left', fontSize: '18px' }}>Assign to</span>
              </Typography>

              <CardActions sx={{ alignItems: 'center', marginLeft: '10px' }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={collectors}
                  getOptionLabel={(option) => option.firstname + " " + option.lastname}
                  isOptionEqualToValue={(option, value) => option.employeeid === value.employeeid}
                  size="small"
                  value={selectedCollector}
                  onChange={(event, newValue) => {
                    setSelectedCollector(newValue); // update the selected collector
                    setSelectedCollectorId(newValue?.id || null); // update the selected collector ID
                  }}
                  // ...
                  sx={{ width: 150, maxHeight: '200px', fontSize: '30px', margin: '0px 0px 0px 0px' }}
                  renderInput={
                    (params) =>
                      <TextField {...params}
                        InputProps={{
                          ...params.InputProps, disableUnderline: true,
                          style: {
                            fontSize: "15px", backgroundColor: "#E9E9E9", color: 'black',
                            borderRadius: '5px', height: '50px', paddingLeft: '5px', margin: '0px 0px 10px 0px'
                          }
                        }}
                        variant="standard"
                      />}
                />

                <Button variant="contained" onClick={handleAssignCollector}
                  sx={{
                    marginLeft: '20px',
                    marginBottom: '11px',
                    height: '50px',
                    borderRadius: '15px',
                    fontWeight: 'bold',
                    color: '#146C94',
                    backgroundColor: '#AFD3E2',
                    '&:hover': { backgroundColor: '#AFD3E2FF' }
                  }}>Assign / Reassign Collector
                </Button>
              </CardActions>
            </div>

            <CardActions sx={{ alignItems: 'center', marginLeft: '10px', marginTop: '20px', marginBottom: '11px' }}>
              <Button variant="contained"
                onClick={handleRemoveCollector}
                sx={{
                  marginLeft: '20px',
                  height: '50px',
                  borderRadius: '15px',
                  color: 'white',
                  fontWeight: 'bold',
                  backgroundColor: '#E77D7D', '&:hover': { backgroundColor: '#E77D7DFF' }
                }}>
                Remove Collector
              </Button>
            </CardActions>
          </div>

          <Box sx={{ height: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={rows}
              sx={{ textAlign: 'center', color: '#146C94', height: '300px' }}
              columns={columns.map((column) => ({
                ...column,
                headerClassName,
              }))
              }
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              // rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(handleRowSelection)}
              rowSelectionModel={selectedRows}
            // disableRowSelectionOnClick
            />
          </Box>



          <style>{`
                              .${headerClassName} {
                                background-color: #AFD3E2;
                                fontWeight: bold;
                              }
                          `}</style>
        </Card>
      </Box>
    </div>

  );
}

