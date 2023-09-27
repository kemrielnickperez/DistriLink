import {TextField, Typography, Grid, Card, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Autocomplete} from "@mui/material";
import NavBar from "../../Global Components/NavBar";

function createData(
    quantity: number,
    unit: string,
    productName: string,
    unitPrice: number,
    commissionRate: number,
    amount:number
  ) {
    return { quantity, unit, productName, unitPrice, commissionRate, amount };
  }

  const rows = [
    createData(5, 'piece', 'Lotion (90 mL)', 500, 9, 2750),
    createData(5, 'box', 'Perfume (120 mL)', 500, 9, 2750),
    createData(5, 'piece', 'toothpaste (150 g tube)', 500, 9, 2750),
    createData(5, 'piece', 'Shampoo (20 mL)', 500, 9, 2750),
    createData(5, 'piece', 'Conditioner (20 mL)', 500, 9, 2750),
  ];

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
];


export default function orderConfirmation(){
    return(
        <>
        <div>
        
         <div style={{marginLeft:"50px", marginTop:"20px",marginRight:"50px", marginBottom:"20px"}}>
         <h1 style={{color:"White", fontFamily:"Verdana"}}>Product Distribution Form</h1>
         <Grid container spacing = {10} sx={{display:"flex", justifyContent: "center"}}>
        <Grid item>
        <Typography sx={{color:"white"}}>Transaction ID</Typography>
        <Typography sx={{color:"white", fontWeight:"bold", fontSize: "25px"}}>sp250a</Typography>
        </Grid>
        <Grid item>
        <Typography sx={{color:"white"}}>Dealer ID</Typography>
        <Typography sx={{color:"white", fontWeight:"bold", fontSize: "25px"}}>12E320X</Typography>
        </Grid>
        <Grid item>
        <Typography sx={{color:"white"}}>Dealer Name</Typography>
        <Typography sx={{color:"white", fontWeight:"bold", fontSize: "25px"}}>John Doe</Typography>
        </Grid>
        <Grid item>
        <Typography sx={{color:"white"}}>Order Date</Typography>
        <Typography sx={{color:"white", fontWeight:"bold", fontSize: "25px"}}>March 31, 2023</Typography>
        </Grid>
        </Grid>
         <Box sx={{ m: 5 }} /> 
         <Grid container spacing = {5} sx={{display:"flex", justifyContent: "center"}}>
        <Grid item>
        <Typography sx={{color:"white"}}>Penalty Rate</Typography>
      <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} sx={{background:"white", borderRadius: 20, input:{
        padding: "10px", color:"#156D94"}}} />
        </Grid>
        <Grid item>
        <Typography sx={{color:"white"}}>Payment Terms</Typography>
        <Select
        sx={{background:"white", borderRadius: 20, width: 210, height: 45, input:{
        padding: "10px", color:"#156D94"}}}
      >
        <MenuItem value={1}>Cash</MenuItem>
        <MenuItem value={2}>2-Gives</MenuItem>
        <MenuItem value={3}>4-Gives</MenuItem>
      </Select>
        </Grid>
        </Grid>
        <Box sx={{ m: 5 }} /> 
        <div style={{marginLeft:"300px", marginTop:"40px",marginRight:"300px", marginBottom:"40px"}}>
        <Card sx={{padding: 3, display: "flex", justifyContent: "center", alignSelf: "center"}}>
        <Grid container spacing = {3} sx={{display:"flex", justifyContent: "center"}}>
        <Grid item>
        <Typography sx={{color:"#146C94"}}>Product Name</Typography>
        <Autocomplete disablePortal id="flat-demo" options={top100Films}  sx={{ background:"#AFD3E2", borderRadius: 20, width: 210, height: 40, input:{ color:"#156D94"} }} renderInput={(params) => <TextField {...params} variant='standard' InputProps={{
                            ...params.InputProps, disableUnderline: true}} sx={{ paddingLeft:"5px",paddingTop:"5px",input:{padding:"10px", color:"white"}}} />}/>
        </Grid>
        <Grid item>
        <Typography sx={{color:"#146C94"}}>Quantity</Typography>
      <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} sx={{background:"#AFD3E2", borderRadius: 20, input:{
        padding: "10px", color:"white"}}} />
        </Grid>
        <Grid item>
        <Button variant='contained' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#146C94"}}>Edit Item</Button>
        <Box sx={{ m: 3 }} /> 
        <Button variant='contained' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px', borderRadius: 20, background: "#E77D7D"}}>Remove Item</Button>
        </Grid>
            </Grid>
        </Card>
        </div>
        <div style={{marginLeft:"200px", marginTop:"40px",marginRight:"200px", marginBottom:"40px"}}>
        <Box sx={{ m: 5 }} /> 
        <TableContainer component={Paper} sx={{borderRadius:2}}>
      <Table sx={{ minWidth: 650, color:"#156D94"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Quantity</TableCell>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Unit</TableCell>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Product Name</TableCell>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Unit Price</TableCell>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Commission Rate</TableCell>
            <TableCell align='center' sx={{color:"#156D94", fontWeight:"bold",borderRight: "3px #AFD3E2 solid"}}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
         
            >
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}} >{row.quantity}</TableCell>
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}}>{row.unit}</TableCell>
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}}>{row.productName}</TableCell>
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}}>{row.unitPrice}</TableCell>
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}}>{row.commissionRate}</TableCell>
              <TableCell align='center' sx={{color:"#156D94",borderRight: "3px #AFD3E2 solid"}}>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{ m: 0.5 }} /> 
    <Grid container spacing = {2} sx={{justifyContent:"right"}}>
    <Grid item>
    <Typography align='center' sx={{color:"white", fontWeight:"bold", padding: 0.5}}>Total Amount: </Typography>
    </Grid>
    <Grid item>
    <Typography align='center' sx={{color:"#156D94", background: "white", width: 75, padding: 0.3, borderRadius: 1}}>20,210</Typography>
    </Grid>
    </Grid>
    </div>
    <Box sx={{ m: 3 }} />
    <Box textAlign='center'>
    <Button variant='contained' sx={{background:"#AFD3E2", color:"#146C94", fontSize: 20, paddingLeft:6,paddingRight:6, fontWeight: 'bold', borderRadius:5}}>Confirm Distribution</Button>
    </Box> 
      </div>
        </div>
        </>
)
}