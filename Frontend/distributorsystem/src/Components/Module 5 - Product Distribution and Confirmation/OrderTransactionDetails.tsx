import { Alert, AlertTitle, Button, Grid, Paper, Slide, SlideProps, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { IOrder } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrderTransactionDetailsPrint from "./OrderTransactionDetailsPrint";


function SlideTransitionDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const ContentNameTypography = styled(Typography)({
  marginTop: 40,
  marginLeft: -620,
  fontFamily: 'Inter',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '25px',
  color: '#203949',
  '@media(max-width:900px)': {
      fontSize: '17px',
      marginLeft: -12,
  },

})

const StyledButton = styled(Button)({
  marginTop: -5,
  marginLeft: 20,
  backgroundColor: '#2C85E7',
  fontFamily: 'Inter',
  fontSize: '15px',
  width: '50px',
  height: 40,
  ':hover': {
    backgroundColor: '#2C85E7',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.4s'
}
)


const StyldeInfoHeader = styled(Typography)({
  marginTop: '45px',
  marginBottom: '90px',
  marginLeft: '10%',
  fontFamily: 'Inter',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '20px',
  color: '#203949'
})
const StackStyle = styled(Stack)({
  position: 'absolute',
  top: '230px',
  left: '-12%',
  fontFamily: 'Inter',

})
const StyleLabel = styled(Typography)({
  // position: 'absolute',
  textAlign: 'left',
  fontWeight: '550',
  // left: '165px',
  paddingTop: 80,
  marginLeft: 195,
  color: '#707070',
  fontSize: '15px',
  width: 'max-content',
  fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
  textAlign: 'left',
  width: 250,
  marginLeft: 210,
  marginTop: 10,
  color: '#203949',
  fontSize: '15px',
  fontFamily: 'Inter, sans - serif',
})

const StyleTotalLabel = styled(Typography)({
  position: 'absolute',
  textAlign: 'left',
  fontWeight: '550',
  top: '30px',
  left: '798px',
  color: '#707070',
  fontSize: '20px',
  width: 'max-content',
  fontFamily: 'Inter',
  alignItems:'end'
})

const StyleTotalData = styled(Typography)({
  position: 'absolute',
  textAlign: 'center',
  left: '33px',
  top: '1px',
  color: '#203949',
  fontSize: '20px',
  fontWeight: '250',
  fontFamily: 'Inter',

})

const StyleTotalPaper = styled(Paper)({
  backgroundColor: '#ffffff',
  border: 'light',
  borderRadius: '20px',
  position: 'absolute',
  width: '150px',
  height: '35px',
  left: '1050px',
  top:25,

})

const TableHeaderCell = styled(TableCell)({
  fontSize: 15,
  color: "#707070",
  fontWeight: "bold",
  textAlign: 'center'
});

const StyledPrintDiv = styled('div')({
  paddingTop: 40,
  marginLeft: -500,
  '& Button': {
      fontSize: 12,
      color: '#000',
      fontFamily: 'Inter',
      width: '50px',
      height: 40,
      marginLeft: 10,
      ':hover': {
          backgroundColor: '#2C85E7',
          transform: 'scale(1.1)'
      },
      transition: 'all 0.4s',
      '@media(max-width:900px)': {
          height: 40,
          marginLeft: 350,
      },
  },

  // Print-specific styles using the @media print query
  '@media print': {

      '@page': {
          size: 'landscape',
      },
  },
});
const StyleLabelData = styled(Typography)({
  position: 'absolute',
  textAlign: 'left',
  fontWeight: '550',
  paddingTop: 70,
  marginLeft:-870,
  color: '#203949',
  fontSize: '20px',
  width: 'max-content',
  fontFamily: 'Inter',
})

const PaperStyle = styled(Paper)({
  // background: 'linear'
  background: 'linear-gradient(50deg, rgba(255,255,255,0.4) 12%,rgba(255,255,255,0.1) 77% )',
  backgroundBlendMode: '',
  // backgroundColor:'rgb(245, 247, 249,0.4)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  boxShadow: '0 3px 3px 1px rgba(0,0,0,0.28)',
  borderRadius: "10px",
  backgroundColor: '#ffffff',
  width: '1200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  margin: '100px 0px 0px 90px'
})


export function OrderTransactionDetails() {
  const [order, setOrder] = useState<IOrder | null>(null);

  const [openAlert, setOpenAlert] = useState(false);

  const [alerttitle, setTitle] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const [alertSeverity, setAlertSeverity] = useState('success');


  // Use useParams to get the orderID from the URL
  const { objectId } = useParams();

  useEffect(() => {
    // Make an Axios GET request to fetch the order data using the objectId
    axios
      .get<IOrder>(`http://localhost:8080/order/getOrderByID/${objectId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        headerHandleAlert('Error', "Failed to retrieve order data. Please try again.", 'error');
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


  const [printing, setPrinting] = useState(false);


  const handlePrint = () => {

    const printSettings = {
      scale: 0.7, // Set the scale to 70%
      orientation: 'landscape', // Set the orientation to landscape
    };


    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 10); // Add a delay to ensure rendering before printing (optional)
  };

  return (
    <div>
      {!printing ? (
        <div>
          <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }} >
            <Grid>
              <div style={{ display: "flex", flexDirection: 'row', paddingTop: 7, paddingLeft: 20 }}>
                <Grid item>
                  < ContentNameTypography > Order Transaction Details</ContentNameTypography >
                </Grid>
                <Grid item>
                  <StyledPrintDiv>
                    < Button variant="outlined" onClick={handlePrint} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                      </svg></Button >
                  </StyledPrintDiv>
                </Grid>
              </div>
            </Grid>
            <Grid container style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
              <StyleLabelData style={{ paddingTop: 75, marginLeft: -890 }}>Dealer Contact Information</StyleLabelData>
            </Grid>
            <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
              <Grid item>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 20 }}>Dealer ID</StyleLabel>
                <StyleData style={{ marginLeft: 40 }}>{order?.dealer.dealerid}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: -50 }}>Email Address</StyleLabel>
                <StyleData style={{ marginLeft: -30 }}>{order?.dealer.emailaddress}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 5 }}>Contact Number</StyleLabel>
                <StyleData style={{ marginLeft: 20 }}>{order?.dealer.contactnumber}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 5 }}>Address</StyleLabel>
                <StyleData style={{ marginLeft: 20 }}>{order?.dealer.currentaddress}</StyleData>
              </Grid>
            </Grid>
            <Grid container style={{ paddingTop: 10, position: 'relative', justifyContent: "center", alignItems: "center" }}>
              <StyleLabelData style={{ paddingTop: 75, marginLeft: -860 }}>Order Transaction Information</StyleLabelData>
            </Grid>
            <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
              <Grid item>
                <StyleLabel>Order Transaction ID</StyleLabel>
                <StyleData>{order?.orderid}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: -50 }}>Order Transaction Date</StyleLabel>
                <StyleData style={{ marginLeft: -30 }}>{order?.distributiondate}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 5 }}>Total Ordered Amount</StyleLabel>
                <StyleData style={{ marginLeft: 20 }}>Php {order?.orderamount}</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 5 }}>Penalty Rate</StyleLabel>
                <StyleData style={{ marginLeft: 20 }}>{order?.penaltyrate} %</StyleData>
              </Grid>

              <Grid item>
                <StyleLabel style={{ marginLeft: 5 }}>Payment Terms</StyleLabel>
                <StyleData style={{ marginLeft: 20 }}>{order?.paymentterms}</StyleData>
              </Grid>
            </Grid>
            <Grid container style={{ position: 'relative', justifyContent: "center", alignItems: "center" }}>
              <StyleLabelData style={{ paddingTop: 100, marginLeft: -970 }}>Order Breakdown</StyleLabelData>
            </Grid>
            <Grid container style={{position: 'relative', justifyContent: "center", alignItems:"center"}}>
                <PaperStyle>
                  <TableContainer>
                    <Table aria-label='simple table'>
                      <TableHead  style={{ backgroundColor: 'rgb(45, 133, 231, 0.08)', }}>
                        <TableRow>
                          <TableHeaderCell align="center" sx={{ color: '#707070'}}>Quantity</TableHeaderCell>
                          <TableHeaderCell align="center" sx={{ color: '#707070'}}>Unit</TableHeaderCell>
                          <TableHeaderCell align="center" sx={{ color: '#707070'}}>Product Name</TableHeaderCell>
                          <TableHeaderCell align="center"sx={{ color: '#707070'}}>Unit Price</TableHeaderCell>
                          <TableHeaderCell align="center"sx={{ color: '#707070'}}>Commission Rate</TableHeaderCell>
                          <TableHeaderCell align="center"sx={{ color: '#707070'}}>Amount</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order?.orderedproducts.map((op,index) => (
                          <TableRow sx={{ backgroundColor: index % 2 === 0 ? 'inherit' : 'rgb(45, 133, 231, 0.08)' }}>
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
                  <Grid container style={{position: 'relative', justifyContent: "center", alignItems:"center"}}>
                    <Grid item>
                      <StyleTotalLabel>Total Ordered Amount:</StyleTotalLabel>
                    </Grid>
                    <Grid item>
                      <StyleTotalPaper>
                        <StyleTotalData>Php {order?.orderamount}</StyleTotalData>
                      </StyleTotalPaper>
                    </Grid>
              
                    
                  </Grid>
                </PaperStyle>
              


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
            </Grid>
          </Grid>
        </div>
      ) : (
        <OrderTransactionDetailsPrint order={order!} />
      )
      }
    </div >
  );
}