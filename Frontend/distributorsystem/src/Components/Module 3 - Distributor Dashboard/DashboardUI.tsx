import { Grid, Paper, Autocomplete, Typography, styled, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const ProductName = styled(Typography)({
    position: 'relative',
    left: 30,
    top: -50
})

const QuantityName = styled(Typography)({
    position: 'relative',
    left: -20,
    top: -50
})

const PendingOrdersGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})

const PendingPaper = styled(Paper)({
    top: 80,
    left: -280,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "300px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '700px'
})

const PendingOrderTypo = styled(Typography)({
    position: 'absolute',
    top: '8%',
    left: '18%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949"
})

const TableHeaderCell = styled(TableCell)({
    top: -10,
    position: 'relative',
    fontSize: 13,
    color: "#000000",
    fontWeight: "bold"
})

const PendingPaymentsPaper = styled(Paper)({
    top: 100,
    left: -280,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "300px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '700px'
})

const PendingPaymentTypo = styled(Typography)({
    position: 'absolute',
    top: '8%',
    left: '20%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949"
})

const PendingPaymentsGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})

const PendingDealerPaper = styled(Paper)({
    top: -540,
    left: 420,
    backgroundColor: '#ffffff',
    borderRadius: "22px",
    height: "628px",
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '580px'
})

const PendingDealerTypo = styled(Typography)({
    position: 'absolute',
    top: '4%',
    left: '35%',
    transform: 'translateX(-50%)',
    fontFamily: 'Inter, sans - serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: "#203949"
})

const PendingDealerGrid = styled(Grid)({
    display: "flex",
    justifyContent: "center",
    marginTop: '10px'
})


export default function Dashboard() {
    return (
        <Grid container>
            <PendingOrdersGrid item container>
                <PendingPaper>
                    <PendingOrderTypo>Pending Orders</PendingOrderTypo>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align='center'>Order Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align='center'>Order Date</TableHeaderCell>
                                    <TableHeaderCell align='center'>Total Amount</TableHeaderCell>
                                    <TableHeaderCell align='center'>Dealer Name</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='center'>120390</TableCell>
                                    <TableCell align='center'>10/10/2023</TableCell>
                                    <TableCell align='center'>16,200</TableCell>
                                    <TableCell align='center'>John Doe</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PendingPaper>
            </PendingOrdersGrid>
            <PendingPaymentsGrid item container>
                <PendingPaymentsPaper>
                    <PendingPaymentTypo>Pending Payments</PendingPaymentTypo>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                    <TableHeaderCell align="center">Payment Date</TableHeaderCell>
                                    <TableHeaderCell align="center">Amount Paid</TableHeaderCell>
                                    <TableHeaderCell align="center">Dealer Name</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">120390</TableCell>
                                    <TableCell align="center">10/10/2023</TableCell>
                                    <TableCell align="center">16,200</TableCell>
                                    <TableCell align="center">John Doe</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PendingPaymentsPaper>
            </PendingPaymentsGrid>
            <PendingDealerGrid item container>
                <PendingDealerPaper>
                    <PendingDealerTypo>Pending Dealer Registration</PendingDealerTypo>
                    <TableContainer>
                        <Table aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell align='left'>Name</TableHeaderCell>
                                    <TableHeaderCell align='right'>Submission Date</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='left'>John Doe</TableCell>
                                    <TableCell align='right'>10/10/2023</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PendingDealerPaper>
            </PendingDealerGrid>
        </Grid>
    )
}