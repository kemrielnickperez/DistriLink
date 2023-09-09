import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, TextFieldProps, Typography, styled } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ChangeEvent, useRef, useState } from "react";
import { useRestEmployee } from "../../RestCalls/EmployeeUseRest";
import { Dayjs } from "dayjs";

export default function EmployeeRegistration(){
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
        marginTop: "30px", 
        marginLeft: "100px",
        display: 'flex',
    });
    const TypographyLabelB= styled(Typography)({
        textAlign: 'center',  
        fontSize: 20, 
        color: 'white',
        marginTop: "30px", 
        marginLeft: "390px",
        display: 'flex',
    });
    const TypographyUpload=styled(Typography)({
        textAlign: 'center',  
        fontSize: 20, 
        color: 'white',
        marginTop: "0px", 
        marginLeft: "100px",
        display: 'flex',
    });
    const TypographyRadio= styled(Typography)({
        textAlign: 'left',  
        fontSize: 20, 
        color: 'white', 
        display: 'flex',
        marginRight:'30px'
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
      const[newEmployee, getCollectorByID, employee, collector ]=useRestEmployee();
      const [selectedBDate, setSelectedBDate] = useState<Dayjs | null>(null);
      const [setGender1, setSelectedGender1]=useState('');
      const [isCashierSelected, setIsCashierSelected] = useState<boolean>(true);
      const [isSalesAssociateSelected, setIsSalesAssociateSelected] = useState<boolean>(false);
      const [isCollectorSelected, setIsCollectorSelected] = useState<boolean>(false)    
      const firstnameRef= useRef<TextFieldProps>(null)
      const middlenameRef= useRef<TextFieldProps>(null)
      const lastnameRef= useRef<TextFieldProps>(null)
      const currentaddressRef= useRef<TextFieldProps>(null)
      const permanentaddressRef=useRef<TextFieldProps>(null)
      const contactnumberRef= useRef<TextFieldProps>(null)

      const handleGender=(event:ChangeEvent<HTMLInputElement>)=>{
        setSelectedGender1(event.target.value);
      };
      
      const handleApplyAs=(event:ChangeEvent<HTMLInputElement>)=>{
        const targetValue = event.target.value;
        setIsCashierSelected(targetValue === 'cashier');
        setIsSalesAssociateSelected(targetValue === 'sales-associate');
        setIsCollectorSelected(targetValue === 'collector');
      };

      const handleNewEmployee=()=>{
        newEmployee({
            employeeid:-1,
            firstname: String(firstnameRef.current?.value),
            middlename: String(middlenameRef.current?.value),
            lastname: String(lastnameRef.current?.value),
            birthdate: selectedBDate?.format('YYYY-MM-DD') || '',
            gender:setGender1,
            currentaddress:String(currentaddressRef.current?.value),
            permanentaddress:String(permanentaddressRef.current?.value),
            contactnumber: String(contactnumberRef.current?.value),
            iscashier: isCashierSelected,
            issalesassociate:isSalesAssociateSelected,
            iscollector:isCollectorSelected,
        });
      };
    
    return( 
    <div>
        <header>
            <div style={{ textAlign: 'left', marginBottom:'100px' }}>
              <TypographyHeader> Employee Registration </TypographyHeader> 
                
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                           <Grid item>
                                    <TypographyLabel>First Name</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={firstnameRef}/>
                            </Grid>

                            <Grid item> 
                                    <TypographyLabel> Permanent Address</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={currentaddressRef}/>
                            </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                            <Grid item>
                                    <TypographyLabel>Middle Name</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={middlenameRef}/>
                            </Grid>

                            <Grid item> 
                                    <TypographyLabel>Contact No.</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={contactnumberRef}/>
                            </Grid>
                    </Grid>
                    <Grid container spacing={20} sx={{ display: "flex", }}>
                            <Grid item>
                                    <TypographyLabel>Last Name</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={lastnameRef}/>
                            </Grid>

                            <Grid item>
                            <TypographyLabel>Gender</TypographyLabel>
                            <div style={{ margin:"5px 20px 0px 120px"}}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        value={setGender1}
                                        onChange={handleGender}
                                        name="genderRadioGroup"
                                        sx={{
                                            color:"white", 
                                            '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color:"white",
                                            
                                            
                                            },
                                        }}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label={<TypographyRadio>Male</TypographyRadio>}/>
                                        <FormControlLabel value="female" control={<Radio />} label={<TypographyRadio>Female</TypographyRadio>} />
                                    </RadioGroup>
                            </div>
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
                            <TypographyLabel>Apply as:</TypographyLabel>
                            <div style={{ margin:"5px 20px 0px 120px"}}>
                                    
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        value={
                                            isCashierSelected ? 'cashier' :
                                            isSalesAssociateSelected ? 'sales-associate' :
                                            isCollectorSelected ? 'collector' :
                                            ''
                                          }
                                        onChange={handleApplyAs}
                                        name="applyasRadioGroup"
                                        sx={{
                                            color:"white", 
                                            '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color:"white",
                                            
                                            
                                            },
                                        }}
                                    >
                                        <FormControlLabel value="cashier" control={<Radio />} label={<TypographyRadio>Cashier</TypographyRadio>}/>
                                        <FormControlLabel value="sales-associate" control={<Radio />} label={<TypographyRadio>Sales Associate</TypographyRadio>} />
                                        <FormControlLabel value="collector" control={<Radio />} label={<TypographyRadio>Collector</TypographyRadio>} />
                                    </RadioGroup>
                            </div>
                            </Grid>
                             </Grid>
                             <Grid container spacing={20} sx={{ display: "flex", }}>
                            <Grid item> 
                                    <TypographyLabel>Current Address</TypographyLabel>
                                    <StyledTextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} inputRef={permanentaddressRef}/>
                            </Grid>
                    </Grid>
                    
                    <div style={{margin:'80px 0px 0px 635px'}}>         
                            <Button variant='contained' sx={{ background: "#AFD3E2", color: "#146C94", fontSize: 20, paddingLeft: 6, 
                                paddingRight: 6, fontWeight: 'bold', borderRadius: 2, width: '270px', height:'60px',
                                '&:hover': {
                                    background: "white",
                                    color: "#146C94",  
                                },}}
                                onClick={handleNewEmployee}>
                                Submit
                            </Button>   
                        </div>      
                </div>
        </header>
    </div>
)
}