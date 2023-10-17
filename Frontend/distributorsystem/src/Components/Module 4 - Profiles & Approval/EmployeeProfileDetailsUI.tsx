import { Grid, Icon, Stack, Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PersonIcon from '@mui/icons-material/Person';
import profilepic from "./profilepic.png"
import { IEmployee } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContentNameTypography = styled(Typography)({
  marginTop: 60,
  marginLeft: '8%',
  fontFamily: 'Inter',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '25px',
  color: '#203949'
})

const StyleMainInfo = styled(Typography)({
  fontWeight: 'bold',
  position: 'absolute',
  textAlign: 'left',
  width: 250,
  left: '-140px',
  top: '35px',
  color: '#203949',
  fontSize: '20px',
  fontFamily: 'Inter',
  
})


const StyldeInfoHeader = styled(Typography)({
  marginTop: '-45px',
  marginBottom: '100px',
  marginLeft: '26%',
  fontFamily: 'Inter',
  fontWeight: 'bold',
  textAlign: 'left',
  fontSize: '25px',
  color: '#203949'
})
const StackStyle = styled(Stack)({
  position: 'absolute',
  top: '230px',
  left: '-12%',
  fontFamily: 'Inter',

})
const StyleLabel = styled(Typography)({
  position: 'absolute',
  textAlign: 'left',
  fontWeight: '550',
  left: '-165px',
  color: '#707070',
  fontSize: '17px',
  width: 'max-content',
  fontFamily: 'Inter',
})
const StyleData = styled(Typography)({

  position: 'absolute',
  textAlign: 'left',
  width: 250,
  left: '-140px',
  top: '35px',
  color: '#203949',
  fontSize: '15px',
  fontFamily: 'Inter, sans - serif',
})






export function EmployeeProfileDetails() {
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  // Use useParams to get the employee from the URL
  const { empId } = useParams();

  useEffect(() => {
    // Make an Axios GET request to fetch the employee data using the objectId
    axios
      .get<IEmployee>(`http://localhost:8080/employee/getEmployeeByID/${empId}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [empId]);



  return (
    <div>

      {employee ? (
        <div>
          <Grid item>
            <Grid item>
              <ContentNameTypography>Employee Profile Details</ContentNameTypography>
              <img src={profilepic} style={{ height: '250px', margin: '30px 500px 0px -550px' }}></img>
            </Grid>
          </Grid>
          {/* Render employee details */}
          <StackStyle sx={{ left: '40%' , top: '200px'}}>
            <StyleLabel>Employee Name</StyleLabel>
            <StyleMainInfo>{employee?.firstname} {employee?.middlename} {employee?.lastname}</StyleMainInfo>
          </StackStyle>
          <StackStyle sx={{ left: '60%', top: '200px' }}>
            <StyleLabel>Employee ID</StyleLabel>
            <StyleMainInfo>{employee?.employeeid}</StyleMainInfo>
          </StackStyle>
          <StackStyle sx={{ left: '80%', top: '200px' }}>
            <StyleLabel>Position</StyleLabel>
            <StyleMainInfo>
              {employee.is_cashier && "Cashier"}
              {employee.is_collector && (employee.is_cashier ? ', Collector' : 'Collector')}
              {employee.is_salesassociate && (employee.is_cashier || employee.is_collector ? ', Sales Associate' : 'Sales Associate')}
            </StyleMainInfo>
          </StackStyle>
          <StyldeInfoHeader>
            <Icon style={{ color: '#203949', marginTop: '25px', marginRight: '15px' }}>
            <PersonIcon /></Icon> Basic Information
            </StyldeInfoHeader>
          <StackStyle sx={{ left: '40%', top: '420px' }}>
            <StyleLabel>Gender</StyleLabel>
            <StyleData>{employee?.gender}</StyleData>
          </StackStyle>
          <StackStyle sx={{ left: '60%', top: '420px' }}>
            <StyleLabel>Birthdate</StyleLabel>
            <StyleData>{employee?.birthdate}</StyleData>
          </StackStyle>
          <StackStyle sx={{ left: '80%', top: '420px' }}>
            <StyleLabel>Contact Number</StyleLabel>
            <StyleData>{employee?.contactnumber}</StyleData>
          </StackStyle>
          <StackStyle sx={{ left: '40%', top: '520px' }}>
            <StyleLabel>Current Address</StyleLabel>
            <StyleData>{employee?.currentaddress}</StyleData>
          </StackStyle>
          <StackStyle sx={{ left: '60%', top: '520px' }}>
            <StyleLabel>Permanent Address</StyleLabel>
            <StyleData>Php {employee?.permanentaddress}</StyleData>
          </StackStyle>


        </div>

      ) : (
        <Grid sx={{ justifyContent: "center", marginTop: '200px' }}>
          {employee === null ? (
            <>
              <AutorenewOutlinedIcon />
              <h4>Loading...</h4>
            </>
          ) : (
            <p>Employee not found.</p>
          )}
        </Grid>
      )}
    </div>
  );

}