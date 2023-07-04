import { Grid, Stack, Typography, styled } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import NavBar from "../../Global Components/NavBar";

export default function PaymentSummary() {


    const ScreenLabel = styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        left: '50px',
        top: '90px',
        color: '#ffffff',
        fontSize: '35px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans - serif',
    });

    const FieldLabel = styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        left: '80px',
        color: '#ffffff',
        fontSize: '15px',
        width: 'max-content',
        fontFamily: 'Inter, sans - serif',
    });

    const FieldData = styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        left: '100px',
        top: '10px',
        color: '#ffffff',
        fontSize: '25px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans - serif',
    });

    const ProofofPaymentLabel = styled(Typography)({
        position: 'absolute',
        textAlign: 'left',
        left: '90px',
        top: '470px',
        color: '#ffffff',
        fontSize: '30px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans - serif',
    });

    var paymentType = "Direct";

    if (paymentType.match("Direct"))
        return <div>

            <ScreenLabel>
                Payment Summary
            </ScreenLabel>
            <Grid item xs={8} sx={{ position: 'absolute', right: '70px', top: '95px', }}>
                <PrintIcon sx={{ fontSize: 55, color: 'white' }} />

            </Grid>

            <div>
                <Stack sx={{ position: 'absolute', left: '10px', top: '180px' }}>
                    <FieldLabel>
                        Receipt ID
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '210px', top: '180px' }}>
                    <FieldLabel>
                        Payment Transaction ID
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '510px', top: '180px' }}>
                    <FieldLabel>
                        Dealer ID
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '760px', top: '180px' }}>
                    <FieldLabel>
                        Dealer Name
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '810px', top: '280px' }}>
                    <FieldLabel>
                        Payment Type
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>
            </div>

            <div>
                <Stack sx={{ position: 'absolute', left: '10px', top: '280px' }}>
                    <FieldLabel>
                        Date Paid
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '260px', top: '280px' }}>
                    <FieldLabel>
                        Amount Paid
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '510px', top: '280px' }}>
                    <FieldLabel>
                        Remarks
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>
            </div>

            <div>
                <Stack sx={{ position: 'absolute', left: '10px', top: '380px' }}>
                    <FieldLabel>
                        Payment Status
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '260px', top: '380px' }}>
                    <FieldLabel>
                        Date Received
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

                <Stack sx={{ position: 'absolute', left: '510px', top: '380px' }}>
                    <FieldLabel>
                        Receiver Name
                    </FieldLabel>
                    <FieldData>
                        xxxxxxx
                    </FieldData>
                </Stack>

            </div>

        </div>


    return <div>
        <ScreenLabel>
            Payment Summary
        </ScreenLabel>
        <Grid item xs={8} sx={{ position: 'absolute', right: '70px', top: '95px', }}>
            <PrintIcon sx={{ fontSize: 55, color: 'white' }} />

        </Grid>

        <div>
            <Stack sx={{ position: 'absolute', left: '10px', top: '180px' }}>
                <FieldLabel>
                    Receipt ID
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '210px', top: '180px' }}>
                <FieldLabel>
                    Payment Transaction ID
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '460px', top: '180px' }}>
                <FieldLabel>
                    Dealer ID
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '670px', top: '180px' }}>
                <FieldLabel>
                    Dealer Name
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '880px', top: '180px' }}>
                <FieldLabel>
                    Payment Type
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>
        </div>

        <div>
            <Stack sx={{ position: 'absolute', left: '10px', top: '280px' }}>
                <FieldLabel>
                    Date Collected
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '210px', top: '280px' }}>
                <FieldLabel>
                    Amount Collected
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '410px', top: '280px' }}>
                <FieldLabel>
                    Date Remitted
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '610px', top: '280px' }}>
                <FieldLabel>
                    Amount Remtted
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '810px', top: '280px' }}>
                <FieldLabel>
                    Collector Name
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>
        </div>

        <div>
            <Stack sx={{ position: 'absolute', left: '10px', top: '380px' }}>
                <FieldLabel>
                    Payment Status
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '210px', top: '380px' }}>
                <FieldLabel>
                    Date Confirmed
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '410px', top: '380px' }}>
                <FieldLabel>
                    Receiver Name
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

            <Stack sx={{ position: 'absolute', left: '610px', top: '380px' }}>
                <FieldLabel>
                    Remarks
                </FieldLabel>
                <FieldData>
                    xxxxxxx
                </FieldData>
            </Stack>

        </div>

        <div>
            <ProofofPaymentLabel>
                Proof of Payment
            </ProofofPaymentLabel>
        </div>
    </div>

}