import { Alert, AlertTitle, Button, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Radio, RadioGroup, Snackbar, TextField, TextFieldProps, Typography, styled } from "@mui/material"
import distributorpic from '../../Global Components/Images/distributor1.png'
import { ChangeEvent, useRef, useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { v4 as uuidv4 } from 'uuid';
import { useRestDistributor } from "../../RestCalls/DistributorUseRest"
const GridBody = styled(Grid)({
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between'
})
const ImageStyle = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
    marginTop: '5px'
})
const ContentNameTypography = styled(Typography)({
    marginTop: -10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '30px',
    margin: '50px 0 0 200px',
    color: '#203949',

})
const LabelTypography = styled(Typography)({
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: '20px',
    marginLeft: '200px',
    color: '#707070'
})
const TypographyLabel = styled(Typography)({
    marginTop: "16px",
    marginLeft: '25px',
    marginBottom: '10px',
    marginRight: '-175px',
    fontFamily: 'Inter',
    fontWeight: '550',
    textAlign: 'left',
    fontSize: 17,
    display: 'flex',
    color: '#707070',

})
const TypographyLabelB = styled(Typography)({
    marginTop: "18px",
    marginLeft: "330px",
    textAlign: 'center',
    fontSize: 17,
    color: '#707070',
    display: 'flex',
    fontWeight: '550',
    fontFamily: 'inter',
})
const TypographyLabelC = styled(Typography)({
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
    display: 'flex',
    fontWeight: '550',
    fontFamily: 'inter',
})
const StyledTextField = styled(TextField)({
    // backgroundColor: "#ffffff", 
    borderRadius: "22px",
    width: '380px',
    height: 5,
    marginTop: "10px",
    marginLeft: "80px",
    marginRight: '-110px',
    marginBottom: '43px',
    input: {
        color: '#707070',
        fontFamily: 'Inter'
    },
    label: {
        color: '#707070',
        fontWeight: '550',
        fontFamily: 'Inter',
    },
});
const StyledDatePicker = styled(DatePicker)({
    width: '380px',
    marginLeft: "80px",
    marginTop: "10px",
    // marginBottom:'43px',
    input: {
        color: '#707070',
        fontFamily: 'Inter'
    },
});
const labelStyle: React.CSSProperties = {
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'Inter',
};
const RadioStyle = styled(RadioGroup)({
    marginBottom: '-4px',
    color: "#707070",
    '& .MuiSvgIcon-root': {
        fontSize: '25px',
        color: "#2D85E7",
    },
})
const RadioLabel = styled(Typography)({
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'inter',

});
const SignUpButton = styled(Button)({
    backgroundColor: '#2D85E7',
    color: '#FFFFFF',
    width: '795px',
    margin: '10px 0 0 80px',
    height: '50px',
    marginRight: '-110px',
    marginTop: "30px",
    marginBottom: 90,
    ':hover': {
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const GridField = styled(Grid)({

})

export default function DistributorRegistration() {


    {/**UseRefs*/ }
    const [getDistributorByID, newDistributor, distributor] = useRestDistributor();
    const firstnameRef = useRef<TextFieldProps>(null)
    const middlenameRef = useRef<TextFieldProps>(null)
    const lastnameRef = useRef<TextFieldProps>(null)
    const emailladdressRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const confirmpasswordRef = useRef<TextFieldProps>(null)
    const currentaddressRef = useRef<TextFieldProps>(null)
    const [isshowPassword, setisShowPassword] = useState(false);
    const permanentAddressRef = useRef<TextFieldProps>(null)
    const contactnumberRef = useRef<TextFieldProps>(null)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isshowConfirmPassword, setisShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);
    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
    const [selectedGender, setSelectedGender] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [open, setOpen] = useState(false);
    const [alerttitle, setTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [fieldWarning, setFieldWarning] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        // confirmpass:'',
        birthdate: '',
        gender: '',
        currentadd: '',
        permanentadd: '',
        contactnum: '',
    })


    {/**Handler Change to determine fieldname*/ }
    const handleInputChange = (fieldName: string) => {
        setFieldWarning({ ...fieldWarning, [fieldName]: '' })
    }


    {/**Handler Change for Textfield - Password to track if its match or not*/ }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }
        handleInputChange('password');
    };


    {/**Handler Change for Textfield - Confirm Password to track if its match or not*/ }
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        // Automatically check for password match
        if (e.target.value !== password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }
    };


    {/**Handler for Show Icon Password*/ }
    const handleShowPassword = () => {
        setisShowPassword(!isshowPassword);
    }
    const handleShowConfirmPassword = () => {
        setisShowConfirmPassword(!isshowConfirmPassword);
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    const handleMouseConfirmDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }


    {/**Handler for Radio Button - Gender*/ }
    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
        handleInputChange('gender');
    };


    {/**Handler for Copying Current Addres  to Permanent address*/ }
    const handleCurrentAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAddress(event.currentTarget.value);
        handleInputChange('currentadd')
    }
    const handleCopyAddress = () => {
        setPermanentAddress(currentAddress)
        handleInputChange('permanentadd')
    }

    {/**Handler for Alert - Function to define the type of alert*/ }
    function handleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
        setTitle(title);
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpen(true);
    }

    {/**Handler to Close Alert Snackbar*/ }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    {/**HelperWarning for defining Helper Text*/ }
    const helperWarning = {
        firstname: !firstnameRef.current?.value ? 'First Name is required' : '',
        lastname: !lastnameRef.current?.value ? 'Last Name is required' : '',
        email: !emailladdressRef.current?.value ? 'Email Address is required' : '',
        password: !passwordRef.current?.value ? 'Password is required' : '',
        birthdate: !selectedBDate ? 'Birthdate is required' : '',
        gender: !selectedGender ? 'Gender is required' : '',
        currentadd: !currentaddressRef.current?.value ? 'Current Address is required' : '',
        permanentadd: !permanentAddressRef.current?.value ? 'Permanent Address is required' : '',
        contactnum: !contactnumberRef.current?.value ? 'Contact Number is required' : '',
    }

    {/**HandlerNewDealer*/ }
    const handleNewDistributor = async () => {

        try {
            if (
                !firstnameRef.current?.value ||
                !lastnameRef.current?.value ||
                !emailladdressRef.current?.value ||
                !passwordRef.current?.value ||
                !confirmpasswordRef.current?.value ||
                !selectedBDate ||
                !selectedGender ||
                !contactnumberRef.current?.value ||
                !currentaddressRef.current?.value ||
                !permanentAddressRef.current?.value
            ) {
                handleAlert('Warning', 'Please fill in all required fields', 'warning');
                setFieldWarning(helperWarning);
                return;
            }
            if (passwordError) {
                handleAlert('Error', 'Passwords do not match', 'error');
                return;
            }
            newDistributor({
                distributorid: uuidv4().slice(0, 8),
                firstname: String(firstnameRef.current?.value),
                middlename: String(middlenameRef.current?.value),
                lastname: String(lastnameRef.current?.value),
                emailaddress: String(emailladdressRef.current?.value),
                password: String(passwordRef.current?.value),
                birthdate: selectedBDate?.format('YYYY-MM-DD') || '',
                gender: selectedGender,
                currentaddress: String(currentaddressRef.current?.value),
                permanentaddress: String(permanentAddressRef.current?.value),
                contactnumber: String(contactnumberRef.current?.value),
                dealerids: [],
                employeeids: [],
                orderids: [],
            })
            handleAlert('Success', 'You are Successfully Registered!', 'success');
        } catch (error) {
            handleAlert('Error', 'An Error Occured, Please Check your Connection', 'error')
        }





    }
    {/**Handler Sign Up*/ }
    const handleSignUp = () => {
        //handleFiles
        handleNewDistributor();
        // navigate(`/dashboard`);
    };



    {/**Return Statement*/ }
    return(
    <div>

        <GridBody>
            {/**Grids Body*/}
            <Grid item>
                <ContentNameTypography>Sign Up</ContentNameTypography>
                <LabelTypography>as Distributor</LabelTypography>

                {/**Grids Textfields*/}
                <GridField container spacing={8}>

                    {/**Textfield For First Name*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="First Name" required size="small" inputRef={firstnameRef} onChange={() => handleInputChange('firstname')} />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.firstname}
                        </FormHelperText> 
                    </Grid>

                    {/**Textfield For Middle Name*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Middle Name" size="small" inputRef={middlenameRef} />
                    </Grid>

                </GridField>


                <GridField container spacing={8}>

                    {/**Textfield For Last Name*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Last Name" required size="small" inputRef={lastnameRef} onChange={() => handleInputChange('lastname')} />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.lastname}
                        </FormHelperText> 
                    </Grid>

                    {/**Textfield For Contact Number*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Contact Number" required size="small" inputRef={contactnumberRef} onChange={() => handleInputChange('contactnum')} />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.contactnum}
                        </FormHelperText> 
                    </Grid>

                </GridField>


                <GridField container spacing={8}>

                    {/**Textfield For Email Address*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Email Address" required size="small" style={{ width: '795px' }} inputRef={emailladdressRef} onChange={() => handleInputChange('email')} />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.email}
                        </FormHelperText> 
                    </Grid>

                </GridField>


                <GridField container spacing={8}>

                    {/**Textfield For Password*/}
                    <Grid item>
                        <StyledTextField
                            type={isshowPassword ? 'text' : 'password'}
                            variant="outlined"
                            required
                            label='Password'
                            size="small"
                            style={{ width: '795px' }}
                            value={password}
                            onChange={handlePasswordChange}
                            inputRef={passwordRef}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword} style={{ position: 'absolute', marginLeft: -43 }} >
                                            {isshowPassword ? <Visibility style={{ color: '#203949', fontSize: 27 }} /> : <VisibilityOff style={{ color: '#203949', fontSize: 27 }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.password}
                        </FormHelperText> 
                    </Grid>

                </GridField>


                <GridField container spacing={8}>

                    {/**Textfield For Password Confirmation*/}
                    <Grid item>
                        <StyledTextField
                            type={isshowConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            required label="Confirm Password"
                            size="small" style={{ width: '795px', marginBottom: 60 }}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={passwordError !== ''}
                            helperText={passwordError}
                            inputRef={confirmpasswordRef}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowConfirmPassword} onMouseDown={handleMouseConfirmDownPassword} style={{ position: 'absolute', marginLeft: -43 }} >
                                            {isshowConfirmPassword ? <Visibility style={{ color: '#203949', fontSize: 27 }} /> : <VisibilityOff style={{ color: '#203949', fontSize: 27 }} />}

                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </GridField>


                <GridField container spacing={3}>

                    {/**DatePicker For Birthdate*/}
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StyledDatePicker
                                slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        label: <span style={labelStyle}>Birthdate</span>,
                                        size: 'small',
                                        style: labelStyle
                                    }
                                }}
                                value={selectedBDate}
                                maxDate={maxDate}
                                onChange={(date) => {
                                    setSelectedBDate(date as Dayjs | null);
                                    handleInputChange('birthdate');
                                }}

                            />
                        </LocalizationProvider>
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.birthdate}
                        </FormHelperText> 
                    </Grid>
                    <Grid item>

                        {/**Radio Group Button For Gender*/}
                        <TypographyLabel>Gender:
                            <div style={{ margin: '-8px 0 0 0px' }}>
                                <RadioStyle
                                    row
                                    name="genderRadioGroup"
                                    aria-required
                                    value={selectedGender}
                                    onChange={handleGender}
                                >
                                    <FormControlLabel style={{ marginLeft: '30px' }} value='Male' control={<Radio />} label={<RadioLabel>Male</RadioLabel>} />
                                    <FormControlLabel style={{ marginLeft: '40px' }} value='Female' control={<Radio />} label={<RadioLabel>Female</RadioLabel>} />
                                </RadioStyle>
                            </div>
                        </TypographyLabel>
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.gender}
                        </FormHelperText> 

                    </Grid>
                </GridField>


                <GridField container spacing={8}>

                    {/**Textfield For Current Addrress*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Current Address" required size="small" style={{ width: '795px' }} inputRef={currentaddressRef} onChange={handleCurrentAddressChange} />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.currentadd}
                        </FormHelperText> 
                    </Grid>


                </GridField>

                <GridField container spacing={8}>

                    {/**Textfield For Permanent Address*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Permanent Address"
                            required
                            size="small"
                            style={{ width: '795px' }}
                            inputRef={permanentAddressRef}
                            value={permanentAddress}
                            onChange={(e) => { setPermanentAddress(e.target.value); handleInputChange('permanentadd') }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant='contained' style={{ height: 40, marginRight: -13 }} onClick={handleCopyAddress}>Permanent = Current Address</Button>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.permanentadd}
                        </FormHelperText> 
                    </Grid>

                </GridField>

                <GridField container spacing={0} >
                    {/**Button for Signing Up*/}
                    <Grid item>
                        <SignUpButton variant="contained" onClick={handleSignUp}>
                            Sign Up
                        </SignUpButton>
                        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}>
                            <Alert onClose={handleClose} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                                <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </GridField>


            </Grid>

            {/**Image Grids */}
            <Grid item>
                <ImageStyle><img src={distributorpic} style={{ width: 'auto', height: '800px' }}></img></ImageStyle>
            </Grid>

        </GridBody>
    </div>
    );
}