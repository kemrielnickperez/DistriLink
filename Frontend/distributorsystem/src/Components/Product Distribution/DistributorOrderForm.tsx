import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, styled,  Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react'

const TitleTypo = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bolder',
  textAlign:'left',
  fontSize: '40px',
  color:'#203949'
})

const TitleBox = styled(Box)({
  position: 'relative',
  display: "flex", 
  justifyContent: "center",
  top: 20,
  bottom: -10,
  left: -350,
})

const OverallGrid = styled(Grid)({
  position: 'relative',
  display: "flex", 
  justifyContent: "center",
  top: 50
})

const StyledTextField = styled(TextField)({
  [`& fieldset`]:{
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
  [`& fieldset`]:{
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
  [`& fieldset`]:{
    borderRadius: 20
  }
})

const AddToCart = styled(Button)({
  position: 'relative',
  width: '200px',
  left: -30
})


export default function DistributorOrderForm(){
  return (
    <div>
      <TitleBox>
        <TitleTypo>Product Distribution Form</TitleTypo>
      </TitleBox>
      <OverallGrid container>
      <LabelGrid container>
        <Grid item sx={{marginRight: 27}}>
          <Typography>Dealer ID</Typography>
        </Grid>
        <Grid item sx={{marginRight: 19}}>
          <Typography>Distribution Date</Typography>
        </Grid>
        <Grid item sx={{marginRight: 23}}>
          <Typography>Penalty Rate</Typography>
        </Grid>
        <Grid item>
          <Typography>Payment Terms</Typography>
        </Grid>
      </LabelGrid>
      <Box component="form" sx={{'& > :not(style)': {position: 'relative', top: 10, left: 10, m:2, width: '28ch', borderRadius: "25px"}}}>
        <StyledTextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment> 
            ),
          }}
          variant="outlined"
        >
        </StyledTextField>
        <StyledTextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton>
                  <CalendarMonthIcon />
                </IconButton>
              </InputAdornment> 
            ),
          }}
          variant="outlined"
        />
        <StyledTextField variant="outlined"></StyledTextField>
        <StyledTextField variant="outlined"></StyledTextField>
      </Box>
      <Grid item container sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
        <Grid item>
          <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", height: "200px", justifyContent: 'center', display: 'flex', alignItems: 'center', position: 'relative', width: '1200px' }}>
            <ProductName>Product Name</ProductName>
              <StyledProductField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" >
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment> 
                  ),
                }}
                variant="outlined"
              />
              <QuantityName>Quantity</QuantityName>
              <StyledQuantityField variant="outlined"/>
              <AddToCart variant="contained">ADD TO CART</AddToCart>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container spacing={4} sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
        <Grid item >
          <Paper sx={{ backgroundColor: '#ffffff', borderRadius: "22px", height: "200px", justifyContent: 'center', display: 'flex', alignItems: 'center', position: 'relative', width: '1200px' }}>
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
                    <TableRow>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      </OverallGrid>
    </div>
  )
}
