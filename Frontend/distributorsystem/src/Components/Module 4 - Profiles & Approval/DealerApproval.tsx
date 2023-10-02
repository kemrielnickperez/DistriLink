import { Box, Button, Grid, Icon, Stack, TextField, Typography, styled } from "@mui/material";
import profilepic from "./profilepic.png";
import Modal from '@mui/material/Modal';
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
  
const TypographyHeader= styled(Typography)({
    textAlign: 'left', 
    fontWeight: 'bold',
    fontSize: 40, 
    color: 'white', 
    marginTop: "20px", 
    marginLeft: "40px",
});
const TypographyLabel= styled(Typography)({
    textAlign: 'left',  
    fontSize: 20, 
    color: 'white',
    marginTop: "40px", 
    marginLeft: "110px",
    display: 'flex',
});
const TypographyData = styled(Typography)({
    textAlign: 'left',  
    fontSize: 30, 
    color: 'white',
    marginTop: "5px", 
    marginLeft: "140px",
    display: 'flex', 
    fontWeight: 'bold'
});
const ButtonInfo=styled(Button)({
    background: "#AFD3E2", 
    color: "#146C94", 
    fontSize: 20, 
    marginLeft: 100,
    marginTop:30,
    paddingLeft: 6, 
    paddingRight: 6, 
    fontWeight: 'bold', 
    borderRadius: 10, 
    width: '320px', 
    height:'60px',
    '&:hover': {
        background: "white",
        color: "#146C94",  
      },
    });
//Modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function DealerApproval(){
  const [open, setOpen]=React.useState(false);
  const handleOpen=()=> setOpen(true);
  const handleClose=()=> setOpen(false);
  const PersonalInfo= ()=>(
    <>
                <TypographyLabel>Dealer's Name</TypographyLabel>
                <TypographyData>Liza Jean</TypographyData>

                <TypographyLabel>Birthdate</TypographyLabel>
                <TypographyData>01/01/2023</TypographyData>

                <TypographyLabel>Gender</TypographyLabel>
                <TypographyData>Female</TypographyData>

                <TypographyLabel>Permanent Address</TypographyLabel>
                <TypographyData>Lapu-Lapu City</TypographyData>
    </>
  )
  const BusinessInfo= ()=>(
    <>
                <TypographyLabel>Business Name</TypographyLabel>
                <TypographyData>Liza Jean</TypographyData>

                <TypographyLabel>Business Phone No.</TypographyLabel>
                <TypographyData>+639123456789</TypographyData>

                <TypographyLabel>Business Address</TypographyLabel>
                <TypographyData>Pajo, Lapu-Lapu</TypographyData>

                <TypographyLabel>TIN Number</TypographyLabel>
                <TypographyData>53572</TypographyData>
    </>
  )
  const [displayInfo, setDisplayInfo]=React.useState(<PersonalInfo/>) ;  
  const personalInfoClickHandler=()=>{
    setDisplayInfo(<PersonalInfo/>)
  };
  const businessInfoClickHandler=()=>{
    setDisplayInfo(<BusinessInfo/>)
  }
 

    return (
     <div style={{marginBottom:'100px'}}>
           <TypographyHeader>Dealer Information</TypographyHeader>
      <Grid container spacing={10} sx={{ display: "flex" }}>
            <Grid item>
                <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <img src={profilepic} style={{height:'300px', margin:'30px 0 0 100px'}}></img>
                        </Grid>
                </Grid>
                <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                                
                            <ButtonInfo variant="contained" onClick={personalInfoClickHandler}>
                                <Icon style={{color:'#146C94', height:'50px',marginTop:'15px', marginRight:'15px'}}>   
                                    <PersonIcon/>             
                                </Icon>
                                Basic Information
                            </ButtonInfo>
                        </Grid>
                </Grid>
                <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <ButtonInfo variant="contained" onClick={businessInfoClickHandler}>
                            <Icon style={{color:'#146C94', height:'50px',marginTop:'15px', marginRight:'15px'}}>   
                                    <BusinessCenterIcon/>             
                            </Icon>
                                 Business Information
                            </ButtonInfo>
                            
                        </Grid>
                </Grid>
                <Grid container spacing={20} sx={{ display: "flex", }}>
                        <Grid item>
                            <ButtonInfo variant="contained">
                                View Attachments
                            </ButtonInfo>
                        </Grid>
                </Grid>
            </Grid>

            <Grid item>
                {/* <TypographyLabel>Dealer's Name</TypographyLabel>
                <TypographyData>Liza Jean</TypographyData>

                <TypographyLabel>Birthdate</TypographyLabel>
                <TypographyData>01/01/2023</TypographyData>

                <TypographyLabel>Gender</TypographyLabel>
                <TypographyData>Female</TypographyData>

                <TypographyLabel>Permanent Address</TypographyLabel>
                <TypographyData>Lapu-Lapu City</TypographyData> */}
                {displayInfo}
                <Grid container spacing={5} sx={{ display: "flex", }}>
                    <Grid item>
                       <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, 
                            paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '200px', height:'60px', marginTop:'65px', marginLeft:'60px',
                            '&:hover': {
                                background: "white",
                                color: "#146C94",  
                            },}}>
                                Confirm
                        </Button>
                    </Grid>
                    <Grid item>
                       <Button variant='contained' onClick={handleOpen} sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, 
                            paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '300px', height:'60px', marginTop:'65px', marginLeft:'0px',
                            '&:hover': {
                                background: "white",
                                color: "#146C94",  
                            },}}>
                                Mark as Pending
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-title"
                            aria-describedby="Comment"  
                        >
                            <Box sx={style}>
                                <Typography style={{color:"#146C94", fontSize:'20px', fontWeight:'bold',marginBottom:'20px'}} id="modal-title"> Reasons </Typography>
                                <TextField
                                    id="filled-multiline-static"
                                    label="State the Reason for Pending"
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    style={{width:'400px'}}
                                />
                                <Button variant='contained'  sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, 
                                    paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '200px', height:'60px', marginTop:'20px', marginLeft:'100px',
                                    '&:hover': {
                                        background: "white",
                                        color: "#146C94",  
                                    },}}
                                    >
                                     Submit
                                 </Button>
                            </Box>
                        </Modal>
                    </Grid>
                    
                    <Grid item>
                       <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, 
                            paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '200px', height:'60px', marginTop:'65px', marginLeft:'0px',
                            '&:hover': {
                                background: "white",
                                color: "#146C94",  
                            },}}>
                                Decline
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
        
    )
}