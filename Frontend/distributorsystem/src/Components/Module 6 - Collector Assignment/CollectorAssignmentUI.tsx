import { Autocomplete, Button, Card, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { IEmployee, IOrder } from "../../RestCalls/Interfaces";
import { auto } from "@popperjs/core";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import axios from "axios";
import React from "react";

const StyledCard = styled(Card)({
  padding: '10px 10px 10px 2px',
  margin: "50px 28% 20px 10%",
  width: '85%',
  height: '600px',
  alignItems: 'center',
  borderRadius: '25px',
  justifyContent: 'left'
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
const LabelTypography = styled(Typography)({
  marginLeft: 50,
  fontFamily: 'Inter',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '15px',
  color: '#707070'
})
const StyledButton = styled(Button)({
  marginTop: -5,
  marginLeft: 30,
  backgroundColor: '#2C85E7',
  fontFamily: 'Inter',
  fontSize: '15px',
  width: auto,
  height: 40,
  ':hover': {
    backgroundColor: '#87BAF3',
  }
})

export default function CollectorAssignment() {
  const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();
  const navigate = useNavigate();

  {/** useStates */ }
  const [collectors, setCollectors] = useState<IEmployee[]>([]);
  const [selectedCollector, setSelectedCollector] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  {/** functions */ }
  function getAllCollectors() {
    axios.get<IEmployee[]>('http://localhost:8080/employee/getAllCollectors')
      .then((response) => {
        setCollectors(response.data);
        
      })
      .catch((error) => {
        console.error('Error retrieving collectors:', error);
        alert("Error retrieving collectors. Please try again.");
      });
  }

  function getAllOrders() {
    axios.get<IOrder[]>('http://localhost:8080/order/getAllOrders')
      .then((response) => {
        const confirmedOrders = response.data.filter(order => order.confirmed);

        setOrders(confirmedOrders);
        
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

  {/** Columns for DataGrid */ }


  {/** Columns for DataGrid */ }
  const columns: GridColDef[] = [
    { field: 'orderID', headerName: 'Order Transaction ID', width: 200 },
    { field: 'dealerName', headerName: 'Dealer Name', width: 180 },
    // { field: 'dueDate', headerName: 'Payment Due Date', width: 160 },
    { field: 'amountDue', headerName: 'Amount Due', width: 180 },
    { field: 'collectorStatus', headerName: 'Collector Status', width: 200 },
    { field: 'collectorName', headerName: 'Collector Name', width: 200 },
    {
      field: 'unassign', headerName: '', width: 220, renderCell: (params: { row: any; }) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleUnassignCollector(params.row, event);
            }}
            disabled={params.row.collectorStatus === 'Not Assigned'}
          >
            Unassign Collector

          </Button>
        )
      }
    },
    {
      field: 'actionView', headerName: '', width: 180, renderCell: (params: { row: any; }) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleViewButtonClick(params.row.orderID);
            }}>
            View
          </Button>
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
      collectorName: order.collector ? `${order.collector.firstname} ${order.collector.lastname}` : '',
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
    alert("Collector Unassigned Successfully!");
  }


  {/** Handle Assign */ }
  const handleAssignCollector = () => {
    if (selectedCollector === null) {
      alert("Please choose a collector")
    } else {
      let count = 0;
      for (const selectedOrderID of selectedRows) {
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

      setSelectedRows([]);
      setSelectedCollector(null);
    }
  };

  return (
    <div>
      <StyledCard>
        <ContentNameTypography>Collector Assignment</ContentNameTypography>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
                      backgroundColor: "#F5F7F9",
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
            Assign / Reassign Collector
          </StyledButton>

        </div>

        {/**DataGrid */}
        <DataGrid
          rows={rows}
          sx={{ textAlign: 'center', color: '#203949', height: '350px', margin: '35px 20px 0 20px', fontWeight: 330 }}
          columns={columns.map((column) => ({
            ...column,
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
          onRowSelectionModelChange={(handleRowSelection)}
          rowSelectionModel={selectedRows}
        />
      </StyledCard>
    </div>

  );
}