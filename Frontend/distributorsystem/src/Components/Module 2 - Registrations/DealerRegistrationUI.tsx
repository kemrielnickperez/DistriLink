import styled from "@emotion/styled";
import { Autocomplete, Button, FormControlLabel, Grid, Icon, Radio, RadioGroup, Switch, TextField, TextFieldProps, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import dealer1 from '../../Global Components/dealer1.png'
import { useNavigate } from "react-router-dom";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument, IDistributor, IProduct } from "../../RestCalls/Interfaces";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import Autosuggest, { SuggestionSelectedEventData, SuggestionsFetchRequestedParams, } from 'react-autosuggest';


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

    const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedBusinessOpt, setSelectedBusinessOpt] = useState<boolean>(false);
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);

    const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();
    const [selectedValidID, setSelectedValidID] = useState<File>();
    const [selectedContract, setSelectedContract] = useState<File>();
    const [selectedBusinessDocs, setSelectedBusinessDocs] = useState<File | null>();
    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);
    const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [distributors, setDistributors] = useState<IDistributor[]>([]);
    const [selectedDistributor, setSelectedDistributor] = useState<IDistributor>();

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







    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value !== confirmPassword) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError('');
        }
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



    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };
    const handleBussinessOpt = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedBusinessOpt(event.target.value === 'true');
    };

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


    };

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

    };


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

    };

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

    };

    const handleHasBusinessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBusinessOpt(event.target.checked);
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
                dealer: null,
            };
        }
        return null;
    };

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

    const handleNewDealer = async () => {


        const newDealerDocuments = await handleFiles();


         newDealer({
            dealerid: uuidv4().slice(0, 8),
            firstname: String(firstnameRef.current?.value),
            middlename: String(middlenameRef.current?.value),
            lastname: String(lastnameRef.current?.value),
            email: String(emailladdressRef.current?.value),
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

    };

    const handleSignUp = () => {
        handleNewDealer();
    };



    useEffect(() => {
        const currentDate = dayjs().subtract(18, 'year') as Dayjs;
        setMaxDate(currentDate);

        getAllDistributors();
       
       // console.log(selectedDistributor)

    }, []);


    return (
        <div>
            <GridBody>
                {/**Grids Body*/}
                <Grid item>
                    <ContentNameTypography>Sign Up</ContentNameTypography>
                    <LabelTypography>as Dealer</LabelTypography>
                    {/**Grids Textfields*/}
                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="First Name" size="small" inputRef={firstnameRef} />
                        </Grid>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Middle Name" size="small" inputRef={middlenameRef} />
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Last Name" size="small" inputRef={lastnameRef} />
                        </Grid>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Contact Number" size="small" inputRef={contactnumberRef} />
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Email Address" size="small" style={{ width: '795px' }} inputRef={emailladdressRef} />
                        </Grid>
                    </GridField>
                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField type="password" variant="outlined" label="Password" size="small" style={{ width: '795px' }} value={password} onChange={handlePasswordChange} inputRef={passwordRef} />
                        </Grid>
                    </GridField>
                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField type="password" variant="outlined" label="Confirm Password" size="small" style={{ width: '795px', marginBottom: 60 }} value={confirmPassword} onChange={handleConfirmPasswordChange} error={passwordError !== ''} helperText={passwordError} inputRef={confirmpasswordRef} />
                        </Grid>
                    </GridField>

                    <GridField container spacing={3}>
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
                                    onChange={(date) => setSelectedBDate(date as Dayjs | null)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>

                            <TypographyLabel>Gender:
                                <div style={{ margin: '-8px 0 0 0px' }}>
                                    <RadioStyle
                                        row
                                        name="genderRadioGroup"
                                        value={selectedGender}
                                        onChange={handleGender}
                                    >
                                        <FormControlLabel style={{ marginLeft: '30px' }} value='male' control={<Radio />} label={<RadioLabel>Male</RadioLabel>} />
                                        <FormControlLabel style={{ marginLeft: '40px' }} value='female' control={<Radio />} label={<RadioLabel>Female</RadioLabel>} />
                                    </RadioStyle>
                                </div>
                            </TypographyLabel>
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Current Address" size="small"
                                inputRef={currentaddressRef} />
                        </Grid>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Permanent Address" size="small" inputRef={permanentAddressRef} />
                        </Grid>
                    </GridField>
                    <GridField container spacing={0}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="TIN Number" size="small" style={{ width: '795px' }} inputRef={tinnumberRef} />
                        </Grid>
                    </GridField>
                    <GridField>
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                id="flat-demo"
                                options={distributors}
                                getOptionLabel={(option) => option.firstname +" "+ option.lastname}
                                isOptionEqualToValue={(option, value) => option.distributorid === value.distributorid}
                                value={selectedDistributor}
                                onChange={(event, newValue) => setSelectedDistributor(newValue!)}
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
                        </Grid>
                    </GridField>
                    <GridField container spacing={8} >
                        <Grid item>
                            <label htmlFor="validid-input">
                                <Button variant="contained" component="span"
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
                        </Grid>
                        <Grid item>
                            <label htmlFor="profilepicture-input">

                                <Button variant="contained" component="span"
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
                        </Grid>

                    </GridField>
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
                        <Grid item>
                            <StyledTextField variant="outlined" label="Business Name" size="small" style={{ width: '795px' }} disabled={!selectedBusinessOpt} inputRef={businessnameRef} />
                        </Grid>
                    </GridField>
                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Business Address" size="small" disabled={!selectedBusinessOpt} inputRef={businessaddressRef} />
                        </Grid>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Business Phone Number" size="small" disabled={!selectedBusinessOpt} inputRef={businessphonenumberRef} />
                        </Grid>
                    </GridField>
                    <GridField container spacing={8} >
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
                        </Grid>
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
                                        {selectedBusinessDocs?.name === undefined ? 'Upload Businedd Document' : selectedBusinessDocs?.name}
                                    </TypographyLabelC>
                                </Button>
                            </label>
                        </Grid>
                    </GridField>

                    <GridField container spacing={0} >
                        <Grid item>
                            <SignUpButton variant="contained" onClick={handleSignUp}>
                                Sign Up
                            </SignUpButton>
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