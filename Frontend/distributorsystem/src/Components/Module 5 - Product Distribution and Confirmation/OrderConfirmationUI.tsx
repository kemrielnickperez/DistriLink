import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextFieldProps, MenuItem, Autocomplete, Snackbar, Alert, AlertTitle, Slide, SlideProps } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRestOrder } from '../../RestCalls/OrderUseRest';
import { useRestDealer } from '../../RestCalls/DealerUseRest';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { IOrder, IOrderedProducts, IProduct } from '../../RestCalls/Interfaces';

import { v4 as uuidv4 } from 'uuid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ToastContainer, toast } from 'react-toastify';

const RemoveButton = styled(Button)({
  ":hover": {

    transform: 'scale(1.4)'
  },
  transition: 'all 0.4s'
})
const SaveButton = styled(Button)({
  // position: 'relative',
  // width: '200px',
  // height: 50,
  // left: -30,
  // ':hover': {
  //   backgroundColor: '#2D85E7',
  //   transform: 'scale(1.1)'
  // },
  // transition: 'all 0.4s'
  backgroundColor: 'rgb(45, 133, 231,0.8)',
  borderRadius: 5,
  color: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  width: '200px',
  height: 50,
  ':hover': {
    backgroundColor: '#2D85E7',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.4s'
})
const StyledDatePicker = styled(DatePicker)({
  [`& fieldset`]: {
    borderRadius: 20,
    height: 55,
  }
});
const StyledNumber = styled(TextField)({
  '& fieldset': {
    borderColor: 'rgb(0,0,0,0)', // Change 'your-color' to the desired color
  },
})
const StyledProductTextField = styled(TextField)({
  backgroundColor: "#AFD3E2", borderRadius: "22px", input: {
    padding: "10px", color: "black"
  },
  width: '200px',

});
const PaperStyle = styled(Paper)({
  background: 'linear-gradient(50deg, rgba(255,255,255,0.4) 12%,rgba(255,255,255,0.1) 77% )',
  backgroundBlendMode: '',
  // backgroundColor:'rgb(245, 247, 249,0.4)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  boxShadow: '0 3px 3px 1px rgba(0,0,0,0.28)',
  borderRadius: "10px",
  height: "200px",
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '1200px',
  marginTop: 30
})

const StyledTextField = styled(TextField)({
  input: {
    marginTop: "-3px"
  },
  [`& fieldset`]: {
    borderRadius: 20,
    height: 53,
  }
})

const LabelGrid = styled(Grid)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  top: 20,
})

const TableHeaderCell = styled(TableCell)({
  fontSize: 15,
  color: "#000000",
  fontWeight: "bold"
});

const ProductName = styled(Typography)({
  color: '#707070',
  fontWeight: '550',
  position: 'relative',
  left: 30,
  top: -50
})

const StyledProductField = styled(TextField)({
  position: 'relative',
  width: '400px',
  left: -70,
  [`& fieldset`]: {
    borderRadius: 20
  }
})
const QuantityName = styled(Typography)({
  color: '#707070',
  fontWeight: '550',
  position: 'relative',
  left: -20,
  top: -50
})
const StyledQuantityField = styled(TextField)({
  position: 'relative',
  width: '400px',
  left: -80,
  [`& fieldset`]: {
    borderRadius: 20
  }
})

const TitleTypo = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bolder',
  textAlign: 'left',
  fontSize: '40px',
  color: '#203949'
})

const TitleBox = styled(Box)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  top: 20,
  bottom: -10,
  left: -350,
})


const AddToCart = styled(Button)({
  position: 'relative',
  width: '200px',
  height: 50,
  left: -30,
  ':hover': {
    backgroundColor: '#2D85E7',
    transform: 'scale(1.1)'
  },
  transition: 'all 0.4s'
})
const OverallGrid = styled(Grid)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  paddingTop: 30
})
const StyleLabel = styled(Typography)({
  textAlign: 'left',
  fontWeight: '550',
  marginLeft: 0,
  marginTop: 20,
  paddingBottom: 10,
  color: '#707070',
  fontSize: '15px',
  width: 'max-content',
  fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
  textAlign: 'left',
  width: 250,
  marginLeft: 12,
  marginTop: 15,
  color: '#203949',
  fontSize: '17px',
  fontFamily: 'Inter, sans - serif',
})

export default function OrderConfirmation() {

  const { objectId } = useParams();

  const [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();

  const [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, updateDealerCreditLimit, resetDealer, isDealerFound, isDealerConfirmed, dealer, dealerRemainingCredit] = useRestDealer();

  const [tableData, setTableData] = useState<{ quantity: number; productName: string; productPrice: number; productUnit: string; productCommissionRate: number; productAmount: number; }[]>([]);

  const [products, setProducts] = useState<IProduct[]>([]);

  const [orderedProducts, setOrderedProducts] = useState<IOrderedProducts[]>([]);

  const [orderedProducts1, setOrderedProducts1] = useState<IOrderedProducts[]>([]);

  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const [paymentTerm, setPaymentTerm] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState<string>('');

  const [minDate, setMinDate] = useState<Dayjs | null>(null);

  const [alerttitle, setTitle] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const [alertSeverity, setAlertSeverity] = useState('success');

  const [open, setOpen] = useState(false);

  const quantityRef = useRef<TextFieldProps>(null);
  const penaltyRateRef = useRef<TextFieldProps>(null);
  const dealerIDRef = useRef<TextFieldProps>(null);

  function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }



  const paymentchoices = [
    {
      value: '0',
      label: '----------',
    },
    {
      value: '1',
      label: 'Cash',
    },
    {
      value: '2',
      label: '2 Gives',
    },
    {
      value: '3',
      label: '3 Gives',
    },
    {
      value: '4',
      label: '4 Gives',
    },
    {
      value: '5',
      label: '5 Gives',
    },
    {
      value: '6',
      label: '6 Gives',
    }
  ];

  const [isMounted, setIsMounted] = useState(false);


  const userFromStorage = JSON.parse(localStorage.getItem("user")!);


  const handleFindOrder = () => {
    getOrderByID(objectId!, userFromStorage.distributor.distributorid);
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };




  function saveHandleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
    setTitle(title);
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpen(true);
  }

  function getAllProducts() {
    axios.get<IProduct[]>('http://localhost:8080/product/getAllProducts')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
        // alert("Error retrieving products. Please try again.");
      });
  }

  const [isDataFetched, setDataFetched] = useState(false);

  useEffect(() => {

    if (!isDataFetched) {
      getAllProducts();
      handleFindOrder();

      setDataFetched(true); // Set the flag to true to prevent re-fetching
    }

    setOrderedProducts(order?.orderedproducts!);
    setTotalAmount(order?.orderamount!);

    setMinDate(dayjs() as Dayjs);

  }, [order, isDataFetched]);




  const handleAddToCart = () => {

    if (chosenProduct) {
      const uuid = uuidv4();
      const orderedproductuuid = uuid.slice(0, 8);
      const existingProductIndex = orderedProducts.findIndex(
        (item) => item.product.productid === chosenProduct.productid
      );

      if (existingProductIndex !== -1) {
        // alert('Product already added to the cart');
        toast.info("If you'd like to increase the quantity of products, adjust product quantity as needed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        toast.warning(chosenProduct.name + ' is already been added to the cart', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        setChosenProduct(null);
        setQuantity('');
      } else {
        const newOrderedProduct: IOrderedProducts = {
          orderedproductid: orderedproductuuid,
          product: chosenProduct,
          quantity: Number(quantity),
          subtotal: chosenProduct.price * Number(quantity),
        };

        // Update the ordered products in the updated order
        /*   const updatedOrderedProducts = [...orderedProducts, newOrderedProduct]; */
        const updatedOrderedProducts = [...orderedProducts, newOrderedProduct];

        // Calculate the total order amount based on updatedOrderedProducts
        const orderAmount = updatedOrderedProducts.reduce((total, product) => {
          return total + product.product.price * product.quantity;
        }, 0);

        setTotalAmount(orderAmount)
        setOrderedProducts(updatedOrderedProducts);
        setChosenProduct(null);
        setQuantity('');
        // toast
        toast.success(chosenProduct.name + ' is added to the cart', {
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
    }

  };


  const handleUpdateQuantity = (product: IOrderedProducts, updatedQuantity: number) => {
    // Update the quantity of a product in the cart
    // Update the state (orderedProducts) with the updated quantity
    const updatedProducts = orderedProducts.map((item) => {
      if (item.product.productid === product.product.productid) {
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setOrderedProducts(updatedProducts);
  };

  const handleRemoveFromCart = (product: IOrderedProducts) => {
    // Remove a product from the cart
    // Update the state (orderedProducts) by filtering out the removed product
    const updatedProducts = orderedProducts.filter(
      (item) => item.product.productid !== product.product.productid
    );
    setOrderedProducts(updatedProducts);
    toast(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RemoveCircleIcon fontSize='medium' style={{ marginRight: '10px', alignItems: '' }} />
        {product.product.name + ' has been removed from the cart'}
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
  };



  const clearInputValues = () => {
    setOrderedProducts([]);
    setSelectedDate(null);
    setPaymentTerm(0);
    setTotalAmount(0);

    if (penaltyRateRef.current?.value) {
      penaltyRateRef.current!.value = '';
    }

  }

  const handleSaveOrder = () => {

    if (!selectedDate || !penaltyRateRef.current?.value || !paymentTerm) {
      saveHandleAlert('Input all the required fields', 'Please fill in all required fields.', 'warning')
      return;
    }
    else {

      const existingOrderId = order?.orderid
      const existingOrderedProducts = order?.orderedproducts
      // Calculate the total order amount based on orderedProducts
      const orderAmount = orderedProducts.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);
      // Create an updated order object with the necessary data
      const savedProduct = [...orderedProducts]
      const updatedOrder: IOrder = {
        orderid: existingOrderId!, // Replace with the ID of the existing order
        distributiondate: selectedDate?.format('YYYY-MM-DD') || '',
        orderdate: moment().format('YYYY-MM-DD'),
        penaltyrate: Number(penaltyRateRef.current?.value),
        paymentterms: paymentTerm,
        orderamount: totalAmount,
        distributor: dealer?.distributor!,
        collector: null,
        dealer: dealer!,
        orderedproducts: orderedProducts,
        paymenttransactions: [],
        confirmed: true,
        isclosed: false
      };
      // Call the updateOrder function with the order ID and updated order data
      updateOrder(existingOrderId, updatedOrder);
      saveHandleAlert('Success Saving Order', "The Dealer's ordered products have been successfully updated & confirmed!", 'success')
      //if possible kay ara na siya mo clear after sa snackbar
      clearInputValues();

    }

  }








  return (
    <div>
      <OverallGrid container>
        <Box sx={{ pl: 7 }}>
          <LabelGrid>
            <Grid item style={{ marginRight: -110 }} paddingBottom={2}>
              <StyleLabel>Order ID</StyleLabel>
              <StyleData>{order?.orderid}</StyleData>
            </Grid>
            <Grid item style={{ marginRight: -110 }} paddingBottom={2}>
              <StyleLabel>Dealer ID</StyleLabel>
              <StyleData>{order?.dealer.dealerid}</StyleData>
            </Grid>
            <Grid item style={{ marginRight: -45 }} paddingBottom={2}>
              <StyleLabel>Dealer Name</StyleLabel>
              <StyleData>{order?.dealer.firstname + " " + order?.dealer.middlename + " " + order?.dealer.lastname}</StyleData>
            </Grid>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Distribution Date</StyleLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  slotProps={{
                    textField: {
                      style: { height: 55, width: 220 },
                      InputProps: {
                        disableUnderline: true
                      },
                      variant: "outlined",
                    }
                  }}
                  value={selectedDate}
                  minDate={minDate}
                  onChange={(date) => setSelectedDate(date as Dayjs | null)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Penalty Rate</StyleLabel>
              <StyledTextField style={{ width: 220 }} variant="outlined" inputRef={penaltyRateRef} ></StyledTextField>
            </Grid>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Payment Terms</StyleLabel>
              <StyledTextField
                variant="outlined"
                select
                value={paymentTerm}
                onChange={(event) => setPaymentTerm(Number(event.target.value))}
              >
                {paymentchoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
          </LabelGrid>
        </Box>

        {/*   </Box> */}
        <Grid item container sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
          <Grid item>
            <PaperStyle>
              <ProductName>Product Name</ProductName>
              <Autocomplete disablePortal id="flat-demo" options={products}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.productid === value.productid}
                value={chosenProduct}
                onChange={(event, newValue) => setChosenProduct(newValue!)}
                renderInput={(params) => (
                  <StyledProductField {...params} variant='outlined' InputProps={{
                    ...params.InputProps, disableUnderline: true
                  }}
                  />)}
              />
              <QuantityName>Quantity</QuantityName>
              <StyledQuantityField variant="outlined" InputProps={{ disableUnderline: true }} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <AddToCart variant="contained" onClick={() => { handleAddToCart(); }}>ADD TO CART<AddShoppingCartIcon style={{ paddingLeft: 10, height: 22 }} /></AddToCart>
            </PaperStyle>
          </Grid>
        </Grid>
        <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
          <Grid item >
            <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "10px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none' }}>
              <TableContainer>
                <Table style={{ backgroundColor: 'rgb(45, 133, 231, 0.08)' }}>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Quantity</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Unit</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Product Name</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Unit Price</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Commission Rate</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}>Amount</TableHeaderCell>
                      <TableHeaderCell align="center" sx={{ color: '#707070', fontWeight: 550 }}></TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderedProducts?.map((product, index) => (
                      <TableRow sx={{ backgroundColor: index % 2 === 0 ? 'inherit' : 'rgb(45, 133, 231, 0.08)' }} key={product.product.productid}>
                        <TableCell align='center' sx={{ color: "#156D94" }}>
                          {/* <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              if (newValue < 0) {
                                handleUpdateQuantity(product, 0);
                              } else {
                                handleUpdateQuantity(product, newValue);
                              }
                            }}
                          /> */}
                          <StyledNumber
                            variant="outlined"

                            type='number'
                            value={product.quantity}
                            style={{ width: 90 }}
                            onChange={(e) => {
                              const newValue = Number(e.target.value);
                              if (newValue < 0) {
                                handleUpdateQuantity(product, 0);
                              } else {
                                handleUpdateQuantity(product, newValue);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}>{product.product.unit}</TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}>{product.product.name}</TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}>{product.product.price}</TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}>{product.product.commissionrate}</TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}>{product.product.price * product.quantity}</TableCell>
                        <TableCell align='center' sx={{ color: "#203949" }}><RemoveButton onClick={() => handleRemoveFromCart(product)}><RemoveCircleIcon /></RemoveButton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <br></br>
            <Paper sx={{ width: '220px', height: '40px', display: 'flex', marginLeft: 'auto', alignContent: 'center', paddingTop: 2, paddingLeft: 2 }}><Typography sx={{ fontSize: 15, color: "#000000", fontWeight: "bold" }}>Total Amount: Php {totalAmount}</Typography></Paper>
            <br></br>
          </Grid>
        </Grid>
        <SaveButton variant='contained' onClick={handleSaveOrder}>Confirm</SaveButton>
        
        {/* Alerts */}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }} TransitionComponent={SlideTransitionDown}>
          <Alert onClose={handleClose} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
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
        
      </OverallGrid>
    </div>
  )
}
