import React, { useEffect, useRef, useState } from 'react';
import { Typography, Grid, Card, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Autocomplete, styled, TextField, SelectChangeEvent, TextFieldProps, IconButton, InputProps } from "@mui/material";
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
;
import { v4 as uuidv4 } from 'uuid';



const StyledProductTextField = styled(TextField)({
  backgroundColor: "#AFD3E2", borderRadius: "22px", input: {
    padding: "10px", color: "black"
  },
  width: '200px',

});

const StyledTextField = styled(TextField)({
  backgroundColor: "#ffffff", borderRadius: "22px", input: {
    padding: "10px", color: "black"
  },
  width: '200px'

});

const StyledDatePicker = styled(DatePicker)({
  backgroundColor: "#ffffff", borderRadius: "22px", input: {
    padding: "10px"
  },
});


export default function DistributorOrderForm() {

  const [newOrder ] = useRestOrder();

  const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();

  const [tableData, setTableData] = useState<{ quantity: number; productName: string; productPrice: number; productUnit: string; productCommissionRate: number; productAmount: number; }[]>([]);

  const [products, setProducts] = useState<IProduct[]>([]);

  const [orderedProducts, setOrderedProducts] = useState<IOrderedProducts[]>([]);

  const [chosenProduct, setChosenProduct] = useState<IProduct| null>(null);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const [paymentTerm, setPaymentTerm] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState<string>(''); 



  const quantityRef = useRef<TextFieldProps>(null)
  const penaltyRateRef = useRef<TextFieldProps>(null)
  const dealerIDRef = useRef<TextFieldProps>(null)


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
    },
  ];


  useEffect(() => {
    getAllProducts();
    const newTotalAmount = orderedProducts.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);
  
    // Update the total amount state
    setTotalAmount(newTotalAmount);

  }, [isDealerFound, products, orderedProducts]);

  function createOrderedProduct(product: IProduct, quantity: number, subtotal:number): IOrderedProducts {

    return {
      product: product,
      quantity: quantity,
      subtotal: subtotal
    };
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

  const handleAddToCart = () => {
    if (chosenProduct) {
      const existingProductIndex = orderedProducts.findIndex(
        (item) => item.product.productid === chosenProduct.productid
      );
  
      if (existingProductIndex !== -1) {
        alert('Product already added to the cart');
      }else{
      const newOrderedProduct: IOrderedProducts = {
        product: chosenProduct,
        quantity: Number(quantity),
        subtotal: chosenProduct.price * Number(quantity),
      };
      console.log(chosenProduct.price * Number(quantity))
      setOrderedProducts([...orderedProducts, newOrderedProduct]);
      setChosenProduct(null);
      setQuantity('');
    }
      
    }
  };


/*   const handleAddProduct = () => {
    const value = quantityRef.current?.value;

    if (chosenProduct) {
      const quantity = parseInt(value as string);
      const productAmount = quantity * chosenProduct.price;
      const newTableData = [...tableData, {
        quantity: parseInt(value as string),
        productName: chosenProduct.name,
        productPrice: chosenProduct.price,
        productUnit: chosenProduct.unit,
        productCommissionRate: chosenProduct.commissionrate,
        productAmount: productAmount
      }];
      const updatedTotalAmount = newTableData.reduce((sum, product) => sum + product.productAmount, 0);
      setTotalAmount(updatedTotalAmount);

      setTableData(newTableData);
    }
  }; */

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

  const handleRemoveLastProduct = () => {
    const lastProduct = tableData[tableData.length - 1];
    const lastProductAmount = lastProduct.productAmount;

    setTableData(tableData.slice(0, -1));
    setTotalAmount(totalAmount - lastProductAmount);

    setOrderedProducts(orderedProducts.slice(0, -1));
  };

  /* const handleNewOrder = () => {
    if (isDealerFound) {
      const uuid = uuidv4();
      const orderuuid = uuid.slice(0, 8);

      newOrder({
        orderid: orderuuid,
        distributiondate: selectedDate?.format('YYYY-MM-DD') || '',
        //moment ang gamit ani para maka generate og date today
        orderdate: moment().format('YYYY-MM-DD'),
        penaltyrate: Number(penaltyRateRef.current?.value),
        paymentterms: paymentTerm,
        orderamount: totalAmount,
        collector: null,
        dealer: dealer!,
        orderedproducts: orderedProducts,
        paymenttransactions: [],
      });
    }
  }; */


  const handleSaveOrder = () => {
    // Calculate the total order amount based on orderedProducts
    const orderAmount = orderedProducts.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);

    // Create an order object with the necessary data
    if (isDealerFound) {
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
      collector: null,
      dealer: dealer!,
      orderedproducts: orderedProducts,
      paymenttransactions: [],
    });
  }
    // Update your order state or send the order data to your API for saving
  };


  const handleFindDealer = () => {
    getDealerByID(dealerIDRef.current?.value+"")
  };


  return (
    <>
      <div>
        <div style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px", marginBottom: "20px" }}>
          <h1 style={{ color: "White", fontFamily: "Verdana" }}>Product Distribution Form</h1>
          <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item>
              <Typography sx={{ color: "white" }}>Dealer ID</Typography>
              <Paper sx={{ backgroundColor: "#ffffff", borderRadius: "22px", height: "fit-content" }}>
                <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={dealerIDRef}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFindDealer}>
                  <SearchIcon />
                </IconButton>

              </Paper>
            </Grid>

            <Grid item>
              <Typography sx={{ color: "white" }}>Distribution Date</Typography>
            
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker sx={{ borderColor: 'white' }}
                  slotProps={{
                    textField: {
                      InputProps: {
                        disableUnderline: true
                      },
                      // Set the variant to "standard"
                      variant: "standard",
                      style: { width: '90%', padding: '0 10px 0 10px' }

                    }
                  }}
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date as Dayjs | null)}
                />

              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Typography sx={{ color: "white" }}>Penalty Rate</Typography>
              <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={penaltyRateRef} />
            </Grid>

            <Grid item>
              <Typography sx={{ color: "white" }}>Payment Terms</Typography>

              <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }}  sx={{
                  background: "white", borderRadius: 20, width: 210, height: 45
                }}
                select
                value={paymentTerm}
                onChange={(event) => setPaymentTerm(Number(event.target.value))}>
                {paymentchoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>


             
            </Grid>
          </Grid>
          <Box sx={{ m: 5 }} />
          <div style={{ marginLeft: "300px", marginTop: "40px", marginRight: "300px", marginBottom: "40px" }}>
            <Card sx={{ padding: 3, display: "flex", justifyContent: "center", alignSelf: "center" }}>
              <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item>


                  <Typography sx={{ color: "#146C94" }}>Product Name</Typography>


                  <Autocomplete disablePortal id="flat-demo" options={products}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.productid === value.productid}
                    value={chosenProduct}
                    onChange={(event, newValue) => setChosenProduct(newValue!)}
                    renderInput={(params) => (<StyledProductTextField {...params} variant='standard' InputProps={{
                      ...params.InputProps, disableUnderline: true
                    }}

                    />)}


                  />
                </Grid>


                <Grid item>
                  <Typography sx={{ color: "#146C94" }}>Quantity</Typography>
                  <StyledProductTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} value={quantity}
          onChange={(e) => setQuantity(e.target.value)}></StyledProductTextField>
                </Grid>
                <Grid item>
                  <Button variant='contained' style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#2A9221" }} onClick={() => { handleAddToCart(); }}>Add to Cart</Button>


                  <Box sx={{ m: 3 }} />
                  {/* <Button variant='contained' style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#E77D7D" }}
                    onClick={() => { handleRemoveLastProduct(); }}>Remove Item</Button> */}
                </Grid>
              </Grid>
            </Card>
          </div>
          <div style={{ marginLeft: "200px", marginTop: "40px", marginRight: "200px", marginBottom: "40px" }}>
            <Box sx={{ m: 5 }} />
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650, color: "#156D94" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Quantity</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Unit</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Product Name</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Unit Price</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Commission Rate</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderedProducts.map((product) => (
                    <TableRow key ={product.product.productid}

                    >
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }} ><input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(product, Number(e.target.value))
                    }
                  /></TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.unit}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.name}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.price}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.commissionrate}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{product.product.price*product.quantity}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}><Button onClick={() => handleRemoveFromCart(product)}>REMOVE</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>



            <Box sx={{ m: 0.5 }} />
            <Grid container spacing={2} sx={{ justifyContent: "right" }}>
              <Grid item>
                <Typography align='center' sx={{ color: "white", fontWeight: "bold", padding: 0.5 }}>Total Amount: </Typography>
              </Grid>
              <Grid item>
                <Typography align='center' sx={{ color: "#156D94", background: "white", width: 75, padding: 0.3, borderRadius: 1 }}>{totalAmount}</Typography>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ m: 3 }} />
          <Box textAlign='center'>
            <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, paddingRight: 6, fontWeight: 'bold', borderRadius: 5 }} disabled={!isDealerFound}
              onClick={handleSaveOrder}> Save


            </Button>
          </Box>
        </div>
      </div >
    </>
  );

  /* return (
    <>
      <div>
        <div style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px", marginBottom: "20px" }}>
          <h1 style={{ color: "White", fontFamily: "Verdana" }}>Product Distribution Form</h1>
          <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item>
              <Typography sx={{ color: "white" }}>Dealer ID</Typography>
              <Paper sx={{ backgroundColor: "#ffffff", borderRadius: "22px", height: "fit-content" }}>
                <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={dealerIDRef}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFindDealer}>
                  <SearchIcon />
                </IconButton>

              </Paper>
            </Grid>

            <Grid item>
              <Typography sx={{ color: "white" }}>Distribution Date</Typography>
            
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker sx={{ borderColor: 'white' }}
                  slotProps={{
                    textField: {
                      InputProps: {
                        disableUnderline: true
                      },
                      // Set the variant to "standard"
                      variant: "standard",
                      style: { width: '90%', padding: '0 10px 0 10px' }

                    }
                  }}
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date as Dayjs | null)}
                />

              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Typography sx={{ color: "white" }}>Penalty Rate</Typography>
              <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={penaltyRateRef} />
            </Grid>

            <Grid item>
              <Typography sx={{ color: "white" }}>Payment Terms</Typography>

              <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }}  sx={{
                  background: "white", borderRadius: 20, width: 210, height: 45
                }}
                select
                value={paymentTerm}
                onChange={(event) => setPaymentTerm(Number(event.target.value))}>
                {paymentchoices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </StyledTextField>


             
            </Grid>
          </Grid>
          <Box sx={{ m: 5 }} />
          <div style={{ marginLeft: "300px", marginTop: "40px", marginRight: "300px", marginBottom: "40px" }}>
            <Card sx={{ padding: 3, display: "flex", justifyContent: "center", alignSelf: "center" }}>
              <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item>


                  <Typography sx={{ color: "#146C94" }}>Product Name</Typography>


                  <Autocomplete disablePortal id="flat-demo" options={products}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.productid === value.productid}
                    value={chosenProduct}
                    onChange={(event, newValue) => setChosenProduct(newValue!)}
                    renderInput={(params) => (<StyledProductTextField {...params} variant='standard' InputProps={{
                      ...params.InputProps, disableUnderline: true
                    }}

                    />)}


                  />
                </Grid>


                <Grid item>
                  <Typography sx={{ color: "#146C94" }}>Quantity</Typography>
                  <StyledProductTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={quantityRef} />
                </Grid>
                <Grid item>
                  <Button variant='contained' style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#2A9221" }} onClick={() => { handleAddProduct(); setOrderedProducts([...orderedProducts, createOrderedProduct(chosenProduct!, Number(quantityRef.current?.value))]); }}>Add to Cart</Button>


                  <Box sx={{ m: 3 }} />
                  <Button variant='contained' style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#E77D7D" }}
                    onClick={() => { handleRemoveLastProduct(); }}>Remove Item</Button>
                </Grid>
              </Grid>
            </Card>
          </div>
          <div style={{ marginLeft: "200px", marginTop: "40px", marginRight: "200px", marginBottom: "40px" }}>
            <Box sx={{ m: 5 }} />
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650, color: "#156D94" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Quantity</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Unit</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Product Name</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Unit Price</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Commission Rate</TableCell>
                    <TableCell align='center' sx={{ color: "#156D94", fontWeight: "bold", borderRight: "3px #AFD3E2 solid" }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow

                    >
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }} >{row.quantity}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{row.productUnit}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{row.productName}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{row.productPrice}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{row.productCommissionRate}</TableCell>
                      <TableCell align='center' sx={{ color: "#156D94", borderRight: "3px #AFD3E2 solid" }}>{row.productAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>



            <Box sx={{ m: 0.5 }} />
            <Grid container spacing={2} sx={{ justifyContent: "right" }}>
              <Grid item>
                <Typography align='center' sx={{ color: "white", fontWeight: "bold", padding: 0.5 }}>Total Amount: </Typography>
              </Grid>
              <Grid item>
                <Typography align='center' sx={{ color: "#156D94", background: "white", width: 75, padding: 0.3, borderRadius: 1 }}>{totalAmount}</Typography>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ m: 3 }} />
          <Box textAlign='center'>
            <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, paddingRight: 6, fontWeight: 'bold', borderRadius: 5 }} disabled={!isDealerFound}
              onClick={handleNewOrder}> Save


            </Button>
          </Box>
        </div>
      </div >
    </>
  ); */

}
