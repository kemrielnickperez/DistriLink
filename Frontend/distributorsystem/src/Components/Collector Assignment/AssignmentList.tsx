import * as React from 'react';
import { AppBar, Typography, Box, Toolbar, Button, IconButton, CardActions, Card, CardContent, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';
import CollectorAssignment from './CollectorAssignment';
//Hello pows$safsf

//     moduleName: string;
// }
interface AutocompleteOption {
  label: string;
}


const ComboContainer = styled('div')({
  '& .MuiOutlinedInput-root': {
    height: '20px',

  },
  '& .MuiAutocomplete-inputRoot': {
    height: '40%',

  },
  '& .MuiAutocomplete-popup': {
    maxHeight: '40px',
  },

});
const theme = createTheme();

export default function AssignmentList() {
  // document.title = 'Assignment Collector'; // Set the document title
  const dealerName = [
    { label: 'Ariel Rivera', id: 1 },
    { label: 'Kim Possible', id: 2 },
    { label: 'Charmaine Ramirez', id: 3 },
    { label: 'Ephraim Perez', id: 4 }
  ];
  const collectorName = [
    { label: 'Cherry Gil', id: 1 },
    { label: 'Gardo Versoza', id: 2 },
    { label: 'Jose Legazpi', id: 3 },
    { label: 'Maria Gomez', id: 4 }
  ];

  return (
    <div>
      {/* <NavBar moduleName={'Assignment Collector'}/> */}
      <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>

        <div className='cardContainer' style={{ width: '95%' }}>

          {/* Card For Number of Transaction Records */}
          <Card sx={{ margin: "40px 0px 0px 0px", borderRadius: "15px", display: "flex" }}>
            <div className='numDiv'>
              <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '10px 0px 0px 20px', color: '#146C94', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <span style={{ textAlign: 'left', fontSize: '18px' }}>Number of Order Transaction Records</span>
                <span style={{ textAlign: 'right', fontSize: '15px', color: '#2A9221' }}>Assigned: </span>
                <span style={{ textAlign: 'right', fontSize: '15px', color: '#E77D7D' }}>Not Assigned: </span>
                <span style={{ textAlign: 'right', fontSize: '15px' }}>Total:  </span>
              </Typography>
            </div>
          </Card>

          {/* Card For Filters */}
          <ThemeProvider theme={theme}>
            <Card sx={{ height: 100, margin: "10px 0px 0px 0px", borderRadius: "15px", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
              <div className='numDiv' style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Typography-Filter Dealer Name */}
                  <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '-10px 0px 0px 10px', color: '#146C94', display: 'flex', alignItems: 'center' }} >
                    <span style={{ textAlign: 'left', fontSize: '15px' }}>Filter Dealer Name</span>
                  </Typography>
                  {/* Combo Box-Filter Dealer Name */}
                  <CardActions>
                    <ComboContainer>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={dealerName}
                        // sx={{width:'200px'}}
                        style={{ color: '#146C94', background: '#E9E9E9', margin: '-15px 0px 0px 10px' }}
                        renderInput={(params) => <TextField {...params} label="All" sx={{
                          width: 250, '& .MuiInputLabel-root': {
                            color: '#146C94',
                          }, '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#E9E9E9', color: '#146C94'
                            },
                          }
                        }} />} />
                    </ComboContainer>
                  </CardActions>
                  {/* Typography -Filter Collector Name */}
                  <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '-10px 0px 0px 20px', color: '#146C94', display: 'flex', alignItems: 'center' }} >
                    <span style={{ textAlign: 'left', fontSize: '15px' }}>Filter Collector Name</span>
                  </Typography>
                  <CardActions>
                    <ComboContainer>
                      {/* Combo Box-Filter Collector Name */}
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={collectorName}
                        // sx={{width:'200px'}}
                        style={{ color: '#146C94', background: '#E9E9E9', margin: '-15px 20px 0px 10px' }}
                        renderInput={(params) => <TextField {...params} label="All" sx={{
                          width: 250, '& .MuiInputLabel-root': {
                            color: '#146C94',
                          }, '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#E9E9E9', color: '#146C94'
                            },
                          }
                        }} />} />
                    </ComboContainer>
                    {/* Typography-Filter Due Date */}
                    <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '-10px 0px 0px 20px', color: '#146C94', display: 'flex', alignItems: 'center' }} >
                      <span style={{ textAlign: 'left', fontSize: '15px' }}>Filter Due Date</span>
                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{ margin: '0px 20px 0px 10px', background: '#E9E9E9' }}>
                          
                          <DatePicker />
                        </div>
                      </LocalizationProvider> */}
                    </Typography>
                  </CardActions>
                </div>
              </div >
            </Card>

            {/* Card for Data Grid Order Transaction Records  */}
            <Card sx={{ height: 550, margin: "10px 0px 20px 0px", borderRadius: "15px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>

                  {/* Typography-Group Transactions */}
                  <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '0px 0px 0px 30px', color: '#146C94', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ textAlign: 'left', fontSize: '18px' }}>Group Transactions by</span>
                    <TextField id="standard-basic" variant="standard" InputProps={{ disableUnderline: true }} sx={{ margin: '0px 0px 0px 20px', width: '100px', background: "#E9E9E9", borderRadius: '5px', input: { padding: "10px", color: '#146C94' } }} />
                  </Typography>

                  {/* Button- Group Transcations */}
                  <CardActions sx={{ alignItems: 'center', marginLeft: '10px' }}>
                    <Button variant="contained" sx={{ height: '50px', borderRadius: '15px', color: '#146C94', fontWeight: 'bold', backgroundColor: '#AFD3E2', '&:hover': { backgroundColor: '#AFD3E2FF' } }}>Group Transaction</Button>
                  </CardActions>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
                  {/* Typography- Assign Collector */}
                  <Typography gutterBottom variant="h6" style={{ textAlign: 'left', fontWeight: 'bold', margin: '0px 0px 10px 20px', color: '#146C94', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ textAlign: 'left', fontSize: '18px' }}>Assign to</span>
                  </Typography>

                  {/* Combo box- Assign Collector */}
                  <CardActions sx={{ alignItems: 'center', marginLeft: '10px' }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={collectorName}
                      size="small"
                      sx={{ width: 150, maxHeight: '200px', fontSize: '30px', margin: '0px 0px 0px 0px' }}
                      renderInput={(params) => <TextField {...params} InputProps={{
                        ...params.InputProps, disableUnderline: true, style: {
                          fontSize: "15px", backgroundColor: "#E9E9E9",
                          borderRadius: '5px', height: '50px', paddingLeft: '5px', margin: '0px 0px 10px 0px'
                        }
                      }}
                        variant="standard"
                      />}
                    />
                    {/* Button- Assign Collector */}
                    <Button variant="contained" sx={{ marginLeft: '20px', marginBottom: '11px', height: '50px', borderRadius: '15px', fontWeight: 'bold', color: '#146C94', backgroundColor: '#AFD3E2', '&:hover': { backgroundColor: '#AFD3E2FF' } }}>Assign / Reassign Collector</Button>
                  </CardActions>
                </div>
                {/* Button- Remove Collector */}
                <CardActions sx={{ alignItems: 'center', marginLeft: '10px', marginTop: '20px', marginBottom: '11px' }}>
                  <Button variant="contained" sx={{ marginLeft: '20px', height: '50px', borderRadius: '15px', color: 'white', fontWeight: 'bold', backgroundColor: '#E77D7D', '&:hover': { backgroundColor: '#E77D7DFF' } }}>Remove Collector</Button>
                </CardActions>
              </div>
              {/* Button- Data Grid Order */}
              <div style={{ marginTop: '15px', }}>
                <CollectorAssignment />
              </div>


            </Card>

          </ThemeProvider>
        </div>
      </div>
    </div>

  )
}