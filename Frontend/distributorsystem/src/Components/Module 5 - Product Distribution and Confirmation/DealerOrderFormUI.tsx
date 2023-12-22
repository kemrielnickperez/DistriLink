import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextFieldProps, MenuItem, Autocomplete, Snackbar, Alert, AlertTitle, SlideProps, Slide } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRestOrder } from '../../RestCalls/OrderUseRest';
import { useRestDealer } from '../../RestCalls/DealerUseRest';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; import { Dayjs } from 'dayjs';
import moment from 'moment';
import { IOrderedProducts, IProduct } from '../../RestCalls/Interfaces';
import { v4 as uuidv4 } from 'uuid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useRef, useState } from 'react';
import { BorderAllOutlined } from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//Imports for Toastify
//Please Install npm i react-toastify or if doesn't work, install npm i react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SlideTransitionDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}


const StyledDatePicker = styled(DatePicker)({
  [`& fieldset`]: {
    borderRadius: 20
  }
});

const StyledProductTextField = styled(TextField)({
  backgroundColor: "#AFD3E2", borderRadius: "22px", input: {
    padding: "10px", color: "black"
  },
  width: '200px',

});

const StyledTextField = styled(TextField)({
  [`& fieldset`]: {
    borderRadius: 20
  }
})

const LabelGrid = styled(Grid)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  top: 20,
  left: -60
})

const TableHeaderCell = styled(TableCell)({
  fontSize: 15,
  color: "#000000",
  fontWeight: "bold"
});

const ProductName = styled(Typography)({
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
const SaveButton= styled(Button)({

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

const OverallGrid = styled(Grid)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  top: 50
})
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
const StyledNumber=styled(TextField)({
  '& fieldset': {
    borderColor: 'rgb(0,0,0,0)', // Change 'your-color' to the desired color
  },
})
const RemoveButton =styled(Button)({
  ":hover":{

    transform: 'scale(1.4)'
},
transition: 'all 0.4s'
})
export default function DealerOrderForm() {

  const  [newOrder, getOrderByID, getOrderByPaymentTransactionID, assignCollector, removeCollector, order, orderFromPaymentTransaction, isOrderFound, assignedStatus, removeStatus, updateOrder, closedOrder, applyPenalty] = useRestOrder();
  const [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, resetDealer, updateDealerCreditLimit, isDealerFound, isDealerConfirmed, dealer, dealerRemainingCredit] = useRestDealer();


  const [products, setProducts] = useState<IProduct[]>([]);

  const [orderedProducts, setOrderedProducts] = useState<IOrderedProducts[]>([]);

  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const [paymentTerm, setPaymentTerm] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState<string>('');

  const [alerttitle, setTitle] = useState('');

  const [alertMessage, setAlertMessage] = useState('');

  const [alertSeverity, setAlertSeverity] = useState('success');

  const [open, setOpen] = useState(false);



  const penaltyRateRef = useRef<TextFieldProps>(null);


  const userFromStorage = JSON.parse(localStorage.getItem("user")!);


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

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      // Your code to be executed once after component mounts
      findDealer();

      // Set isMounted to true to prevent this block from running again
      isMounted.current = true;
    }

    getAllProducts();

    const newTotalAmount = orderedProducts.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);

    // Update the total amount state
    setTotalAmount(newTotalAmount);

    console.log(isDealerFound)


  }, [orderedProducts, products]); // Include only the dependencies that are used inside the useEffect


  {/**Handler for Alert - Function to define the type of alert*/ }
  function headerHandleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
    setTitle(title);
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpen(true);
  }
  {/**Handler to Close Alert Snackbar*/ }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  function getAllProducts() {
    axios.get<IProduct[]>('http://localhost:8080/product/getAllProducts')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
        headerHandleAlert('Error', 'Error retrieving products. Please try again.', 'error');

      });
  }

  const handleAddToCart = () => {
    if (chosenProduct) {
      const uuid = uuidv4();
      const orderedproductuuid = uuid.slice(0, 8);
      const existingProductIndex = orderedProducts.findIndex(
        (item) => item.product.productid === chosenProduct.productid
      );

      if (existingProductIndex !== -1) {

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
        setOrderedProducts([...orderedProducts, newOrderedProduct]);
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
    // toast
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
    setTotalAmount(0);
  }

  const findDealer = () => {

    getDealerByID(userFromStorage.dealer.dealerid)
  }

  const handleSaveOrder = () => {
    // Calculate the total order amount based on orderedProducts
    if (orderedProducts.length === 0) {
      headerHandleAlert('No Ordered Products', "Please add products to your order before saving.", 'warning')
    }

    // Create an order object with the necessary data
    else if (orderedProducts.length > 0 && isDealerFound === true) {
      const orderAmount = orderedProducts.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);
      if (orderAmount < dealerRemainingCredit!) {
        newOrder({
          orderid: uuidv4().slice(0, 8),
          distributiondate: selectedDate?.format('YYYY-MM-DD') || '',
          //moment ang gamit ani para maka generate og date today
          orderdate: moment().format('YYYY-MM-DD'),
          penaltyrate: Number(penaltyRateRef.current?.value),
          paymentterms: paymentTerm,
          orderamount: orderAmount,
          distributor: dealer!.distributor!,
          collector: null,
          dealer: dealer!,
          orderedproducts: orderedProducts,
          paymenttransactions: [],
          confirmed: false,
          isclosed: false
        });
        //if possible kay ara na siya mo clear after sa snackbar
        headerHandleAlert('Success Saving Order', "Your ordered products have been successfully saved!", 'success')
        clearInputValues();
      }
      else {
        headerHandleAlert('Order Amount Exceeded Remaining Credit', "Total order amount exceeded the remaining credit ( ₱" + dealerRemainingCredit + "). Please adjust ToT.", 'warning')
      }
    }

    else {
      headerHandleAlert('Error Saving Order', "Your order hasn't been saved due to an unexpected error.", 'error')
    }


    // Update your order state or send the order data to your API for saving
  };






  return (
    <div>
      <OverallGrid container>
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
            <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "10px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none' }}>            <TableContainer>
              <Table aria-label='simple table'>
                <TableHead style={{ backgroundColor: 'rgb(45, 133, 231, 0.08)', }}>
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
                  {orderedProducts.map((product, index) => (
                    <TableRow sx={{ backgroundColor: index % 2 === 0 ? 'inherit' : 'rgb(45, 133, 231, 0.08)' }} key={product.product.productid}>
                      <TableCell align='center' sx={{  color: "#203949" }}>
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
                            style={{width:90}}
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
                      <TableCell align='center' sx={{ color: "#203949" }}><RemoveButton onClick={() => handleRemoveFromCart(product)}><RemoveCircleIcon/></RemoveButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper>
            <br></br>
            <Paper sx={{ width: '200px', display: 'flex', marginLeft: 'auto', alignContent: 'center' }}><Typography sx={{ fontSize: 15, color: "#000000", fontWeight: "bold" }}>Total Amount:</Typography><Typography>  Php {totalAmount}</Typography></Paper>
            <br></br>
          </Grid>
        </Grid>

        <SaveButton variant='contained' onClick={handleSaveOrder} disabled={!isDealerFound}>Save</SaveButton>
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
          style={{ width: 430 }}
          theme="colored"
        />


      </OverallGrid>
    </div>
  )
}
