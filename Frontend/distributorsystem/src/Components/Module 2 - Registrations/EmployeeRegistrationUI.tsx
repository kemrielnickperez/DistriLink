import styled from "@emotion/styled";
import { Autocomplete, Alert, AlertTitle, Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, Icon, IconButton, InputAdornment, Radio, RadioGroup, Snackbar, Switch, TextField, TextFieldProps, Typography, Card } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { IDistributor, IEmployeeDocument } from "../../RestCalls/Interfaces";
import moment from "moment";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo4 from '../../Global Components/Images/logo4.png'
import employee1 from '../../Global Components/Images/employee1-1.png'
import { useNavigate } from "react-router-dom";
const StyleGrid = styled(Grid)({
    position: "relative",
    display: "flex",
    justifyContent: "center",
})

const SignInTypo = styled(Typography)({
    display: 'flex',
    position: "relative",
    textAlign: 'center',
    // alignItems:'center',

    margin: '-70px 0 0 145px',
    // marginTop:-150,
    // marginLeft:150,
    // left: 1300,
    width: "500px",
    fontWeight: 'normal',
    fontFamily: "Inter, sans-serif",
    color: "#ffffff",
    fontSize: 14,
    zIndex: 3

})

const StyledCard = styled(Card)({
    padding: '10px 10px 10px 10px',
    display: 'flex',
    marginTop: 50,
    width: '1280px',
    height: '600px',
    alignItems: 'center',
    borderRadius: '25px',
    justifyContent: 'left',
    backgroundColor: ' rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(50px)',
    border: '0px solid rgba(255, 255, 255, 0.3)'

})
const ScrollStyle = styled('div')({
    maxHeight: '460px',
    width: '750px',
    overflowY: 'auto',
    scrollSnapType: 'y mandatory',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        width: '1', // For Chrome, Safari, and Opera
        behavior: 'smooth',
    },
    WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS devices
    '& > div': {
        flex: '0 0 auto',
        scrollSnapAlign: 'start', // Snap to the start of each child element
        minWidth: '100%', // Ensure each child takes up the full width
    },

})
const ImageStyle = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '-50px',
    marginTop: '-30px'
})
const ContentNameTypography = styled(Typography)({
    paddingTop: '15px',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '25px',
    margin: '-15px 0 10px -450px',
    paddingLeft: '10px',
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
    marginTop: "22px",
    marginLeft: '10px',
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
    marginTop: 10,
    marginLeft: "80px",
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 17,
    color: '#707070',
    display: 'flex',
    fontWeight: '550',
    fontFamily: 'inter',
})

const RadioLabel = styled(Typography)({
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'inter',

});
const CheckLabel = styled(Typography)({
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'inter',

});
const RadioStyle = styled(RadioGroup)({
    marginBottom: '-4px',
    color: "#707070",
    '& .MuiSvgIcon-root': {
        fontSize: '25px',
        color: "#2D85E7",
    },
})

const StyledTextField = styled(TextField)({
    // backgroundColor: "#ffffff", 
    borderRadius: "22px",
    width: '343px',
    height: 10,
    marginTop: "10px",
    marginBottom: '55px',
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
    width: '700px',
    marginTop: "10px",
    // marginBottom:'43px',
    input: {
        color: '#707070',
        fontFamily: 'Inter'
    },
});

const GridBody = styled(Grid)({
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between'
})


const labelStyle: React.CSSProperties = {
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'Inter',
};

const SignUpButton = styled(Button)({
    backgroundColor: '#2D85E7',
    color: '#FFFFFF',
    width: '795px',
    margin: '10px 0 0 80px',
    height: '50px',
    marginRight: '-110px',
    marginTop: "30px",
    marginBottom: 70,
    ':hover': {
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const GridField = styled(Grid)({

})

const TypographyLabelC = styled(Typography)({
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
    display: 'flex',
    fontWeight: '550',
    fontFamily: 'inter',

})

export default function EmployeeRegistration() {


    const [newEmployee, getCollectorByID, collector] = useRestEmployee();
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);
    const [selectedGender1, setSelectedGender1] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [isCashierSelected, setIsCashierSelected] = useState<boolean>(false);
    const [isSalesAssociateSelected, setIsSalesAssociateSelected] = useState<boolean>(false);
    const [isCollectorSelected, setIsCollectorSelected] = useState<boolean>(false)
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();
    const [employeeDocuments, setEmployeeDocuments] = useState<IEmployeeDocument[]>([]);
    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [open, setOpen] = useState(false);
    const [alerttitle, setTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [isshowPassword, setisShowPassword] = useState(false);
    const [isshowConfirmPassword, setisShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [isAlertVisible, setIsAlertVisible] = useState(false);

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
        selectedprofile: '',
        tinnum: '',
        position: '',
        distributor: ''
    })


    const firstnameRef = useRef<TextFieldProps>(null)
    const middlenameRef = useRef<TextFieldProps>(null)
    const lastnameRef = useRef<TextFieldProps>(null)
    const emailRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const confirmpasswordRef = useRef<TextFieldProps>(null)
    const currentaddressRef = useRef<TextFieldProps>(null)
    const permanentaddressRef = useRef<TextFieldProps>(null)
    const contactnumberRef = useRef<TextFieldProps>(null)
    const tinnumberRef = useRef<TextFieldProps>(null)


    const [selectedDistributor, setSelectedDistributor] = useState<IDistributor>();
    const [distributors, setDistributors] = useState<IDistributor[]>([]);






    function getAllDistributors() {
        axios.get<IDistributor[]>('http://localhost:8080/distributor/getAllDistributors')
            .then((response) => {
                setDistributors(response.data);

            })
            .catch((error) => {

                // alert("Error retrieving payment receipts. Please try again.");
            });
    }



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

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        // Automatically check for password match
        if (e.target.value !== password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }
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

    const handleAlertAndNavigate = async (type: string, message: string, variant: "success" | "warning" | "error") => {
        handleAlert(type, message, variant);
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        setIsAlertVisible(true);
      };
    
      const handleAlertAcknowledged = () => {
        setIsAlertVisible(false);
        navigate(`/SignIn`);
      };
    

    {/**Handler to Close Alert Snackbar*/ }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender1(event.target.value);
        handleInputChange('gender');
    };



    /*   const handleApplyAs=(event:ChangeEvent<HTMLInputElement>)=>{
        const targetValue = event.target.value;
        setIsCashierSelected(targetValue === 'cashier');
        setIsSalesAssociateSelected(targetValue === 'sales-associate');
        setIsCollectorSelected(targetValue === 'collector');
      }; */


    const handleCashierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCashierSelected(event.target.checked);


    };

    const handleSalesAssociateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSalesAssociateSelected(event.target.checked);


    };

    const handleCollectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCollectorSelected(event.target.checked);


    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isCashierSelected && !isSalesAssociateSelected && !isCollectorSelected) {
            handleInputChange('position')
        }
        setSelectedPosition(event.target.value);

    };



    const handleProfilePictureFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSize = 1024 * 1024 * 5; // 5 MB 

            if (file.size <= maxSize) {
                setSelectedProfilePicture(file);
            } else {

                handleAlert('File Size Exceeded', "Amount paid is greater than amount due. Please change it to be equal or less than the amount due.", 'warning')
            }
        }


        handleInputChange('selectedprofile')
    };


    // Function to create an IDealerDocument from a selected file
    const createDocument = async (file: File | null, name: string) => {
        if (file) {
            // Create a Promise to read the file as an array buffer
            const readFileAsArrayBuffer = (file: File) =>
                new Promise<ArrayBuffer>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target && event.target.result instanceof ArrayBuffer) {
                            resolve(event.target.result);
                        } else {
                            resolve(new ArrayBuffer(0));
                        }
                    };
                    reader.readAsArrayBuffer(file);
                });

            // Read the file content as an array buffer
            const fileContentArrayBuffer = await readFileAsArrayBuffer(file);

            // Create a Uint8Array from the array buffer
            const content = new Uint8Array(fileContentArrayBuffer);

            return {
                documentid: uuidv4().slice(0, 8),
                name: name,
                type: file.type,
                content,
                employee: null,
            };
        }
        return null;
    };

    const handleFiles = async () => {

        const profilepictureDocument = await createDocument(selectedProfilePicture!, String(lastnameRef.current?.value) + "_profilepicture");


        // Create an array with the new documents and update the state
        const newEmployeeDocuments: IEmployeeDocument[] = [];
        if (profilepictureDocument) newEmployeeDocuments.push(profilepictureDocument);

        setEmployeeDocuments((prevDealerDocuments) => [...prevDealerDocuments, ...newEmployeeDocuments]);

        // You can access the updated dealerDocuments state after this update

        return newEmployeeDocuments;
    };

    {/**HelperWarning for defining Helper Text*/ }
    const helperWarning = {
        firstname: !firstnameRef.current?.value ? 'First Name is required' : '',
        lastname: !lastnameRef.current?.value ? 'Last Name is required' : '',
        email: !emailRef.current?.value ? 'Email Address is required' : '',
        password: !passwordRef.current?.value ? 'Password is required' : '',
        birthdate: !selectedBDate ? 'Birthdate is required' : '',
        gender: !selectedGender1 ? 'Gender is required' : '',
        currentadd: !currentaddressRef.current?.value ? 'Current Address is required' : '',
        permanentadd: !permanentaddressRef.current?.value ? 'Permanent Address is required' : '',
        contactnum: !contactnumberRef.current?.value ? 'Contact Number is required' : '',
        selectedprofile: !selectedProfilePicture ? 'Please attach your Profile Picture' : '',
        tinnum: !tinnumberRef.current?.value ? 'TIN Number is required' : '',
        position: !isSalesAssociateSelected && !isCashierSelected && !isCashierSelected ? 'Please Choose your Position' : '',
        distributor: !selectedDistributor ? 'Please Select a Distributor' : ''
    }
    {/**Handler Change to determine fieldname*/ }
    const handleInputChange = (fieldName: string) => {
        setFieldWarning({ ...fieldWarning, [fieldName]: '' })
    }
    const handleNewEmployee = async () => {
        const uuid = uuidv4();
        const employeeuuid = uuid.slice(0, 8);
        const newEmployeeDocuments = await handleFiles();
        try {

            //await fetch('http://localhost:8080/employee/registerEmployee');
            if (
                !firstnameRef.current?.value ||
                !lastnameRef.current?.value ||
                !emailRef.current?.value ||
                !passwordRef.current?.value ||
                !confirmpasswordRef.current?.value ||
                !selectedBDate ||
                !selectedGender1 ||
                !tinnumberRef.current?.value ||
                !selectedDistributor ||
                !currentaddressRef ||
                !permanentaddressRef.current?.value ||
                !contactnumberRef.current?.value ||
                !selectedProfilePicture ||
                !selectedPosition
            ) {

                handleAlertAndNavigate('Warning', 'Please fill in all required fields', 'warning');
                setFieldWarning(helperWarning);
                return;
            }
            if (passwordError) {
                handleAlertAndNavigate('Error', 'Passwords do not match', 'error');
                return;
            }
            newEmployee({
                employeeid: employeeuuid,
                firstname: String(firstnameRef.current?.value),
                middlename: String(middlenameRef.current?.value),
                lastname: String(lastnameRef.current?.value),
                emailaddress: String(emailRef.current?.value),
                password: String(passwordRef.current?.value),
                birthdate: selectedBDate?.format('YYYY-MM-DD') || '',
                gender: selectedGender1,
                currentaddress: String(currentaddressRef.current?.value),
                permanentaddress: String(permanentaddressRef.current?.value),
                contactnumber: String(contactnumberRef.current?.value),
                tinnumber: String(tinnumberRef.current?.value),
                iscashier: isCashierSelected, 
                issalesassociate: isSalesAssociateSelected,
                iscollector: isCollectorSelected,
                submissiondate: moment().format('YYYY-MM-DD'),
                distributor: selectedDistributor!,
                orderids: [],
                paymentreceiptids: [],
                collectionpaymentids: [],
                documentids: [],
            }, newEmployeeDocuments!);
            await handleAlertAndNavigate('Success', 'You are Successfully Registered!', 'success');

            handleAlertAcknowledged();
        } catch (error) {
            await handleAlertAndNavigate('Error', "Registration failed. Check your internet connection.", 'error');
            return;
        }
    }




    useEffect(() => {
        const currentDate = dayjs().subtract(18, 'year') as Dayjs;
        setMaxDate(currentDate);


        getAllDistributors();
    }, []);

    return (
        <div style={{ background: 'linear-gradient(#004AAD, #5DE0E6)', width: '100vw', height: '100vh', position: 'fixed', }}>
            <StyleGrid>
                <StyledCard>
                    <div style={{ backgroundColor: 'rgb(45, 133, 231, 0.8)', width: '40%', height: 1000, marginLeft: -10 }}>
                        <img src={logo4}
                            style={{
                                width: 'auto',
                                marginLeft: 0,
                                padding: '170px 20px 0px 75px',
                                height: '180px',
                                alignItems: 'center',
                                display: 'flex',
                                position: 'relative',
                                zIndex: 2
                            }}
                        />
                        <img src={employee1}
                            style={{
                                width: 'auto',
                                paddingTop: 10,
                                paddingBottom: 20,
                                height: '550px',
                                marginTop: -130,
                                marginLeft: 25,
                                display: 'flex',
                                position: 'relative',
                                zIndex: 1
                            }} />
                        <SignInTypo>Already have an account?&nbsp;<a href="/SignIn"> Sign In</a></SignInTypo>
                    </div>
                    <div style={{ padding: '1px 1px 1px 30px', display: 'flex', flexDirection: 'column' }}>
                        <ContentNameTypography>Sign Up as Employee</ContentNameTypography>
                        <ScrollStyle id="scrollContainer">

                            <div style={{ paddingTop: 60, paddingBottom: 80 }}>
                                {/**Textfield For First Name*/}
                                <GridField container spacing={3}>
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="First Name" required inputRef={firstnameRef} onChange={() => handleInputChange('firstname')} />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.firstname}
                                        </FormHelperText>
                                    </Grid>
                                    {/**Textfield For Middle Name*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Middle Name" inputRef={middlenameRef} />
                                    </Grid>
                                </GridField>
                                <GridField container spacing={3}>
                                    {/**Textfield For Last Name*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Last Name" required inputRef={lastnameRef} onChange={() => handleInputChange('lastname')} />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.lastname}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item>
                                        {/**Radio Group Button For Gender*/}
                                        <TypographyLabel>Gender:
                                            <div style={{ margin: '-7px 0 0 0px' }}>
                                                <RadioStyle
                                                    row
                                                    name="genderRadioGroup"
                                                    aria-required
                                                    value={selectedGender1}
                                                    onChange={handleGender}
                                                >
                                                    <FormControlLabel style={{ marginLeft: '20px' }} value='Male' control={<Radio />} label={<RadioLabel>Male</RadioLabel>} />
                                                    <FormControlLabel style={{ marginLeft: '20px' }} value='Female' control={<Radio />} label={<RadioLabel>Female</RadioLabel>} />
                                                </RadioStyle>
                                            </div>
                                        </TypographyLabel>
                                        <FormHelperText style={{ marginLeft: 9, color: '#BD9F00' }}>
                                            {fieldWarning.gender}
                                        </FormHelperText>
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
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.birthdate}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <div style={{ paddingTop: 10, paddingBottom: 30 }}>
                                    <GridField container spacing={3} >
                                        <Grid item>
                                            <StyledTextField variant="outlined" label="TIN Number" required style={{ width: '700px' }} inputRef={tinnumberRef} onChange={() => handleInputChange('tinnum')} />
                                            <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                                {fieldWarning.tinnum}
                                            </FormHelperText>
                                        </Grid>
                                    </GridField>
                                </div>
                            </div>
                            {/* Contact Info */}
                            <div style={{ paddingTop: 60, paddingBottom: 110 }}>
                                <GridField container spacing={3}>
                                    {/**Textfield For Contact Number*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Contact Number" required style={{ width: '700px' }} inputRef={contactnumberRef} onChange={() => handleInputChange('contactnum')} />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.contactnum}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField container spacing={3}>
                                    {/**Textfield For Current Addrress*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Current Address" required style={{ width: '700px', }} inputRef={currentaddressRef} onChange={handleCurrentAddressChange} />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.currentadd}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField container spacing={3}>
                                    {/**Textfield For Permanent Address*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Permanent Address"
                                            required
                                            style={{ width: '700px' }}
                                            inputRef={permanentaddressRef}
                                            value={permanentAddress}
                                            onChange={(e) => { setPermanentAddress(e.target.value); handleInputChange('permanentadd') }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button variant='contained' style={{ height: 40, marginRight: -13 }} onClick={handleCopyAddress}>Copy Current Address</Button>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.permanentadd}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField container spacing={0}>
                                    <Grid item>
                                        <TypographyLabelB>Apply As:
                                            <FormGroup row style={{ marginTop: '-9px' }} aria-required onChange={handlePositionChange}>
                                                <FormControlLabel style={{ marginLeft: '20px' }} control={<Checkbox checked={isCashierSelected}
                                                    onChange={handleCashierChange}
                                                    name="isCashier" />} label={<CheckLabel>Cashier</CheckLabel>} />
                                                <FormControlLabel style={{ marginLeft: '20px' }} control={<Checkbox checked={isSalesAssociateSelected}
                                                    onChange={handleSalesAssociateChange}
                                                    name="isSalesAssociate" />} label={<CheckLabel>Sales Associate</CheckLabel>} />
                                                <FormControlLabel style={{ marginLeft: '20px' }} control={<Checkbox checked={isCollectorSelected}
                                                    onChange={handleCollectorChange}
                                                    name="isCollector" />} label={<CheckLabel>Collector</CheckLabel>} />
                                            </FormGroup>
                                        </TypographyLabelB>
                                        <FormHelperText style={{ marginLeft: 285, color: '#BD9F00' }}>
                                            {fieldWarning.position}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                            </div>
                            {/* Account Creation */}
                            <div style={{ paddingTop: 30, paddingBottom: 40 }}>
                                <GridField container spacing={3}>
                                    {/**Textfield For Email Address*/}
                                    <Grid item>
                                        <StyledTextField variant="outlined" label="Email Address" style={{ width: '700px' }} inputRef={emailRef} onChange={() => handleInputChange('email')} />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.email}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField>
                                    <Grid item>
                                        <Autocomplete
                                            disablePortal
                                            id="flat-demo"
                                            options={distributors}
                                            getOptionLabel={(option) => option.firstname + " " + option.lastname}
                                            isOptionEqualToValue={(option, value) => option.distributorid === value.distributorid}
                                            value={selectedDistributor}
                                            onChange={
                                                (event, newValue) => {
                                                    setSelectedDistributor(newValue!);
                                                    handleInputChange('distributor')
                                                }}
                                            renderInput={(params) => (
                                                <StyledTextField
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps, disableUnderline: true
                                                    }}
                                                    variant="outlined"
                                                    label="Choose your Distributor to Apply"
                                                    style={{ width: '700px', marginLeft: -35, marginTop: 12 }}
                                                />)}

                                        />
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.distributor}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField container spacing={3}>
                                    {/**Textfield For Password*/}
                                    <Grid item>
                                        <StyledTextField
                                            type={isshowPassword ? 'text' : 'password'}
                                            variant="outlined"
                                            required
                                            label='Password'

                                            style={{ width: '700px' }}
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
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.password}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                                <GridField container spacing={3}>
                                    {/**Textfield For Password Confirmation*/}
                                    <Grid item>
                                        <StyledTextField
                                            type={isshowConfirmPassword ? 'text' : 'password'}
                                            variant="outlined"
                                            required label="Confirm Password"
                                            style={{ width: '700px' }}
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
                                <GridField>
                                    {/**Button For Profile Picture File*/}
                                    <Grid item>
                                        <label htmlFor="profilepicture-input">

                                            <Button variant="contained" component="span" aria-required
                                                sx={{
                                                    backgroundColor: '#2D85E7',
                                                    width: '700px',
                                                    margin: '15px 0 0 -35px',
                                                    height: '40px',

                                                    ':hover': {
                                                        backgroundColor: 'rgba(45, 133, 231, 0.9)',
                                                        // transform: 'scale(1.1)'
                                                    },
                                                    transition: 'all 0.4s'
                                                }}>
                                                <Icon style={{ color: '#ffffff', display: 'flex', marginRight: '15px' }}>
                                                    <input hidden accept=".jpeg,.jpg,.png" type="file"
                                                        onChange={handleProfilePictureFileChange}
                                                        style={{ display: 'none' }}
                                                        id="profilepicture-input" />
                                                    <UploadIcon />
                                                </Icon>
                                                <TypographyLabelC >
                                                    {selectedProfilePicture?.name === undefined ? 'Upload Profile Picture' : selectedProfilePicture?.name}
                                                </TypographyLabelC>
                                            </Button>

                                        </label>
                                        <FormHelperText style={{ marginLeft: 5, color: '#BD9F00' }}>
                                            {fieldWarning.selectedprofile}
                                        </FormHelperText>
                                    </Grid>
                                </GridField>
                            </div>


                        </ScrollStyle>
                        <div>
                            <Button variant="contained" style={{ height: 50, width: 170, borderRadius: 50 }} onClick={handleNewEmployee}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </StyledCard>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}>
                    <Alert onClose={handleClose} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                        <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </StyleGrid>
        </div>
    );

}