import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextFieldProps, MenuItem, Autocomplete } from '@mui/material'
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
  left: -30
})

const OverallGrid = styled(Grid)({
  position: 'relative',
  display: "flex",
  justifyContent: "center",
  top: 50
})

export default function OrderConfirmation() {

  const {objectId} = useParams();
  
  const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus, updateOrder] = useRestOrder();

  const [getDealerByID, newDealer,updateDealer, isDealerFound, dealer] = useRestDealer();

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

  const quantityRef = useRef<TextFieldProps>(null);
  const penaltyRateRef = useRef<TextFieldProps>(null);
  const dealerIDRef = useRef<TextFieldProps>(null);


  const orderID = 'fa20eeaf';

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

  const handleFindOrder = () => {
    getOrderByID(objectId!);
  }




  function getAllProducts() {
    axios.get<IProduct[]>('http://localhost:8080/product/getAllProducts')
      .then((response) => {
        setProducts(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
        alert("Error retrieving products. Please try again.");
      });
  }

  const [isDataFetched, setDataFetched] = useState(false);

  useEffect(() => {

    if (!isDataFetched) {
      getAllProducts();
      handleFindOrder();

     /*  const newTotalAmount = orderedProducts?.reduce((total, product) => {
        return total + product.product.price * product.quantity;
      }, 0); */

     




      setDataFetched(true); // Set the flag to true to prevent re-fetching
    }

    setOrderedProducts(order?.orderedproducts!);
    setTotalAmount(order?.orderamount!);

    setMinDate(dayjs() as Dayjs);


    /* getAllProducts();
    handleFindOrder();
  
    const newTotalAmount = orderedProducts?.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
    
    setTotalAmount(newTotalAmount); */

    //console.log(orderedProducts)

    // setIsMounted(true); // Set the component as mounted when it renders

    // Only make the GET request if the component is mounted
    // if (isMounted) {

    //setOrderedProducts(order?.orderedproducts!)
    //console.log("sa mount")
    //console.log(orderedProducts)
    //  }
    // return () => {
    //     setIsMounted(false);
    // }; 


  }, [order, isDataFetched]);

  /* useLayoutEffect(()=> {
    setOrderedProducts(order?.orderedproducts!)
    console.log("sa mount")
    console.log(orderedProducts)
  },[]) */


  const handleAddToCart = () => {

    if (chosenProduct) {
      const uuid = uuidv4();
      const orderedproductuuid = uuid.slice(0, 8);
      const existingProductIndex = orderedProducts.findIndex(
        (item) => item.product.productid === chosenProduct.productid
      );

      if (existingProductIndex !== -1) {
        alert('Product already added to the cart');
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
      }
    }

    console.log(orderedProducts)
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
    console.log(totalAmount)
    if(penaltyRateRef === null || selectedDate === null || paymentTerm === 0){
      alert("Please fill in all the necessary fields.")
    }
    else{
    console.log("1" + orderedProducts)
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
      collector: null,
      dealer: dealer!,
      orderedproducts: orderedProducts,
      paymenttransactions: [],
      confirmed: true,
      isclosed: false
    };
    // Call the updateOrder function with the order ID and updated order data
    updateOrder(existingOrderId, updatedOrder);
    //if possible kay ara na siya mo clear after sa snackbar
    clearInputValues();
  }

  }


 





  return (
    <div>
      <TitleBox>
        <TitleTypo>Product Distribution Form</TitleTypo>
      </TitleBox>
      <OverallGrid container>
        <LabelGrid container>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Order ID</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
            <Typography>Dealer ID</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
            <Typography>Dealer Name</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
            <Typography>Distribution Date</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
            <Typography>Penalty Rate</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: 13, marginRight: -1 }}>
            <Typography>Payment Terms</Typography>
          </Grid>
        </LabelGrid>

        <div style={{ display: "flex", flexDirection: "row", marginTop: '50px', alignItems: 'center' }}>
   <Typography sx={{ marginRight: '90px', marginLeft: -8   }}>{order?.orderid}</Typography>
  <Typography sx={{ marginRight: '100px', marginLeft: 1 }}>{order?.dealer.dealerid}</Typography>
  <Typography sx={{ marginRight: '20px', marginLeft: 1 }}>{order?.dealer.firstname + " " + order?.dealer.middlename + " " + order?.dealer.lastname}</Typography>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <StyledDatePicker
      sx={{ marginLeft: '20px', marginRight: '20px' }}
      slotProps={{
        textField: {
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
  <StyledTextField
    variant="outlined"
    InputProps={{ disableUnderline: true }}
    inputRef={penaltyRateRef}
    sx={{ marginRight: '20px' }}
  ></StyledTextField>
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
</div>
        {/*   </Box> */}
        <Grid item container sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
          <Grid item>
            <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", height: "200px", justifyContent: 'center', display: 'flex', alignItems: 'center', position: 'relative', width: '1200px' }}>
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
              <AddToCart variant="contained" onClick={() => { handleAddToCart(); }}>ADD TO CART</AddToCart>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
          <Grid item >
            <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none' }}>
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
                    {orderedProducts?.map((product) => (
                      <TableRow key={product.product.productid}>
                       <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>
                          <input
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
                          />
                        </TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.unit}</TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.name}</TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.price}</TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.commissionrate}</TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.price * product.quantity}</TableCell>
                        <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}><Button onClick={() => handleRemoveFromCart(product)}>REMOVE</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <br></br>
            <Paper sx={{width:'200px',display: 'flex', marginLeft:'auto', alignContent:'center'}}><Typography sx={{fontSize: 15,color: "#000000",fontWeight: "bold"}}>Total Amount:</Typography><Typography>  Php {totalAmount}</Typography></Paper>
            <br></br>
          </Grid>
        </Grid>
        <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, paddingRight: 6, fontWeight: 'bold', borderRadius: 5 }}
          onClick={handleSaveOrder}>Confirm</Button>
      </OverallGrid>
    </div>
  )
}
