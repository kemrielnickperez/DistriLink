import styled from "@emotion/styled"
import { Alert, Box, Button, Grid, IconButton, Link, Snackbar, TextField, TextFieldProps, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import signin from "../../Global Components/Images/Group 8 (1).png"
import { useNavigate } from "react-router-dom"
import { Fragment, useEffect, useRef, useState } from "react"
import axios from "axios"
import Dashboard from "../Module 3 - Distributor Dashboard/DashboardUI"
import React from "react"

const HeaderTypo = styled(Typography)({
    position: "relative",
    top: 150,
    // left: 1443,
    width: "200px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    fontSize: 45
})

const SubHeaderTypo = styled(Typography)({
    position: "relative",
    top: 150,
    // left: 1395,
    width: "300px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#707070",
    fontSize: 14
})

const EmailTextfield = styled(TextField)({
    position: "relative",
    top: 200,
    // left: 1380,
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    width: "350px",
    fontSize: 20
})

const PasswordTextfield = styled(TextField)({
    position: "relative",
    top: 220,
    // left: 1031,
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    width: "350px",
    fontSize: 20
})

const SignInGrid = styled(Grid)({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    // left: -520,
})

const ImageStyles = styled(Typography)({
    position: "relative",
    display: "flex",
    alignItems: 'center',
    top: 50,


})

const SignInButton = styled(Button)({
    position: "relative",
    top: 250,
    // left: 680,
    width: "350px",
})

const SignUpTypo = styled(Typography)({
    position: "relative",
    top: 270,
    // left: 1300,
    width: "500px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#707070",
    fontSize: 14
})

const SignInFieldsGrid = styled(Grid)({
    position: "relative",
    display: "flex",
    justifyContent: "center",

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
                    const user = response.data.find(
                        (u: any) => u.dealerid === userid && u.password === password);
                    if (user) {
                        console.log(userid, password);
                        console.log("Login successful!");
                        sessionStorage.setItem('user', JSON.stringify(user));
                        setCode(2);
                        window.location.assign('http://localhost:3000/dashboard');
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
        <Box component="form" noValidate onSubmit={handleSubmit} >
            <SignInGrid item container spacing={1}>
                <Grid item>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <ImageStyles>
                                <img src={signin} style={{ width: 'auto', height: '580px', marginRight: -100, marginBottom: -100 }}></img>
                            </ImageStyles>
                        </Grid>
                    </SignInFieldsGrid>
                </Grid>
                <Grid item>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <HeaderTypo>Sign In</HeaderTypo>
                        </Grid>
                    </SignInFieldsGrid>

                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <SubHeaderTypo>Distributor System</SubHeaderTypo>
                        </Grid>
                    </SignInFieldsGrid>

                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <EmailTextfield required id="userid" variant="outlined" label="User ID" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserid(event.target.value)} />
                        </Grid>
                    </SignInFieldsGrid>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <PasswordTextfield required id="password" variant="outlined" label="Password" type="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
                        </Grid>
                    </SignInFieldsGrid>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <SignInButton type="submit" variant="contained">Sign In</SignInButton>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Signed in successfully!
                        </Alert>
                    </Snackbar>
                        </Grid>
                    </SignInFieldsGrid>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <SignUpTypo>Don't have an account? <a href="/SignUpScreen">Sign Up</a></SignUpTypo>
                        </Grid>
                    </SignInFieldsGrid>
                </Grid>
            </SignInGrid>
        </Box>
    )
}