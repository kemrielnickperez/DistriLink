import { Button, Card, FormControlLabel, Grid, Icon, IconButton, Radio, RadioGroup, TextField, TextFieldProps, Typography, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; import { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UploadIcon from '@mui/icons-material/Upload';
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument } from "../../RestCalls/Interfaces";
import { ChangeEvent, useRef, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { gridFilteredDescendantCountLookupSelector } from "@mui/x-data-grid";


const TypographyHeader = styled(Typography)({
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    marginTop: "20px",
    marginLeft: "40px",
});
const TypographyLabel = styled(Typography)({
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    marginTop: "30px",
    marginLeft: "100px",
    display: 'flex',
});
const TypographyLabelB = styled(Typography)({
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: "30px",
    marginLeft: "390px",
    display: 'flex',
});
const TypographyUpload = styled(Typography)({
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: "0px",
    marginLeft: "100px",
    display: 'flex',
});
const TypographyRadio = styled(Typography)({
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    display: 'flex',
    marginRight: '30px'
});
const StyledTextField = styled(TextField)({
    backgroundColor: "#ffffff",
    borderRadius: "22px",
    input: {
        padding: "12px",
        color: "black"

    },
    width: '270px',
    marginTop: "10px",
    marginLeft: "100px",
});
const StyledDatePicker = styled(DatePicker)({
    backgroundColor: "#ffffff", borderRadius: "22px", input: {
        padding: "12px"
    },
    width: '250px',
    marginTop: "10px",
    marginLeft: "100px",
});

export default function DealerRegistration() {

    const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();
    const [setGender, setSelectedGender] = useState('');
    const [setBusinessOpt, setSelectedBusinessOpt] = useState<boolean>(false);
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);

    const [selectedValidID, setSelectedValidID] = useState<File>();
    const [selectedContract, setSelectedContract] = useState<File>();
    const [selectedBusinessDocs, setSelectedBusinessDocs] = useState<File | null>();
    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);


    const firstnameRef = useRef<TextFieldProps>(null)
    const middlenameRef = useRef<TextFieldProps>(null)
    const lastnameRef = useRef<TextFieldProps>(null)
    const currentaddressRef = useRef<TextFieldProps>(null)
    const permanentAddressRef = useRef<TextFieldProps>(null)
    const contactnumberRef = useRef<TextFieldProps>(null)
    const businessnameRef = useRef<TextFieldProps>(null)
    const businessaddressRef = useRef<TextFieldProps>(null)
    const businessphonenumberRef = useRef<TextFieldProps>(null)
    const tinnumberRef = useRef<TextFieldProps>(null)

    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };
    const handleBussinessOpt = (event: ChangeEvent<HTMLInputElement>) => {

        setSelectedBusinessOpt(event.target.value === 'true');
    };

    const handleValidIDFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.files?.[0].name)
        setSelectedValidID(event.target.files?.[0]);
    };

    const handleContractFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files?.[0].name)
        setSelectedContract(event.target.files?.[0]);
    };

    const handleBusinessDocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files?.[0].name)
        setSelectedBusinessDocs(event.target.files?.[0]);
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
        const validIDDocument = await createDocument(selectedValidID!, String(lastnameRef.current?.value) + "_validid");
        const contractDocument = await createDocument(selectedContract!, String(lastnameRef.current?.value) + "_contract");
        const businessDocsDocument = await createDocument(selectedBusinessDocs!, String(lastnameRef.current?.value) + "_businessdoc");

        // Create an array with the new documents and update the state
        const newDealerDocuments: IDealerDocument[] = [];
        if (validIDDocument) newDealerDocuments.push(validIDDocument);
        if (contractDocument) newDealerDocuments.push(contractDocument);
        if (businessDocsDocument) newDealerDocuments.push(businessDocsDocument);

        setDealerDocuments((prevDealerDocuments) => [...prevDealerDocuments, ...newDealerDocuments]);

        // You can access the updated dealerDocuments state after this update

        console.log(dealerDocuments);
        return newDealerDocuments;
    };





    const handleNewDealer = () => {

        handleFiles();

        const uuid = uuidv4();
        const dealeruuid = uuid.slice(0, 8);

        newDealer({
            dealerid: dealeruuid,
            firstname: String(firstnameRef.current?.value),
            middlename: String(middlenameRef.current?.value),
            lastname: String(lastnameRef.current?.value),
            birthdate: selectedBDate?.format('YYYY-MM-DD') || '',
            gender: setGender,
            currentaddress: String(currentaddressRef.current?.value),
            permanentaddress: String(permanentAddressRef.current?.value),
            contactnumber: String(contactnumberRef.current?.value),
            hasbusiness: setBusinessOpt,
            businessname: String(businessnameRef.current?.value),
            businessphone: String(businessphonenumberRef.current?.value),
            businessaddress: String(businessaddressRef.current?.value),
            businesstin: String(tinnumberRef.current?.value),
            creditlimit: 0,
            submissiondate: moment().format('YYYY-MM-DD'),
            orderids: [],
            documentids: []

        }, dealerDocuments!);
    };

    return (
        <div style={{ textAlign: 'left', marginBottom: '100px' }}>

            <TypographyHeader> Dealer Registration </TypographyHeader>

            <Grid container spacing={10} sx={{ display: "flex" }}>
                <Grid item>
                    <Grid container spacing={20} sx={{ display: "flex", }}>

                        <Grid item>
                            <TypographyLabel>First Name</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={firstnameRef} />
                        </Grid>

                        <Grid item>
                            <TypographyLabel>Current Address</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={currentaddressRef} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabel>Middle Name</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={middlenameRef} />
                        </Grid>

                        <Grid item>
                            <TypographyLabel>Permanent Address</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={permanentAddressRef} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabel>Last Name</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={lastnameRef} />
                        </Grid>

                        <Grid item>
                            <TypographyLabel>Contact No.</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={contactnumberRef} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabel>Birthday</TypographyLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StyledDatePicker sx={{ borderColor: 'white' }}
                                    slotProps={{
                                        textField: {
                                            InputProps: {
                                                disableUnderline: true
                                            },
                                            // Set the variant to "standard"
                                            variant: "standard",
                                            style: { padding: '0 10px 0 10px' }

                                        }
                                    }}
                                    value={selectedBDate}
                                    onChange={(date) => setSelectedBDate(date as Dayjs | null)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <TypographyLabel>Gender</TypographyLabel>
                            <div style={{ margin: "5px 20px 0px 120px" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={setGender}
                                    onChange={handleGender}
                                    name="genderRadioGroup"
                                    sx={{
                                        color: "white",
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color: "white",
                                        },
                                    }}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label={<TypographyRadio>Male</TypographyRadio>} />
                                    <FormControlLabel value="female" control={<Radio />} label={<TypographyRadio>Female</TypographyRadio>} />
                                </RadioGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabelB>Do you own a business?</TypographyLabelB>
                            <div style={{ margin: "5px 20px 0px 420px" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="businessoptionRadioGroup"
                                    value={setBusinessOpt}
                                    onChange={handleBussinessOpt}
                                    sx={{
                                        color: "white",
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color: "white",

                                        },
                                    }}
                                >
                                    <FormControlLabel value='true' control={<Radio />} label={<TypographyRadio>Yes</TypographyRadio>} />
                                    <FormControlLabel value='false' control={<Radio />} label={<TypographyRadio>No</TypographyRadio>} />
                                </RadioGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Typography style={{ color: 'white', marginLeft: '240px', marginTop: '5px' }}>If yes, please upload the necessary documents. (Barangay Clearance, TIN)</Typography>

                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <TypographyLabel>Gender</TypographyLabel>
                            <div style={{ margin: "5px 20px 0px 120px" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={setGender}
                                    onChange={handleGender}
                                    name="genderRadioGroup"
                                    sx={{
                                        color: "white",
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color: "white",


                                        },
                                    }}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label={<TypographyRadio>Male</TypographyRadio>} />
                                    <FormControlLabel value="female" control={<Radio />} label={<TypographyRadio>Female</TypographyRadio>} />
                                </RadioGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabelB>Do you own a business?</TypographyLabelB>
                            <div style={{ margin: "5px 20px 0px 420px" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="businessoptionRadioGroup"
                                    value={setBusinessOpt}
                                    onChange={handleBussinessOpt}
                                    sx={{
                                        color: "white",
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color: "white",

                                        },
                                    }}
                                >
                                    <FormControlLabel value='true' control={<Radio />} label={<TypographyRadio>Yes</TypographyRadio>} />
                                    <FormControlLabel value='false' control={<Radio />} label={<TypographyRadio>No</TypographyRadio>} />
                                </RadioGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Typography style={{ color: 'white', marginLeft: '240px', marginTop: '5px' }}>If yes, please upload the necessary documents. (Barangay Clearance, TIN)</Typography>

                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabel>Business Name</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={businessnameRef} disabled={!setBusinessOpt} />
                        </Grid>

                        <Grid item>
                            <TypographyLabel>Business Address</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={businessaddressRef} disabled={!setBusinessOpt} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <TypographyLabel>Business Phone No.</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={businessphonenumberRef} disabled={!setBusinessOpt} />
                        </Grid>

                        <Grid item>
                            <TypographyLabel>TIN Number</TypographyLabel>
                            <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={tinnumberRef} disabled={!setBusinessOpt} />
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item>
                    <div style={{ margin: '50px 0px 0px 50px' }}>
                        <label htmlFor="validid-input">
                            <Button variant='contained' component="span" sx={{
                                background: "white", fontSize: 20, paddingLeft: 6,
                                paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '250px', height: '150px',
                                '&:hover': {
                                    background: "white",
                                    color: "#146C94",
                                },
                            }}
                                disabled={!setBusinessOpt}>
                                <Icon style={{ color: '#146C94' }}>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleValidIDFileChange}
                                        style={{ display: 'none' }}
                                        id="validid-input"
                                    />
                                    <UploadIcon />
                                </Icon>
                            </Button>
                        </label>



                    </div>
                    <Grid item>
                        <TypographyUpload>Upload Valid ID</TypographyUpload>
                    </Grid>
                    <div style={{ margin: '80px 0px 0px 50px' }}>

                        <label htmlFor="contract-input">
                            <Button variant='contained' component="span" sx={{
                                background: "white", fontSize: 20, paddingLeft: 6,
                                paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '250px', height: '150px',
                                '&:hover': {
                                    background: "white",
                                    color: "#146C94",
                                },
                            }} disabled={!setBusinessOpt}>
                                <Icon style={{ color: '#146C94' }}>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleContractFileChange}
                                        style={{ display: 'none' }}
                                        id="contract-input"
                                    />
                                    <UploadIcon />
                                </Icon>
                            </Button>
                        </label>
                    </div>
                    <Grid item>
                        <TypographyUpload>Upload the Contract</TypographyUpload>
                    </Grid>
                    <div style={{ margin: '80px 0px 0px 50px' }}>
                        <label htmlFor="business-input">
                            <Button variant='contained' component="span" sx={{
                                background: "white", fontSize: 20, paddingLeft: 6,
                                paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '250px', height: '150px',
                                '&:hover': {
                                    background: "white",
                                    color: "#146C94",
                                },
                            }} disabled={!setBusinessOpt}>
                                <Icon style={{ color: '#146C94' }}>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.png"
                                        onChange={handleBusinessDocChange}
                                        style={{ display: 'none' }}
                                        id="business-input"
                                    />
                                    <UploadIcon />
                                </Icon>
                            </Button>
                        </label>

                        {selectedBusinessDocs && (
                            <Typography variant="body1">
                                Selected File: {selectedBusinessDocs.name}
                            </Typography>
                        )}

                        <button onClick={() => setSelectedBusinessDocs(null)}>
                            empty business docs
                        </button>

                    </div>
                    <Grid item>
                        <Typography style={{ textAlign: 'center', fontSize: 20, color: 'white', marginLeft: '50px' }}>Upload Business Documents</Typography>
                    </Grid>
                </Grid>

            </Grid>
            <div style={{ margin: '80px 0px 0px 635px' }}>
                <Button variant='contained' sx={{
                    background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6,
                    paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '270px', height: '60px',
                    '&:hover': {
                        background: "white",
                        color: "#146C94",
                    },
                }}
                    onClick={() => { handleNewDealer() }}>
                    Submit
                </Button>
            </div>

        </div>
    )
}