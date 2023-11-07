import styled from "@emotion/styled"
import { Alert, Box, Button, Grid, IconButton, Link, Snackbar, TextField, TextFieldProps, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import signin from "../../Global Components/Group 8 (1).png"
import { useNavigate } from "react-router-dom"
import { Fragment, useEffect, useRef, useState } from "react"
import axios from "axios"
import Dashboard from "../Module 3 - Distributor Dashboard/DashboardUI"
import React from "react"

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
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState(0);
    const [open, setOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpen(true);
        axios.post('http://localhost:8080/signin', {
            userId: userid,
            password: password
        })
            .then(response => {
                if (response.status === 200) {
                    const result = response.data;
                    if (result.tableName === 'Dealer') {
                        console.log('Login successful as Dealer');
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Dealer screen
                        window.location.assign('Dashboard');
                    } else if (result.tableName === 'Employee') {
                        console.log('Login successful as Employee');
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Employee screen
                        window.location.assign('Dashboard');
                    } else {
                        console.log('Invalid username or password');
                        setCode(1);
                    }
                } else {
                    console.log('Error');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {

    }, [code]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <SignInGrid item container>
                <SignInFieldsGrid item>
                    <HeaderTypo>Sign In</HeaderTypo>
                    <SubHeaderTypo>Distributor System</SubHeaderTypo>
                    <EmailTextfield required id="userid" variant="outlined" label="User ID" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserid(event.target.value)} />
                    <PasswordTextfield required id="password" variant="outlined" label="Password" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
                    <SignInButton type="submit" variant="contained">Sign In</SignInButton>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Signed in successfully!
                        </Alert>
                    </Snackbar>
                    <SignUpTypo>Don't have an account? <a href="/SignUpScreen">Sign Up</a></SignUpTypo>
                </SignInFieldsGrid>
                <Grid item>
                    <ImageStyles>
                        <img src={signin} style={{ width: 'auto', height: '580px' }}></img>
                    </ImageStyles>
                </Grid>
            </SignInGrid>
        </Box>
    )
}