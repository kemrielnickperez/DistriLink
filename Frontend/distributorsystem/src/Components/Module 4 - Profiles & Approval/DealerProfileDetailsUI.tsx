import {  Grid, Stack,  Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { IDealer } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '8%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '25px',
    color:'#203949'
})


const StyldeInfoHeader= styled(Typography)({
    marginTop: '85px',
    marginBottom: '90px',
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '20px',
    color:'#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute', 
    top: '230px', 
    left: '-12%',
    fontFamily: 'Inter',

})
const StyleLabel=styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '-165px',
    color: '#707070',
    fontSize: '15px',
    width:'max-content',
    fontFamily: 'Inter',  
}) 
const StyleData=styled(Typography)({

    position: 'absolute',
    textAlign: 'left',
    width: 200,
    left: '-140px',
    top:'35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})


  export function DealerProfileDetails() {
    const [dealer, setDealer] = useState<IDealer | null>(null);

    // Use useParams to get the dealer from the URL
    const { objectId } = useParams();

    useEffect(() => {
    // Make an Axios GET request to fetch the dealer data using the objectId
    axios
    .get<IDealer>(`http://localhost:8080/dealer/getDealerByID/${objectId}`)
    .then((response) => {
      setDealer(response.data);
    })
    .catch((error) => {
      console.error("Error fetching dealer data:", error);
    });
}, [objectId]);
   

    
    return(
        <div>
    <ContentNameTypography>Dealer Profile Details</ContentNameTypography>
    {dealer ? (
      <div>
        {/* Render dealer details */}
            <StyldeInfoHeader>Dealer Information</StyldeInfoHeader>
            <StackStyle sx={{left:'30%'}}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{dealer?.firstname} {dealer?.middlename} {dealer?.lastname}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'50%'}}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{dealer?.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'65%'}}>
                <StyleLabel>Credit Limit</StyleLabel>
                <StyleData>Php {dealer?.creditlimit}</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Basic Information</StyldeInfoHeader>
            <StackStyle sx={{left:'30%', top:'350px'}}>
                <StyleLabel>Gender</StyleLabel>
                <StyleData>{dealer?.gender}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'45%', top:'350px'}}>
                <StyleLabel>Birthdate</StyleLabel>
                <StyleData>{dealer?.birthdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'60%', top:'350px'}}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{dealer?.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'75%', top:'350px'}}>
                <StyleLabel>Current Address</StyleLabel>
                <StyleData>{dealer?.currentaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'90%', top:'350px'}}>
                <StyleLabel>Permanent Address</StyleLabel>
                <StyleData>Php {dealer?.permanentaddress}</StyleData>
            </StackStyle>
           
            
      </div>
      
            ) : (
                <Grid sx={{ justifyContent: "center", marginTop: '200px' }}>
                {dealer === null ? (
                  <>
                    <AutorenewOutlinedIcon />
                    <h4>Loading...</h4>
                  </>
                ) : (
                  <p>Dealer not found.</p>
                )}
              </Grid>
            )}
        </div>  
    );
    
}