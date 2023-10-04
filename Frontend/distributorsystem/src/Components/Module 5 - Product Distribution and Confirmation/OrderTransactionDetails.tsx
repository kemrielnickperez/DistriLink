import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { IDealer, IOrder } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '5%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '25px',
    color:'#203949'
})

const StyldeInfoHeader= styled(Typography)({
    marginTop: '35px',
    marginBottom: '90px',
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '20px',
    color:'#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute', 
    top: '230px', 
    left: '-12%',
    fontFamily: 'Inter',

})
const StyleLabel=styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '-165px',
    color: '#707070',
    fontSize: '15px',
    width:'max-content',
    fontFamily: 'Inter',  
}) 
const StyleData=styled(Typography)({

    position: 'absolute',
    textAlign: 'left',
    width: 200,
    left: '-150px',
    top:'35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})

const StyleTotalLabel=styled(Typography)({
  position: 'absolute',
  textAlign: 'left',
  fontWeight: '550',
  left: '-165px',
  color: '#707070',
  fontSize: '15px',
  width:'max-content',
  fontFamily: 'Inter',  
}) 

const StyleTotalData=styled(Typography)({

  position: 'absolute',
  textAlign: 'left',
  width: 200,
  left: '10px',
  top:'1px',
  color: '#203949',
  fontSize: '15px',
  fontWeight: '300',
  fontFamily: 'Inter, sans - serif',
})

const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#707070",
    fontWeight: "bold",
    textAlign:'center'
  });

export function OrderTransactionDetails(){
    const[dealer, setDealer] = useState<IDealer | null>(null);

    const[order, setOrder] = useState<IOrder | null>(null);

    const orderid= "dc5811ab";

    const navigate = useNavigate();

    const handleNavigate = () => {
      // Use navigate to navigate to a different route
      navigate('/printDetails');
      
    };

    useEffect(() => {
        // Make an Axios GET request to fetch the order data
        axios
          .get<IOrder>(`http://localhost:8080/order/getOrderByID/${orderid}`)
          .then((response) => {
            setOrder(response.data);
          })
          .catch((error) => {
            console.error('Error fetching order data:', error);
          });
      }, [orderid]);
   

    
    return(
        <div>   
            
            <ContentNameTypography>Order Transaction Details  <Button variant="contained" onClick={handleNavigate} style={{ marginRight: '50', backgroundColor: '#2C85E7', color: '#ffffff'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24"  height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
               </svg></Button></ContentNameTypography>
            
            {/* set style left manually here in stack */}
            {order ? (
                <div>
            <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader>
            <StackStyle sx={{left:'30%'}}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'43%'}}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{order?.dealer.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'55%'}}>
                <StyleLabel>Email Address</StyleLabel>
                <StyleData>{order?.dealer.businessaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'69%'}}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{order?.dealer.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'82%'}}>
                <StyleLabel>Address</StyleLabel>
                <StyleData>{order?.dealer.currentaddress}</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader>
            {/* set style left and top manually here in stack */}
            <StackStyle sx={{left:'30%', top:'350px'}}>
                <StyleLabel>Order Transaction ID</StyleLabel>
                <StyleData>{order?.orderid}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'45%', top:'350px'}}>
                <StyleLabel>Order Distribution Date</StyleLabel>
                <StyleData>{order?.orderdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'60%', top:'350px'}}>
                <StyleLabel>Total Ordered Amount</StyleLabel>
                <StyleData>{order?.orderamount}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'75%', top:'350px'}}>
                <StyleLabel>Penalty Rate</StyleLabel>
                <StyleData>{order?.penaltyrate}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'85%', top:'350px'}}>
                <StyleLabel>Payment Terms</StyleLabel>
                <StyleData>{order?.paymentterms} Gives</StyleData>
            </StackStyle>
        <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
        <Grid item >
          <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", height: "200px", justifyContent: 'center', display: 'flex', alignItems: 'left', position: 'relative', width: '1200px' }}>
        
              <TableContainer>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell align="center">Quantity</TableHeaderCell>
                      <TableHeaderCell align="center">Unit</TableHeaderCell>
                      <TableHeaderCell align="center">Product Name</TableHeaderCell>
                      <TableHeaderCell align="center">Unit Price</TableHeaderCell>
                      <TableHeaderCell align="center">Commission Rate</TableHeaderCell>
                      <TableHeaderCell align="center">Amount</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {order.orderedproducts.map((op, ) => (
                    <TableRow>
                      <TableCell align='center'>{op.quantity}</TableCell>
                      <TableCell align='center'>{op.product.unit}</TableCell>
                      <TableCell align='center'>{op.product.name}</TableCell>
                      <TableCell align='center'>{op.product.price}</TableCell>
                      <TableCell align='center'>{op.product.commissionrate}</TableCell>
                      <TableCell align='center'>{op.product.price * op.quantity}</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <StackStyle sx={{left:'95%', top:'220px'}}>
                <StyleTotalLabel>Total Ordered Amount:</StyleTotalLabel>
                <StyleTotalData>{order?.orderamount}</StyleTotalData>
            </StackStyle>
          </Paper>
        </Grid>
      </Grid>
              
            
      </div>
      
            ) : (
              <div >
                <Grid sx={{ justifyContent: "center", marginTop: '200px'}}>
                <AutorenewOutlinedIcon />
                <h4>loading...</h4>
                
                </Grid>
              </div>
            )}
        </div>  
    );
    
}