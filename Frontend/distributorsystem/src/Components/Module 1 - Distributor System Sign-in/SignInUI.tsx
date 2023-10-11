import styled from "@emotion/styled"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import signin from "../../Global Components/Group 8 (1).png"

const HeaderTypo = styled(Typography)({
    position: "relative",
    top: 150,
    left: 1443,
    width: "200px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    fontSize: 45
})

const SubHeaderTypo = styled(Typography)({
    position: "relative",
    top: 150,
    left: 1395,
    width: "300px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#707070",
    fontSize: 14
})

const EmailTextfield = styled(TextField)({
    position: "relative",
    top: 200,
    left: 1380,
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    width: "350px",
    fontSize: 20
})

const PasswordTextfield = styled(TextField)({
    position: "relative",
    top: 280,
    left: 1031,
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    width: "350px",
    fontSize: 20
})

const SignInGrid = styled(Grid)({
    position: "relative",
    left: -520
})

const ImageStyles = styled(Typography)({
    position: "absolute",
    top: 50,
    left: 740
})

const SignInButton = styled(Button)({
    position: "relative",
    top: 360,
    left: 680,
    width: "350px"
})

const SignUpTypo = styled(Typography)({
    position: "relative",
    top: 370,
    left: 1300,
    width: "500px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#707070",
    fontSize: 14
})

const SignInFieldsGrid = styled(Grid)({

})

export default function SignIn() {
    return (
        <SignInGrid item container>
            <SignInFieldsGrid item>
                <HeaderTypo>Sign In</HeaderTypo>
                <SubHeaderTypo>Distributor System</SubHeaderTypo>
                <EmailTextfield variant="outlined" label="Email"/>
                <PasswordTextfield variant="outlined" label="Password"/>
                <SignInButton variant="contained">Sign In</SignInButton>
                <SignUpTypo>Don't have an account? <a href="/signup">Sign Up</a></SignUpTypo>
            </SignInFieldsGrid>
            <Grid item>
                <ImageStyles>
                    <img src={signin} style={{width:'auto',height:'580px'}}></img>
                </ImageStyles>
            </Grid>
        </SignInGrid>
    )
}