import styled from "@emotion/styled";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Icon, Radio, RadioGroup, Switch, TextField, TextFieldProps, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { ChangeEvent, useRef, useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import employee1 from '../../Global Components/employee1.png'
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid';

const ImageStyle = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    marginRight: '-50px',
    marginTop: '-30px'
})
const ContentNameTypography = styled(Typography)({
    marginTop: 10,
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
    marginLeft: "150px",
    textAlign: 'center',
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
    ':hover': {
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const GridField = styled(Grid)({

})
export default function EmployeeRegistration() {


    const [newEmployee, getCollectorByID, collector] = useRestEmployee();
    const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);
    const [setGender1, setSelectedGender1] = useState('');
    const [gender, setGender] = useState<string>('');
    const [isCashierSelected, setIsCashierSelected] = useState<boolean>(false);
    const [isSalesAssociateSelected, setIsSalesAssociateSelected] = useState<boolean>(false);
    const [isCollectorSelected, setIsCollectorSelected] = useState<boolean>(false)
    const firstnameRef = useRef<TextFieldProps>(null)
    const middlenameRef = useRef<TextFieldProps>(null)
    const lastnameRef = useRef<TextFieldProps>(null)
    const emailRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const currentaddressRef = useRef<TextFieldProps>(null)
    const permanentaddressRef = useRef<TextFieldProps>(null)
    const contactnumberRef = useRef<TextFieldProps>(null)
    const tinnumberRef = useRef<TextFieldProps>(null)

    const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender1(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
        console.log(lastnameRef.current?.value);
    };

    /*   const handleApplyAs=(event:ChangeEvent<HTMLInputElement>)=>{
        const targetValue = event.target.value;
        setIsCashierSelected(targetValue === 'cashier');
        setIsSalesAssociateSelected(targetValue === 'sales-associate');
        setIsCollectorSelected(targetValue === 'collector');
      }; */

    const handleCashierChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setIsCashierSelected(event.target.checked);
        console.log(event.target.checked);
        console.log(isCashierSelected);
    };

    const handleSalesAssociateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSalesAssociateSelected(event.target.checked);
        console.log(event.target.checked);
    };

    const handleCollectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCollectorSelected(event.target.checked);
        console.log(event.target.checked);
    };



    const handleNewEmployee = () => {
        const uuid = uuidv4();
        const employeeuuid = uuid.slice(0, 8);

        newEmployee({
            employeeid: employeeuuid,
            firstname: String(firstnameRef.current?.value),
            middlename: String(middlenameRef.current?.value),
            lastname: String(lastnameRef.current?.value),
            emailaddress: String(emailRef.current?.value),
            password: String(passwordRef.current?.value),
            birthdate: selectedBDate?.format('YYYY-MM-DD') || '',
            gender: gender,
            currentaddress: String(currentaddressRef.current?.value),
            permanentaddress: String(permanentaddressRef.current?.value),
            contactnumber: String(contactnumberRef.current?.value),
            tinnumber: String(emailRef.current?.value),
            is_cashier: isCashierSelected,
            is_salesassociate: isSalesAssociateSelected,
            is_collector: isCollectorSelected,
            orderids: [],
            collectionpaymentids: []
        });
    };

    return (
        <GridBody>
            {/**Grids Body*/}
            <Grid item>
                <ContentNameTypography>Sign Up</ContentNameTypography>
                <LabelTypography>as Employee</LabelTypography>
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
                        <StyledTextField variant="outlined" label="Email Address" size="small" inputRef={emailRef} />
                    </Grid>
                    <Grid item>
                        <StyledTextField variant="outlined" label="Password" size="small" inputRef={passwordRef} />
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
                                    value={gender}
                                    onChange={handleGenderChange}
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
                        <StyledTextField variant="outlined" label="Current Address" size="small" inputRef={currentaddressRef} />
                    </Grid>
                    <Grid item>
                        <StyledTextField variant="outlined" label="Permanent Address" size="small" inputRef={permanentaddressRef} />
                    </Grid>
                </GridField>
                <GridField container spacing={0}>
                    <Grid item>
                        <StyledTextField variant="outlined" label="TIN Number" size="small" style={{ width: '795px' }} inputRef={tinnumberRef} />
                    </Grid>
                </GridField>
                <GridField container spacing={0}>
                    <Grid item>
                        <TypographyLabelB>Apply As:
                            <FormGroup row style={{ marginTop: '-9px' }}>
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
                    </Grid>
                </GridField>
                <GridField container spacing={0} >
                    <Grid item>
                        <SignUpButton variant="contained" onClick={handleNewEmployee}>
                            Sign Up
                        </SignUpButton>
                    </Grid>
                </GridField>
            </Grid>
            <Grid item>
                <ImageStyle><img src={employee1} style={{ width: 'auto', height: '900px' }}></img></ImageStyle>
            </Grid>
        </GridBody>
    );

}