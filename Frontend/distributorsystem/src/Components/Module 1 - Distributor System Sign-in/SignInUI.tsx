import styled from "@emotion/styled"
import { Alert, AlertColor, Box, Button, Grid, IconButton, Link, Snackbar, TextField, TextFieldProps, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import signin from "../../Global Components/Images/Group 8 (1).png"
import { useNavigate } from "react-router-dom"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import Dashboard from "../Module 3 - Dashboards/DashboardUI"
import React from "react"
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import { useRestDistributor } from "../../RestCalls/DistributorUseRest";
import { useRestSignIn } from "../../RestCalls/SignInUseRest";


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
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor | undefined>();


   



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setOpen(true);

     

         if (!userid || !password) {
            setSnackbarMessage("Please enter both User ID and Password");
            setSeverity("warning");
            setOpen(true);
            return;
        } 
        axios.post('http://localhost:8080/signin', {
            userId: userid,
            password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    const result = response.data;
                    if (result.tableName === 'Dealer') {
                        localStorage.setItem('user', JSON.stringify(result))
                        sessionStorage.setItem('user', JSON.stringify(result))
                        // Redirect to the Dealer screen
                        window.location.assign('dealerOrderForm');
                        setSuccessMessage("Login successful as Dealer");
                        setOpen(true);
        
                        //appObjects?.putDealer(dealer!)
                    } else if (result.tableName === 'Distributor') {
        
                        localStorage.setItem('user', JSON.stringify(result))
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Dealer screen
                        window.location.assign('dashboard');
                        setSuccessMessage("Login successful as Distributor");
                        setOpen(true);
                    } else if (result.tableName === 'Cashier') {
                        localStorage.setItem('user', JSON.stringify(result))
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Employee screen
                        window.location.assign('cashierDashboard');
                        setSuccessMessage('Login successful as Employee');
                        setOpen(true);
                        const user = response.data.find(
                            (u: any) => u.dealerid === userid && u.password === password);
                        if (user) {
                           
                            localStorage.setItem('user', JSON.stringify(result))
                            sessionStorage.setItem('user', JSON.stringify(user));
                            setCode(2);
                            window.location.assign('http://localhost:3000/cashierDashboard');
                        } else {
                            setCode(1);
                        }
                    }
                    else if (result.tableName === 'Sales Associate') {
                       
                        localStorage.setItem('user', JSON.stringify(result))
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Employee screen
                        window.location.assign('salesAssociateDashboard');
                        setSuccessMessage('Login successful as Employee');
                        setOpen(true);
                        const user = response.data.find(
                            (u: any) => u.dealerid === userid && u.password === password);
                        if (user) {
                           
                            localStorage.setItem('user', JSON.stringify(result))
                            sessionStorage.setItem('user', JSON.stringify(user));
                            setCode(2);
                            window.location.assign('http://localhost:3000/salesAssociateDashboard');
                        } else {
                            setCode(1);
                        }
                    }
                    else if (result.tableName === 'Sales Associate and Cashier') {
                       
                        localStorage.setItem('user', JSON.stringify(result))
                        sessionStorage.setItem('user', JSON.stringify(result));
                        // Redirect to the Employee screen
                        window.location.assign('sales&cashierDashboard');
                        setSuccessMessage('Login successful as Employee');
                        setOpen(true);
                        const user = response.data.find(
                            (u: any) => u.dealerid === userid && u.password === password);
                        if (user) {
                           
                            localStorage.setItem('user', JSON.stringify(result))
                            sessionStorage.setItem('user', JSON.stringify(user));
                            setCode(2);
                            window.location.assign('http://localhost:3000/sales&cashierDashboard');
                        } else {
                            setCode(1);
                        }
                    }
                    
                    else {
                      
                        setSnackbarMessage("Invalid User ID or Password");
                        setSeverity("error");
                        setOpen(true);
                    }
                }
            }).catch((error) => {
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
                        </Grid>
                    </SignInFieldsGrid>
                    <SignInFieldsGrid container spacing={8}>
                        <Grid item>
                            <SignUpTypo>Don't have an account? <a href="/SignUpScreen">Sign Up</a></SignUpTypo>
                        </Grid>
                    </SignInFieldsGrid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity={successMessage ? "success" : severity} // Use "success" for success and "error" for invalid input
                        onClose={handleClose}
                    >
                        {successMessage || snackbarMessage}
                    </Alert>
                </Snackbar>
            </SignInGrid>
        </Box>
    )
}