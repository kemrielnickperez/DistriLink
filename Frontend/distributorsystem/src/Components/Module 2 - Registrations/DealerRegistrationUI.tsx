import styled from "@emotion/styled";
import { Autocomplete, Alert, AlertTitle, Button, FormControlLabel, FormHelperText, Grid, Icon, IconButton, InputAdornment, Radio, RadioGroup, Snackbar, Switch, TextField, TextFieldProps, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import dealer1 from '../../Global Components/Images/dealer1.png'
import { useNavigate } from "react-router-dom";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument, IDistributor, IProduct } from "../../RestCalls/Interfaces";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
//// import Autosuggest, { SuggestionSelectedEventData, SuggestionsFetchRequestedParams, } from 'react-autosuggest';

import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { error } from "console";
import { Visibility, VisibilityOff } from "@mui/icons-material";

{/**Grids Body*/ }
const ImageStyle = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '-1px',
    marginTop: '-30px'
})
const ContentNameTypography = styled(Typography)({
    marginTop: -10,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '30px',
    margin: '50px 0 0 200px',
    color: '#203949',

})
const LabelTypography = styled(Typography)({
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Inter, sans-serif',
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
    fontFamily: 'Inter, sans-serif',
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
    fontFamily: 'Inter, sans-serif',
})
const TypographyLabelC = styled(Typography)({
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
    display: 'flex',
    fontWeight: '550',
    fontFamily: 'Inter, sans-serif',
})
const RadioLabel = styled(Typography)({
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: '550',
    color: '#707070',
    fontFamily: 'Inter, sans-serif',

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
    width: '380px',
    height: 5,
    marginTop: "10px",
    marginLeft: "80px",
    marginRight: '-110px',
    marginBottom: '43px',
    input: {
        color: '#707070',
        fontFamily: 'Inter, sans-serif'
    },
    label: {
        color: '#707070',
        fontWeight: '550',
        fontFamily: 'Inter, sans-serif',
    },
});

const StyledDatePicker = styled(DatePicker)({
    width: '380px',
    marginLeft: "80px",
    marginTop: "10px",
    // marginBottom:'43px',
    input: {
        color: '#707070',
        fontFamily: 'Inter, sans-serif'
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
    fontFamily: 'Inter, sans-serif',
};
const ButtonStyle = styled(Button)({
    backgroundColor: '#2D85E7',
    width: '380px',
    marginBottom: '43px',
    margin: '10px 0 0 80px',
    height: '40px',
    marginRight: '-110px',
    ':hover': {
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
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


export default function DealerRegistration() {


    const navigate = useNavigate();

    {/**UseStates*/ }
    const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedBusinessOpt, setSelectedBusinessOpt] = useState(false);
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();
    const [selectedValidID, setSelectedValidID] = useState<File>();
    const [selectedContract, setSelectedContract] = useState<File | null>();
    const [selectedBusinessDocs, setSelectedBusinessDocs] = useState<File | null>();
    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);
    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [distributors, setDistributors] = useState<IDistributor[]>([]);
    const [selectedDistributor, setSelectedDistributor] = useState<IDistributor>();
    const [open, setOpen] = useState(false);
    const [alerttitle, setTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [value, setValue] = useState('');
    const [warnText, setWarnText] = useState(false);
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [isshowPassword, setisShowPassword] = useState(false);
    const [isshowConfirmPassword, setisShowConfirmPassword] = useState(false);
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
        selectedvalidid: '',
        tinnum: '',
        distributor: ''
    })
    const [fieldBussinessWarning, setFieldBussinessWarning] = useState({
        bussinessname: '',
        bussinessadd: '',
        bussinessphonnum: '',
        bussinesscontract: '',
        bussinessdoc: '',
    })


    {/**UseRefs*/ }
    const firstnameRef = useRef<TextFieldProps>(null)
    const middlenameRef = useRef<TextFieldProps>(null)
    const lastnameRef = useRef<TextFieldProps>(null)
    const emailladdressRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const confirmpasswordRef = useRef<TextFieldProps>(null)
    const currentaddressRef = useRef<TextFieldProps>(null)
    const permanentAddressRef = useRef<TextFieldProps>(null)
    const contactnumberRef = useRef<TextFieldProps>(null)
    const businessnameRef = useRef<TextFieldProps>(null)
    const businessaddressRef = useRef<TextFieldProps>(null)
    const businessphonenumberRef = useRef<TextFieldProps>(null)
    const tinnumberRef = useRef<TextFieldProps>(null)


    const distributorObject: IDistributor = {

        distributorid: "distributor4",
        firstname: "Junhui",
        middlename: "",
        lastname: "Wen",
        emailaddress: "wenjunhui@gmail.com",
        password: "moonmoon",
        birthdate: "1996-06-10",
        gender: "Male",
        currentaddress: "Talisay City",
        permanentaddress: "Talisay City",
        contactnumber: "09741258963",
        dealerids: [],
        employeeids: [],
        orderids: []
    }


    function getAllDistributors() {
        axios.get<IDistributor[]>('http://localhost:8080/distributor/getAllDistributors')
            .then((response) => {
                setDistributors(response.data);
                console.log(response.data)

            })
            .catch((error) => {

                alert("Error retrieving payment receipts. Please try again.");
            });
    }







    {/**Handlers*/ }

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        // You can add validation here to determine if the input is required.
        if (inputValue.trim() === '') {
            setWarnText(true);
        } else {
            setWarnText(false);
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


    {/**Handler for Copying Current Addres  to Permanent address*/ }
    const handleCurrentAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAddress(event.currentTarget.value);
        handleInputChange('currentadd')
    }
    const handleCopyAddress = () => {
        setPermanentAddress(currentAddress)
        handleInputChange('permanentadd')
    }

    {/**Handler for Radio Button - Gender*/ }
    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
        handleInputChange('gender');
    };


    {/**Handler Change for Button - Profile Picture File*/ }
    const handleProfilePictureFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSize = 1024 * 1024 * 5; // 5 MB 
            if (file.size <= maxSize) {
                setSelectedProfilePicture(file);
            } else {

                alert('File size exceeds the limit (5 MB). Please choose a smaller file.');
            }
        }


        handleInputChange('selectedprofile')
    };


    {/**Handler Change for Button - Valid ID File*/ }
    const handleValidIDFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSize = 1024 * 1024 * 5; // 5 MB (adjust as needed)

            if (file.size <= maxSize) {
                setSelectedValidID(file);
            } else {
                alert('File size exceeds the limit (5 MB). Please choose a smaller file.');
            }
        }
        handleInputChange('selectedvalidid')
    };
    {/**Handler Change for Switch -  Has Business*/ }
    const handleHasBusinessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            businessnameRef.current!.value = null;
            businessaddressRef.current!.value = null;
            businessphonenumberRef.current!.value = null;
            setSelectedContract(null);
            setSelectedBusinessDocs(null);
            fieldBussinessWarning.bussinesscontract = '';
            fieldBussinessWarning.bussinessdoc = ''

        }
        setSelectedBusinessOpt(event.target.checked);

    };


    {/**Handler Change for Button - Business Contract File*/ }

    const handleContractFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSize = 1024 * 1024 * 5; // 5 MB 

            if (file.size <= maxSize) {
                setSelectedContract(file);
            } else {

                alert('File size exceeds the limit (5 MB). Please choose a smaller file.');
            }
        }

        handleBussinessInputChange('bussinesscontract')
    };


    {/**Handler Change for Button - Business Documents File*/ }
    const handleBusinessDocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSize = 1024 * 1024 * 5; // 5 MB 

            if (file.size <= maxSize) {
                setSelectedBusinessDocs(file);
            } else {

                alert('File size exceeds the limit (5 MB). Please choose a smaller file.');
            }
        }

        handleBussinessInputChange('bussinessdoc')
    };


    {/**Function to create an IDealerDocument from a selected file*/ }
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
                dealer: null,
            };
        }
        return null;
    };


    {/**Handler for files*/ }
    const handleFiles = async () => {

        const profilepictureDocument = await createDocument(selectedProfilePicture!, String(lastnameRef.current?.value) + "_profilepicture");
        const validIDDocument = await createDocument(selectedValidID!, String(lastnameRef.current?.value) + "_validid");
        const contractDocument = await createDocument(selectedContract!, String(lastnameRef.current?.value) + "_contract");
        const businessDocsDocument = await createDocument(selectedBusinessDocs!, String(lastnameRef.current?.value) + "_businessdoc");

        // Create an array with the new documents and update the state
        const newDealerDocuments: IDealerDocument[] = [];
        if (profilepictureDocument) newDealerDocuments.push(profilepictureDocument);
        if (validIDDocument) newDealerDocuments.push(validIDDocument);
        if (contractDocument) newDealerDocuments.push(contractDocument);
        if (businessDocsDocument) newDealerDocuments.push(businessDocsDocument);

        setDealerDocuments((prevDealerDocuments) => [...prevDealerDocuments, ...newDealerDocuments]);

        // You can access the updated dealerDocuments state after this update


        return newDealerDocuments;
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
        selectedprofile: !selectedProfilePicture ? 'Please attach your Profile Picture' : '',
        selectedvalidid: !selectedValidID ? 'Please attach your Valid ID' : '',
        
        tinnum: !tinnumberRef.current?.value ? 'TIN Number is required' : '',
        distributor: !selectedDistributor ? 'Please choose a Distributor' : '',
    }

    const helperBussinessWarning = {
        bussinessname: !businessnameRef.current?.value ? 'Bussiness Name is required' : '',
        bussinessadd: !businessaddressRef.current?.value ? 'Bussiness Address is required' : '',
        bussinessphonnum: !businessphonenumberRef.current?.value ? 'Bussiness Phone Number is required' : '',
        bussinesscontract: !selectedContract ? 'Please attach your Business Contract' : '',
        bussinessdoc: !selectedBusinessDocs ? 'Please attach your Business Documents' : '',
    }


    {/**Handler Change to determine fieldname*/ }
    const handleInputChange = (fieldName: string) => {
        setFieldWarning({ ...fieldWarning, [fieldName]: '' })
    }
    const handleBussinessInputChange = (fieldName: string) => {
        setFieldBussinessWarning({ ...fieldBussinessWarning, [fieldName]: '' })
    }


    {/**HandlerNewDealer*/ }
    const handleNewDealer = async () => {

        const newDealerDocuments = await handleFiles();
        try {

            if (
                !firstnameRef.current?.value ||
                !lastnameRef.current?.value ||
                !emailladdressRef.current?.value ||
                !passwordRef.current?.value ||
                !confirmpasswordRef.current?.value ||
                !selectedBDate ||
                !selectedGender ||
                !tinnumberRef.current?.value ||
                !currentaddressRef.current?.value ||
                !permanentAddressRef.current?.value ||
                !contactnumberRef.current?.value ||
                !selectedProfilePicture ||
                !selectedValidID ||
                !selectedDistributor

            ) {

                handleAlert('Warning', 'Please fill in all required fields', 'warning');
                setFieldWarning(helperWarning);
                return;
            }
            if (selectedBusinessOpt) {
                if (
                    !businessnameRef.current?.value ||
                    !businessaddressRef.current?.value ||
                    !businessphonenumberRef.current?.value ||
                    !selectedContract ||
                    !selectedBusinessDocs) {
                    handleAlert('Warning', 'Please fill in all required business information', 'warning');
                    setFieldBussinessWarning(helperBussinessWarning);
                    return;
                }

            }
            if (passwordError) {
                handleAlert('Error', 'Passwords do not match', 'error');
                return;
            }
            newDealer({
                dealerid: uuidv4().slice(0, 8),
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
                hasbusiness: selectedBusinessOpt,
                businessname: String(businessnameRef.current?.value),
                businessphone: String(businessphonenumberRef.current?.value),
                businessaddress: String(businessaddressRef.current?.value),
                businesstin: String(tinnumberRef.current?.value),
                creditlimit: 0,
                submissiondate: moment().format('YYYY-MM-DD'),
                confirmed: false,
                remarks: '',
                distributor: selectedDistributor!,
                orderids: [],
                documentids: []
            }, newDealerDocuments!);

            console.log("mao ni gi selecr")
            console.log(selectedDistributor)
            handleAlert('Success', 'You are Successfully Registered!', 'success');

        } catch (error) {
            handleAlert('Error', 'An Error Occured, Please Check your Connection', 'error')
        }

    };


    {/**Handler Sign Up*/ }
    const handleSignUp = () => {
        //handleFiles
        handleNewDealer();
        // navigate(`/dashboard`);
    };


 {/**Use Effects*/ }
useEffect(() => {
    const currentDate = dayjs().subtract(18, 'year') as Dayjs;
    setMaxDate(currentDate);
    getAllDistributors();

    // console.log(selectedDistributor)

}, [distributors]);


{/**Return Statement*/ }
return (
    <div>
        <GridBody>
            {/**Grids Body*/}
            <Grid item>
                <ContentNameTypography>Sign Up</ContentNameTypography>
                <LabelTypography>as Dealer</LabelTypography>


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
                            required size="small"
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


                <GridField container spacing={0}>

                    {/**Textfield For TIN Number*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="TIN Number" size="small" required style={{ width: '795px' }} inputRef={tinnumberRef} onChange={() => handleInputChange('tinnum')} />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.tinnum}
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
                                handleInputChange('distributor')}}
                            renderInput={(params) => (
                                <StyledTextField
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps, disableUnderline: true
                                    }}
                                    variant="outlined"
                                    label="Distributor"
                                    size="small"
                                    style={{ width: '795px' }}

                                />)}

                        />
                         <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.distributor}
                        </FormHelperText>
                    </Grid>
                </GridField>
               
                <GridField container spacing={8} >

                    {/**Button For Valid ID File*/}
                    <Grid item>
                        <label htmlFor="validid-input">
                            <Button variant="contained" component="span" aria-required
                                sx={{
                                    backgroundColor: '#2D85E7',
                                    width: '380px',
                                    marginBottom: '43px',
                                    margin: '10px 0 0 80px',
                                    height: '40px',
                                    marginRight: '-110px',
                                    ':hover': {
                                        backgroundColor: 'rgba(45, 133, 231, 0.9)',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.4s'
                                }}>
                                <Icon style={{ color: '#ffffff', display: 'flex', marginRight: '15px' }}>
                                    <input hidden type="file"
                                        accept=".pdf,.jpg, .jpeg, .png"
                                        onChange={handleValidIDFileChange}
                                        style={{ display: 'none' }}
                                        id="validid-input"
                                    />
                                    <UploadIcon />
                                </Icon>
                                <TypographyLabelC>
                                    {selectedValidID?.name === undefined ? 'Upload Valid ID' : selectedValidID?.name}
                                </TypographyLabelC>
                            </Button>
                        </label>
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.selectedvalidid}
                        </FormHelperText>
                    </Grid>

                    {/**Button For Profile Picture File*/}
                    <Grid item>
                        <label htmlFor="profilepicture-input">

                            <Button variant="contained" component="span" aria-required
                                sx={{
                                    backgroundColor: '#2D85E7',
                                    width: '380px',
                                    marginBottom: '43px',
                                    margin: '10px 0 0 80px',
                                    height: '40px',
                                    marginRight: '-110px',
                                    ':hover': {
                                        backgroundColor: 'rgba(45, 133, 231, 0.9)',
                                        transform: 'scale(1.1)'
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
                                    {selectedProfilePicture?.name === undefined ? 'Upload Profile ID' : selectedProfilePicture?.name}
                                </TypographyLabelC>
                            </Button>

                        </label>
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldWarning.selectedprofile}
                        </FormHelperText>
                    </Grid>

                </GridField>

                {/**Switch for Business Info*/}
                <GridField container spacing={8}>
                    <Grid item>
                        <TypographyLabelB>Do you own a Business?
                            <div style={{ marginTop: '-5px', marginLeft: '10px' }}>
                                <Switch
                                    value={selectedBusinessOpt}
                                    checked={selectedBusinessOpt}
                                    onChange={handleHasBusinessChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </TypographyLabelB>
                    </Grid>

                </GridField>


                <GridField container spacing={0}>
                    {/**Text Field for Business Name*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Business Name" required size="small" style={{ width: '795px' }} disabled={!selectedBusinessOpt} inputRef={businessnameRef} onChange={() => handleBussinessInputChange('bussinessname')} />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {!selectedBusinessOpt ? '' : fieldBussinessWarning.bussinessname}
                        </FormHelperText>
                    </Grid>

                </GridField>


                <GridField container spacing={8}>
                    {/**Text Field for Business Business Address*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Business Address" required size="small" disabled={!selectedBusinessOpt} inputRef={businessaddressRef} onChange={() => handleBussinessInputChange('bussinessadd')} />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {!selectedBusinessOpt ? '' : fieldBussinessWarning.bussinessadd}
                        </FormHelperText>
                    </Grid>

                    {/**Text Field for Business Phone Number*/}
                    <Grid item>
                        <StyledTextField variant="outlined" label="Business Phone Number" required size="small" disabled={!selectedBusinessOpt} inputRef={businessphonenumberRef} onChange={() => handleBussinessInputChange('bussinessphonnum')} />
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {!selectedBusinessOpt ? '' : fieldBussinessWarning.bussinessphonnum}
                        </FormHelperText>
                    </Grid>
                </GridField>


                <GridField container spacing={8} >
                    {/**Button for Contract File*/}
                    <Grid item>
                        <label htmlFor="contract-input">
                            <Button variant="contained" disabled={!selectedBusinessOpt}
                                component="span"
                                sx={{
                                    backgroundColor: '#2D85E7',
                                    width: '380px',
                                    marginBottom: '43px',
                                    margin: '10px 0 0 80px',
                                    height: '40px',
                                    marginRight: '-110px',
                                    ':hover': {
                                        backgroundColor: 'rgba(45, 133, 231, 0.9)',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.4s'
                                }}>
                                <Icon style={{ color: '#ffffff', display: 'flex', marginRight: '15px' }}>
                                    <input hidden
                                        type="file"
                                        accept=".pdf,.jpg, .jpeg, .png"
                                        onChange={handleContractFileChange}
                                        style={{ display: 'none' }}
                                        id="contract-input" />
                                    <UploadIcon />
                                </Icon>
                                <TypographyLabelC>
                                    {selectedContract?.name === undefined ? 'Upload Contract' : selectedContract?.name}
                                </TypographyLabelC>
                            </Button>
                        </label>
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldBussinessWarning.bussinesscontract}
                        </FormHelperText>
                    </Grid>

                    {/**Text Field for Business Document*/}
                    <Grid item>
                        <label htmlFor="business-input">
                            <Button variant='contained'
                                disabled={!selectedBusinessOpt}
                                component="span"
                                sx={{
                                    backgroundColor: '#2D85E7',
                                    width: '380px',
                                    marginBottom: '43px',
                                    margin: '10px 0 0 80px',
                                    height: '40px',
                                    marginRight: '-110px',
                                    ':hover': {
                                        backgroundColor: 'rgba(45, 133, 231, 0.9)',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.4s'
                                }}
                            >

                                <Icon style={{ color: '#ffffff', display: 'flex', marginRight: '15px' }}>
                                    <input hidden
                                        type="file"
                                        accept=".pdf,.jpg, .jpeg,.png"
                                        onChange={handleBusinessDocChange}
                                        style={{ display: 'none' }}
                                        id="business-input" />
                                    <UploadIcon />
                                </Icon>
                                <TypographyLabelC >
                                    {selectedBusinessDocs?.name === undefined ? 'Upload Business Document' : selectedBusinessDocs?.name}
                                </TypographyLabelC>
                            </Button>
                        </label>
                        <FormHelperText style={{ marginLeft: 80, color: '#BD9F00' }}>
                            {fieldBussinessWarning.bussinessdoc}
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
                {/*  <ImageStyle><img src={dealer1} style={{width:'auto',height:'900px'}}></img></ImageStyle> */}
            </Grid>
        </GridBody>
    </div>
);
}