import { Button, Divider, Input, Paper, Stack, Table, TableRow, TableBody, TableCell, TableContainer, TextField, styled, TableHead, Typography, Card, makeStyles } from "@mui/material";
import NavBar from "../../Global Components/NavBar";


export default function RecordDirectPayment() {

    const StyledButton = styled(Button)({
        position: "absolute",
        '&:hover': {
            backgroundColor: '#FFFFFF',
        },
        borderRadius: "15px",
        backgroundColor: '#AFD3E2',
        fontSize: '18px',
        left: '650px',
        color: '#146C94',
        textTransform: "none",
        fontWeight: "bold",
        width: 300,
        height: 55,
        top: '760px',
        display: 'inherit',
        fontFamily: "Inter', sans-serif",
    });


    const StyledTableRow = styled(TableRow)({
        borderBottom: "2px #AFD3E2 solid",
    });

    const StyledTableCell = styled(TableCell)({
        borderRight: " 3px #AFD3E2 solid",
    });

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ){
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 45),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('panpan', 356, 16.0, 49, 3.9),
        createData('panpan', 356, 16.0, 49, 3.9),
        createData('panpan', 356, 16.0, 49, 3.9),
        createData('panpan', 356, 16.0, 49, 3.9),

    ];

    const StyledHeaderTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "60px",
        marginTop: "20px",
        fontWeight: "bold",
        fontSize: 50,
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledOrderTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "78px",
        marginTop: "206px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledPaymentTypography = styled(Typography)({
        position: "absolute",
        marginLeft: "345px",
        marginTop: "105px",
        fontSize: 25,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledPaymentIDTypography = styled(Typography)({
        position: "absolute",
        left: "170px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledOrderTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
          borderRadius: '25px',
          color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "80px",
        top: "290px",
      }
    ));

    const StyledPaymentIDTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
          borderRadius: '25px',
          color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "170px",
        top: "577px",
      }
    ));

    const StyledTableHead = styled(TableHead)({
        backgroundColor: '#AFD3E2'
    });

    const TableHeaderCell = styled(TableCell)({
        backgroundColor: '#AFD3E2'
    });

    const StyledPaymentTransactionCard = styled(Card)({
        borderRadius: "20px",
        padding: 1,
        width: 1200,
        height: 300,
        position: "absolute",
        marginLeft: "330px",
        marginTop: "140px"
    });

    const StyledDatePaidTypography = styled(Typography)({
        position: "absolute",
        left: "470px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledDatePaidTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
          borderRadius: '25px',
          color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "471px",
        top: "577px",
      }
    ));

    const StyledAmountPaidTypography = styled(Typography)({
        position: "absolute",
        left: "775px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledAmountPaidTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
          borderRadius: '25px',
          color: "#000000",
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        fontSize: 10,
        left: "776px",
        top: "577px",
      }
    ));

    const StyledRemarksTypography = styled(Typography)({
        position: "absolute",
        left: "1070px",
        top: "555px",
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: "Inter', sans-serif",
    });

    const StyledRemarksTextField = styled(TextField)(() => ({
        position: "absolute",
        '& fieldset': {
          borderRadius: '25px',
          color: "#000000",
          height: 150,
          width: 300
        },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px',
        height: 148,
        width: 318,
        fontSize: 10,
        left: "1072px",
        top: "577px",
      }
    ));


    return (
        <div>
            <StyledHeaderTypography>Record Direct Payment</StyledHeaderTypography>

            <StyledOrderTypography>Enter Order Transaction ID:</StyledOrderTypography>
            <StyledOrderTextField></StyledOrderTextField>

            <StyledPaymentTypography>Payment Transactions</StyledPaymentTypography>
            <StyledPaymentTransactionCard>
                <TableContainer component = {Paper} sx = {{ maxHeight: '300px'}}>
                    <Table aria-label = 'simple table' stickyHeader>
                        <StyledTableHead>
                            <TableRow>
                                <TableHeaderCell align="center">Payment Transaction ID</TableHeaderCell>
                                <TableHeaderCell align="center">Payment Payment Terms</TableHeaderCell>
                                <TableHeaderCell align="center">Payment Starting Date</TableHeaderCell>
                                <TableHeaderCell align="center">Payment Ending Date</TableHeaderCell>
                                <TableHeaderCell align="center">Payment Amount Due</TableHeaderCell>
                                <TableHeaderCell align="center">Amount Paid?</TableHeaderCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row" align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="center">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledPaymentTransactionCard>

            <StyledPaymentIDTypography>Payment Transaction ID: </StyledPaymentIDTypography>
            <StyledPaymentIDTextField></StyledPaymentIDTextField>

            <StyledDatePaidTypography>Date Paid: </StyledDatePaidTypography>
            <StyledDatePaidTextField></StyledDatePaidTextField>

            <StyledAmountPaidTypography>Amount Paid: </StyledAmountPaidTypography>
            <StyledAmountPaidTextField></StyledAmountPaidTextField>

            <StyledRemarksTypography>Remarks: </StyledRemarksTypography>
            <StyledRemarksTextField></StyledRemarksTextField>

            <StyledButton>Save Payment Record</StyledButton>

        </div>
         
    )

}