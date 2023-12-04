import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"
import { IOrder } from "../../RestCalls/Interfaces";


const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '8%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})

const StyldeInfoHeader = styled(Typography)({
    marginTop: '35px',
    marginBottom: '130px',
    marginLeft: 120,
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
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '32px',
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter',
    top:-80,
})
const StyleData = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    width: 200,
    left: '50px',
    top: '-50px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter',
})

const StyleTotalLabel = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    top: '2px',
    left: '-225px',
    color: '#707070',
    fontSize: '20px',
    width: 'max-content',
    fontFamily: 'Inter',
})

const StyleTotalData = styled(Typography)({
    position: 'absolute',
    textAlign: 'center',
    left: '33px',
    top: '1px',
    color: '#203949',
    fontSize: '20px',
    fontWeight: '250',
    fontFamily: 'Inter'
})

const StyleTotalPaper = styled(Paper)({
    backgroundColor: '#ffffff',
    border: 'light',
    borderRadius: '20px',
    position: 'absolute',
    width: '150px',
    height: '35px',
    left: '5px',
})

const TableHeaderCell = styled(TableCell)({
    fontSize: 15,
    color: "#707070",
    fontWeight: "bold",
    textAlign: 'center'
});

export default function OrderTransactionDetailsPrint({ order}: { order: IOrder}) {

  
    
    return (
        <div>
            <StyldeInfoHeader>Dealer Contact Information</StyldeInfoHeader>
            <StackStyle sx={{ left: '8%' }}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{order?.dealer.firstname} {order?.dealer.middlename} {order?.dealer.lastname}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '28%' }}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{order?.dealer.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '42%' }}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{order?.dealer.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '59%' }}>
                <StyleLabel>Email Address</StyleLabel>
                <StyleData>{order?.dealer.emailaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '76%' }}>
                <StyleLabel>Current Address</StyleLabel>
                <StyleData>{order?.dealer.currentaddress}</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Order Transaction Information</StyldeInfoHeader>
            {/* set style left and top manually here in stack */}
            <StackStyle sx={{ left: '8%', top: '390px' }}>
                <StyleLabel>Order Transaction ID</StyleLabel>
                <StyleData>{order?.orderid}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '25%', top: '390px' }}>
                <StyleLabel>Order Distribution Date</StyleLabel>
                <StyleData>{order?.orderdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '45%', top: '390px' }}>
                <StyleLabel>Total Ordered Amount</StyleLabel>
                <StyleData>Php {order?.orderamount}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '63%', top: '390px' }}>
                <StyleLabel>Penalty Rate</StyleLabel>
                <StyleData>{order?.penaltyrate} %</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '76%', top: '390px' }}>
                <StyleLabel>Payment Terms</StyleLabel>
                <StyleData>{order?.paymentterms} Gives</StyleData>
            </StackStyle>
            <StyldeInfoHeader sx={{marginTop: '24px',}}>Order Breakdown</StyldeInfoHeader>

            <Grid container sx={{ display: "flex", justifyContent: "center", marginTop: '-100px' }}>
                <Grid item >
                    <Paper sx={{ marginLeft:9,backgroundColor: '#ffffff', borderRadius: "22px", height: "215px", justifyContent: 'center', display: 'flex', alignItems: 'left', position: 'relative', width: '950px' }}>

                        <TableContainer>
                            <Table aria-label='simple table'>
                                <TableHead >
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
                                    {order.orderedproducts.map((op,) => (
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
                        <StackStyle sx={{ left: '80%', top: '230px' }}>
                            <StyleTotalLabel>Total Ordered Amount:</StyleTotalLabel>
                            <StyleTotalPaper>
                                <StyleTotalData>Php {order?.orderamount}</StyleTotalData>
                            </StyleTotalPaper>
                        </StackStyle>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}