import styled from "@emotion/styled";
import { Button, FormControlLabel, Grid, Icon, Radio, RadioGroup, Switch, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import dealer1 from '../../Global Components/dealer1.png'
import { useNavigate } from "react-router-dom";

const ImageStyle= styled(Typography)({
    display:'flex',
    alignItems:'center',
     marginRight:'-50px',
     marginTop:'-30px'
})
const ContentNameTypography = styled(Typography)({
    marginTop: -10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize: '30px',
    margin:'50px 0 0 200px',
    color:'#203949',
   
})
const LabelTypography= styled(Typography)({
    marginTop: 5,
    marginBottom:10,
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign:'center',
    fontSize: '20px',
    marginLeft:'200px',
    color:'#707070'
})
const TypographyLabel= styled(Typography)({
    marginTop: "16px",
    marginLeft:'25px',
    marginBottom:'10px',
    marginRight:'-175px',
    fontFamily: 'Inter',
    fontWeight: '550',
    textAlign:'left',
    fontSize: 17,
    display:'flex',
    color:'#707070',
   
})
const TypographyLabelB=styled(Typography)({
    marginTop: "18px",
    marginLeft:"330px",
    textAlign:'center',
    fontSize:17,
    color:'#707070',
    display:'flex',
    fontWeight:'550',
    fontFamily:'inter',
})
const TypographyLabelC=styled(Typography)({
    textAlign:'center',
    fontSize:12,
    color:'#ffffff',
    display:'flex',
    fontWeight:'550',
    fontFamily:'inter',
})
const RadioLabel= styled(Typography)({
    textAlign: 'left',  
    fontSize: '17px', 
    fontWeight:'550',
    color: '#707070',
    fontFamily:'inter',
    
});
const RadioStyle= styled(RadioGroup)({
    marginBottom:'-4px',
    color:"#707070", 
   '& .MuiSvgIcon-root': {
        fontSize: '25px',
        color:"#2D85E7",
    },
})

const StyledTextField = styled(TextField)({
    // backgroundColor: "#ffffff", 
    borderRadius: "22px", 
    width: '380px',
    height:5,
    marginTop: "10px", 
    marginLeft: "80px",
    marginRight:'-110px',
    marginBottom:'43px',
    input:{
        color: '#707070',
        fontFamily:'Inter'
    },
    label:{
        color: '#707070',
        fontWeight:'550',
        fontFamily:'Inter',
    },    
  });

  const StyledDatePicker = styled(DatePicker)({
    width: '380px',
    marginLeft: "80px",
    marginTop: "10px", 
    // marginBottom:'43px',
    input: {
        color: '#707070',
        fontFamily:'Inter'
    },
  });

const GridBody= styled(Grid)({
    display:'flex',
    textAlign:'center',
    justifyContent:'space-between'
})


const labelStyle: React.CSSProperties = {
    fontWeight: '550',
    color: '#707070',
    fontFamily:'Inter',
};
const ButtonStyle= styled(Button)({
    backgroundColor:'#2D85E7',
    width:'380px',
    marginBottom:'43px',
    margin:'10px 0 0 80px',
    height:'40px',
    marginRight:'-110px',
    ':hover':{
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const SignUpButton= styled(Button)({
    backgroundColor:'#2D85E7',
    color:'#FFFFFF',
    width:'795px',
    margin:'10px 0 0 80px',
    height:'50px',
    marginRight:'-110px',
    marginTop: "30px", 
    ':hover':{
        backgroundColor: 'rgba(45, 133, 231, 0.9)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const GridField=styled(Grid)({
    
})


export default function NewDealerRegistration(){
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
   
    const navigate=useNavigate();
    const handleSignUp=()=>{
        navigate(`/dashboard`);
    };
    return(
        <div>
            <GridBody>
            {/**Grids Body*/}    
                <Grid item>
                    <ContentNameTypography>Sign Up</ContentNameTypography>
                    <LabelTypography>as Dealer</LabelTypography>
                {/**Grids Textfields*/}  
                    <GridField container spacing={8}>
                        <Grid item>
                            <StyledTextField variant="outlined" label="First Name" size="small"/>
                        </Grid>
                        <Grid item>
                            <StyledTextField variant="outlined" label="Middle Name" size="small"/>
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Last Name" size="small"/>
                        </Grid>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Contact Number" size="small"/>
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Email Address" size="small"/>
                        </Grid>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Password" size="small"/>
                        </Grid>
                    </GridField>

                    <GridField container spacing={3}>
                        <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StyledDatePicker 
                                        slotProps={{
                                            textField:{
                                                variant:'outlined',
                                                label:<span style={labelStyle}>Birthdate</span>,  
                                                size:'small', 
                                                style: labelStyle
                                            }                                        
                                        }}
                                    />
                                </LocalizationProvider>
                        </Grid>
                        <Grid item>
                                  
                                <TypographyLabel>Gender: 
                                    <div style={{margin:'-8px 0 0 0px'}}>
                                        <RadioStyle
                                            row
                                            name="genderRadioGroup"
                                        >
                                            <FormControlLabel style={{marginLeft:'30px'}} value='male' control={<Radio/>} label={<RadioLabel>Male</RadioLabel>}/>
                                            <FormControlLabel style={{marginLeft:'40px'}} value='female' control={<Radio/>} label={<RadioLabel>Female</RadioLabel>}/>
                                        </RadioStyle>
                                    </div>
                                </TypographyLabel>
                        </Grid>
                    </GridField>

                    <GridField container spacing={8}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Current Address" size="small"/>
                        </Grid>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Permanent Address" size="small"/>
                        </Grid>
                    </GridField>
                    <GridField container spacing={0}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="TIN Number" size="small" style={{width:'795px'}}/>
                        </Grid>
                    </GridField>
                    <GridField container spacing={8} >
                          <Grid item>
                               <ButtonStyle variant="contained"> 
                                        <Icon style={{color:'#ffffff', display:'flex', marginRight:'15px'}}>
                                          <input hidden accept="image/*" type="file"/>
                                          <UploadIcon/>
                                        </Icon>
                                        <TypographyLabelC>Upload Valid ID</TypographyLabelC>
                                </ButtonStyle>
                        </Grid>
                        <Grid item>
                               <ButtonStyle variant="contained"> 
                                        <Icon style={{color:'#ffffff', display:'flex', marginRight:'15px'}}>
                                          <input hidden accept="image/*" type="file"/>
                                          <UploadIcon/>
                                        </Icon>
                                        <TypographyLabelC >Upload 2x2 Picture</TypographyLabelC>
                                </ButtonStyle>
                        </Grid>
                        
                    </GridField>                        
                    <GridField container spacing={8}>
                        <Grid item>
                            <TypographyLabelB>Do you own a Business?
                                <div style={{marginTop:'-5px', marginLeft:'10px'}}>
                                    <Switch
                                        value={checked}
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled'}}
                                    />
                                </div>
                            </TypographyLabelB>
                        </Grid>
                    </GridField>
                    <GridField container spacing={0}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Business Name" size="small" style={{width:'795px'}} disabled={!checked}/>
                        </Grid>
                    </GridField>
                    <GridField container spacing={8}>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Business Address" size="small" disabled={!checked}/>
                        </Grid>
                        <Grid item>
                                <StyledTextField variant="outlined" label="Business Phone Number" size="small" disabled={!checked}/>
                        </Grid>
                    </GridField>
                    <GridField container spacing={8} >
                          <Grid item>
                               <ButtonStyle variant="contained" disabled={!checked}> 
                                        <Icon style={{color:'#ffffff', display:'flex', marginRight:'15px'}}>
                                          <input hidden accept="image/*" type="file"/>
                                          <UploadIcon/>
                                        </Icon>
                                        <TypographyLabelC>Upload Contract</TypographyLabelC>
                                </ButtonStyle>
                        </Grid>
                        <Grid item>
                               <ButtonStyle variant="contained" disabled={!checked}> 
                                        <Icon style={{color:'#ffffff', display:'flex', marginRight:'15px'}}>
                                          <input hidden accept="image/*" type="file"/>
                                          <UploadIcon/>
                                        </Icon>
                                        <TypographyLabelC >Upload Business Documents</TypographyLabelC>
                                </ButtonStyle>
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