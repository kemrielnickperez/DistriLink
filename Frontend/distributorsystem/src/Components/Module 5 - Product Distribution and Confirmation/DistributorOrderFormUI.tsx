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
import { IDistributor, IOrderedProducts, IProduct } from '../../RestCalls/Interfaces';

import { v4 as uuidv4 } from 'uuid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useRef, useState } from 'react';
//Imports for Toastify
//Please Install npm i react-toastify or if doesn't work, install npm i react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



function SlideTransitionDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}


const StyledDatePicker = styled(DatePicker)({

  [`& fieldset`]: {
    borderRadius: 20,
    height: 55,
  }
});

const StyledProductTextField = styled(TextField)({
  backgroundColor: "#AFD3E2", borderRadius: "22px", input: {
    padding: "10px", color: "black"
  },
  width: '200px',

});

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
  height: 55,
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

const StyledNumber=styled(TextField)({
  '& fieldset': {
    borderColor: 'rgb(0,0,0,0)', // Change 'your-color' to the desired color
  },
})

const SaveButton= styled(Button)({
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

const RemoveButton =styled(Button)({
  ":hover":{

    transform: 'scale(1.4)'
},
transition: 'all 0.4s'
})

export default function ProductDistributionList() {

  const [newOrder] = useRestOrder();



  const [getDealerByID, newDealer, confirmDealer, markDealerAsPending, declineDealer, isDealerFound, dealer,] = useRestDealer();


  const [tableData, setTableData] = useState<{ quantity: number; productName: string; productPrice: number; productUnit: string; productCommissionRate: number; productAmount: number; }[]>([]);

  const [products, setProducts] = useState<IProduct[]>([]);

  const [orderedProducts, setOrderedProducts] = useState<IOrderedProducts[]>([]);

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



  const penaltyRateRef = useRef<TextFieldProps>(null);
  const dealerIDRef = useRef<TextFieldProps>(null);






  const distributorObject: IDistributor = {

    distributorid: "distributor1",
    firstname: "Junhui",
    middlename: "",
    lastname: "Wen",
    emailaddress: "wenjunhui@gmail.com",
    password: "moonmoon",
    birthdate: "1996-06-10",
    gender: "Male",
    currentaddress: "Talisay City",
    permanentaddress: "Talisay City",
    contactnumber: "09741258963",
    dealerids: [],
    employeeids: [],
    orderids: []
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
  useEffect(() => {
    getAllProducts();
    const newTotalAmount = orderedProducts.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);

    // Update the total amount state
    setTotalAmount(newTotalAmount);

    setMinDate(dayjs() as Dayjs);

  }, [isDealerFound, products, orderedProducts]);



  /*   function createOrderedProduct(product: IProduct, quantity: number, subtotal:number): IOrderedProducts {
      return {
        product: product,
        quantity: quantity,
        subtotal: product.price * quantity
      };
    }
   */


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
        // headerHandleAlert('Success', 'Products have been successfully added for distribution.', 'success');
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
        headerHandleAlert('Error', 'Error retrieving products. Please try again.', 'error');
        // alert("Error retrieving products. Please try again.");
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
        // alert('Product already added to the cart');
        // toast
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
        console.log(chosenProduct.price * Number(quantity))
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
    // handleRemoveCartAlert(product.product.name + ' has been removed to the cart', 'success');
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
    setSelectedDate(null);
    setPaymentTerm(0);
    setTotalAmount(0);


    if (dealerIDRef.current || penaltyRateRef.current?.value) {
      dealerIDRef.current!.value = '';
      penaltyRateRef.current!.value = '';
    }

  }

  const handleSaveOrder = () => {
    // Calculate the total order amount based on orderedProducts
    if (orderedProducts.length === 0) {
      saveHandleAlert('No Ordered Products', "Please add products to your order before saving.", 'warning')
    }

    // Create an order object with the necessary data
    else if (orderedProducts.length > 0 && isDealerFound) {
      const orderAmount = orderedProducts.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0);
      const uuid = uuidv4();
      const orderuuid = uuid.slice(0, 8)
      console.log(orderedProducts)
      newOrder({
        orderid: orderuuid,
        distributiondate: selectedDate?.format('YYYY-MM-DD') || '',
        //moment ang gamit ani para maka generate og date today
        orderdate: moment().format('YYYY-MM-DD'),
        penaltyrate: Number(penaltyRateRef.current?.value),
        paymentterms: paymentTerm,
        orderamount: orderAmount,
        distributor: dealer!.distributor,
        collector: null,
        dealer: dealer!,
        orderedproducts: orderedProducts,
        paymenttransactions: [],
        confirmed: true,
        isclosed: false
      });
      //if possible kay ara na siya mo clear after sa snackbar
      saveHandleAlert('Success Saving Order', "Your ordered products have been successfully saved!", 'success')
      clearInputValues();
    }

    else {
      saveHandleAlert('Error Saving Order', "Your order hasn't been saved due to an unexpected error.", 'error')
    }

  };



  const handleFindDealer = () => {
    getDealerByID(dealerIDRef.current?.value + "")
    // //Problematic pa siya ngari na part kay kaduha pa ka dapat mo click aron ma sakto iya i display nga snackbar
    // isDealerFound ? saveHandleAlert('Dealer located in the System.', "The dealer ID has been found and is ready for product distribution.", 'success')
    //   : saveHandleAlert('Dealer Not Found in the System.', "The dealer ID you're looking for does not exist in the records.", 'error')

  };


  return (
    <div>


      <OverallGrid container>
        <Box sx={{ pl: 2, pr: 2 }}>
          <LabelGrid container>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Dealer ID</StyleLabel>
              <StyledTextField
                sx={{ zIndex: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" >
                      <IconButton type="button" sx={{ zIndex: 1, backgroundColor: "#2d85e7", left: 14, top: -1.5, height: '50px', width: '51px', borderRadius: "0 20px 20px 0", '&:hover': { backgroundColor: "#2d85e7" } }} onClick={handleFindDealer}>
                        <SearchIcon sx={{ color: "white" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                inputRef={dealerIDRef}
              >
              </StyledTextField>
            </Grid>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Distribution Date</StyleLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker

                  slotProps={{
                    textField: {
                      style: { height: 55 },
                      InputProps: {
                        disableUnderline: true
                      },

                      // Set the variant to "standard"
                      variant: "outlined",
                    }
                  }}
                  value={selectedDate}
                  minDate={minDate}
                  onChange={(date) => setSelectedDate(date as Dayjs | null)} />
              </LocalizationProvider>

            </Grid>
            <Grid item paddingRight={5} paddingBottom={2}>
              <StyleLabel>Penalty Rate</StyleLabel>
              <StyledTextField style={{ width: 250 }} variant="outlined" InputProps={{ disableUnderline: true }} inputRef={penaltyRateRef}></StyledTextField>
            </Grid>
            <Grid item>
              <StyleLabel>Payment Terms</StyleLabel>
              <StyledTextField
                variant="outlined"
                select
                style={{ width: 250 }}
                value={paymentTerm}
                onChange={(event) => setPaymentTerm(Number(event.target.value))}>
                {paymentchoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
          </LabelGrid>
        </Box>
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
            <Paper sx={{ width: '220px', height: '40px', display: 'flex', marginLeft: 'auto', alignContent: 'center', paddingTop: 2, paddingLeft: 2 }}><Typography sx={{ fontSize: 15, color: "#000000", fontWeight: "bold" }}>Total Amount: Php {totalAmount}</Typography></Paper>
            <br></br>
          </Grid>
        </Grid>
        <SaveButton variant='contained' onClick={handleSaveOrder}>Save</SaveButton>


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