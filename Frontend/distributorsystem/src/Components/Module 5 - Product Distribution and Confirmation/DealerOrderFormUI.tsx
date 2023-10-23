import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextFieldProps, MenuItem, Autocomplete } from '@mui/material'
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

export default function DealerOrderForm() {

  const [newOrder] = useRestOrder();

  const [getDealerByID, newDealer,updateDealer, isDealerFound, dealer] = useRestDealer();

  const [tableData, setTableData] = useState<{ quantity: number; productName: string; productPrice: number; productUnit: string; productCommissionRate: number; productAmount: number; }[]>([]);

  const [products, setProducts] = useState<IProduct[]>([]);

  const [orderedProducts, setOrderedProducts] = useState<IOrderedProducts[]>([]);

  const [chosenProduct, setChosenProduct] = useState<IProduct | null>(null);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const [paymentTerm, setPaymentTerm] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [quantity, setQuantity] = useState<string>('');

  const quantityRef = useRef<TextFieldProps>(null);
  const penaltyRateRef = useRef<TextFieldProps>(null);
  const dealerIDRef = useRef<TextFieldProps>(null);


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
    findDealer();
    getAllProducts();
    const newTotalAmount = orderedProducts.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);

    // Update the total amount state
    setTotalAmount(newTotalAmount);

  }, [isDealerFound, products, orderedProducts]);
/* 
  function createOrderedProduct(product: IProduct, quantity: number, subtotal:number): IOrderedProducts {
    return {
      product: product,
      quantity: quantity,
      subtotal: product.price * quantity
    };
  } */

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
      const uuid = uuidv4();
      const orderedproductuuid = uuid.slice(0, 8);
      const existingProductIndex = orderedProducts.findIndex(
        (item) => item.product.productid === chosenProduct.productid
      );

      if (existingProductIndex !== -1) {
        alert('Product already added to the cart');
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
      }

    }
  };


    const handleAddProduct = () => {
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
        confirmed: false
      });

      console.log(orderuuid)
      alert({orderuuid})
    }
    
    // Update your order state or send the order data to your API for saving
  };


  const handleFindDealer = () => {
    getDealerByID("dealer1")
  };

  const findDealer = () => {
    getDealerByID("dealer1")

  }


  return (
    <div>
      <TitleBox>
        <TitleTypo>Product Distribution Form</TitleTypo>
      </TitleBox>
      <OverallGrid container>
       
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
              <StyledQuantityField variant="outlined" InputProps={{ disableUnderline: true }} value={quantity} onChange={(e) =>setQuantity(e.target.value)} />
              <AddToCart variant="contained" onClick={() => { handleAddToCart();}}>ADD TO CART</AddToCart>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
          <Grid item >
          <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", width: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none' }}>            <TableContainer>
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
                    {orderedProducts.map((product) => (
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
        
        <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, paddingRight: 6, fontWeight: 'bold', borderRadius: 5}}
          onClick={handleSaveOrder}>Save</Button>
      </OverallGrid>
    </div>
  )
}
