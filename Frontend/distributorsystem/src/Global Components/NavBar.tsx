import * as React from 'react';
import { AppBar, Typography, Box, Toolbar, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';

type navProps = {
  moduleName: string;
}
//** Function here*/
export default function NavBar(props: navProps) {
  const [isOpen, setOpen] = useState(false); // State for opening navbar
  const location = useLocation(); // State for locating route's path
  //const navigate = useNavigate();

  //Closing Navbar when switching to another page
  useEffect(() => {
    setOpen(false);
  },
    [location]);

  //** Return Statement*/  
  return (
    // Box for Header Nav
    <Box sx={{ flexGrow: 1, bgcolor: "#156D94" }}>
      <AppBar position="static" sx={{ bgcolor: "#156D94" }}>
        <Toolbar>
          {/* Icon Button for Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}>
            <MenuIcon/>
          </IconButton>
          {/* Typography for Nav Title Module name/ Page name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: "bold" }}>
            {props.moduleName}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar Drawer */}
      <Drawer anchor='left' open={isOpen} onClose={() => setOpen(false)} >
        <Box sx={{ backgroundColor: "#146C94", width: '400px', display: 'flex', flexDirection: 'column', height: '100%' }} role='presentation'>
          <Box p={2} display="flex" alignItems="center" justifyContent="space-between">

            {/* Typography for Menu Title Module name or Page name */}
            <Typography variant='h6' component='div' sx={{ fontSize: '20px', fontWeight: "bold", color: "#FFFFFF", marginLeft: 'auto' }}>
              {props.moduleName}
            </Typography>

            {/* Icon Button for Arrow Back to Close sidebar */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mx: 'auto', alignItems: 'right' }}
              onClick={() => setOpen(false)}
            >
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          {/* Route Here for your Page */}
          {/*Box for Pages*/}
          <Box sx={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Link to="/dashboard"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Dashboard</Button></Link>

            <Link to="/dealerRegistration"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Dealer Registration</Button></Link>

            <Link to="/assignmentCollector"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Collector Assignment</Button></Link>

            <Link to="/schedules"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Payment Transaction Schedules</Button></Link>
            
            <Link to="/orderTransactionDetails"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Order Transaction Details</Button></Link>
            
            <Link to="/paymentList"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Payment List</Button></Link>
            
            <Link to="/recordDirectPayment"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Record Direct Payment</Button></Link>
           
            <Link to="/distributorOrderForm"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Product Distribution Form - Distributor </Button></Link>
            
            <Link to="/dealerApproval"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Dealer Approval </Button></Link>
            
           <Link to="/dealerProfile"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Dealer Profile </Button></Link>
           
           <Link to="/employeeRegistration"><Button sx={{ backgroundColor: 'rgba(19, 71, 95, 0.1)', fontWeight: 'bold', color: '#FFFFFF', height: '80px', width: '100%', '&:hover': { backgroundColor: '#13475F' } }}>Employee Registration</Button></Link>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

