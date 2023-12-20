import { Box, Button, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from "@mui/material"

import { ExpandLess, ExpandMore, Height, StarBorder } from '@mui/icons-material/';
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "./logo.png"
import logo1 from ".Images/logo1.png"
import logo2 from ".Images/logo2.png"
import logo3 from ".Images/logo3.png"
import logo4 from "./Images/logo4.png"
import logo7 from "./Images/logo7.png"

{/** Functions for page routing */ }
type navProps = {
    moduleName: String;
}

interface StyledButtonProps {
    selected: boolean;
  }
interface StyledButtonProps1 {
    selected1: boolean;
}
  


{/** Styled box for background color of drawer */ }
const ColorBox = styled(Box)({
    background:'linear-gradient(to right bottom, #004AAD, #5DE0E6)',
    // backgroundColor:'#2D85E7',
    width: '80px',
    position:'fixed', 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100vh',
    transition:"ease-in-out 0.3s",
    overflow: 'hidden',
    ':hover': {
        width: '360px',
        height: '100vh',
    },
   
})

{/** Styled typo for app name */}
const AppNameTypography = styled(Typography)({
    marginTop: '-65px',
    marginBottom:'-70px' ,
    marginLeft: '-78%',
    marginRight:'-68%',
    alignItems:'center',
    fontFamily: 'Inter, Sans-serif',
    fontSize: '35px'
})


{/** Styled list items in the drawer */ }
const StyledListItem = styled(ListItem)({
    marginLeft: '-35px',
    marginBottom: 8,
})



const StyledButton = styled(Button)<StyledButtonProps>(({selected})=>({
    marginLeft: -1,
    width: 390,
    height:60,
    ':hover':{
        backgroundColor: 'rgb(135, 186, 243, 0.5)',
    },    
    backgroundColor: selected ? '#f5f5f5' : '',
    borderRadius: selected? '100px 0px 0px 100px': '0px 0px 0px 0px ',
}))
const StyledButton1 = styled(Button)<StyledButtonProps1>(({selected1})=>({
    marginLeft: -1,
    width: 390,
    height:60,
    ':hover':{
        backgroundColor: 'rgb(135, 186, 243, 0.5)',
    },    
    backgroundColor: selected1 ? '#f5f5f5' : '',
    borderRadius: selected1? '100px 0px 0px 100px': '0px 0px 0px 0px ',
}))
{/** Styled item labels in drawer */}
const StyledText = styled(ListItemText)<StyledButtonProps>(({selected})=>({
    marginTop: 10,
    marginLeft: 20,
    color: selected ? '#2D85E7':'#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Inclusive Sans, sans-serif',
    '& .MuiTypography-body1':{
        fontSize:'15px',
    },
    
}))
const StyledText1 = styled(ListItemText)<StyledButtonProps1>(({selected1})=>({
    marginTop: 10,
    marginLeft: 20,
    color: selected1 ? '#2D85E7':'#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Inclusive Sans, sans-serif',
    '& .MuiTypography-body1':{
        fontSize:'15px',
    },
    
}))

export default function NewNavBarCashier(props: navProps) {
    const navigate = useNavigate();
    const route = useLocation();
    {/** For Payments Drop Down */ }
    const [dropDownPayments, setDropDownPayments] = useState(false);
    const [dropDownProfiles, setDropDownProfiles] = useState(false);
    const [dropDownProducts, setDropDownProducts] = useState(false);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [selectedButton1, setSelectedButton1] = useState<number | null>(null);

    const handleButtonClick =(buttonId:number)=>{
        setSelectedButton(buttonId===selectedButton ? buttonId : buttonId);
    
        if(buttonId === 7){
            localStorage.clear();
            navigate("/SignIn")
        }
    
            
    }
    const handleButtonClick1 =(buttonId1:number)=>{
        setSelectedButton1(buttonId1===selectedButton1 ? null : buttonId1);
    }
    
    
    function handleDropDownPayments() {
        setDropDownPayments(!dropDownPayments);
        setDropDownProfiles(false);
        setDropDownProducts(false);
        handleButtonClick(2)
    }

    {/** For Products Drop Down */ }
    function handleDropDownProducts() {
        setDropDownProducts(!dropDownProducts);
        setDropDownProfiles(false);
        setDropDownPayments(false);
    }
    const handleCloseDropDownList = () => {
        setDropDownProfiles(false);
        setDropDownPayments(false);
        setDropDownProducts(false);
    }
    const getIconColor = (buttonId: number): string => {
        return buttonId === selectedButton ? '#2D85E7' : '#FFFFFF';
    }
    const homeHandler=()=>{
        navigate(`/cashierDashboard`)
       }

    return (
        <div>
            <Drawer open={true} variant="permanent">
                <ColorBox onMouseLeave={handleCloseDropDownList}>
                    <AppNameTypography><img src={logo7} onClick={homeHandler} style={{ cursor:'pointer',height: '230px', width: 'auto' }} /></AppNameTypography>
                    <List>
                        {/** Home */}
                        <Link to="/cashierDashboard">
                            <StyledButton onClick={() => handleButtonClick(1)} selected={selectedButton === 1} focusRipple>
                                <StyledListItem>
                                    <ListItemIcon sx={{ left: 200 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(1)} className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText selected={selectedButton===1} primary="Home" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Payments */}
                        <StyledButton onClick={handleDropDownPayments} selected={selectedButton===2}>
                            <StyledListItem>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(2)} className="w-6 h-6" style={{marginLeft: 23, width: 25, height: 25}}>
                                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                                    </svg>
                                </ListItemIcon>
                                <StyledText selected={selectedButton===2}  primary="Payments" />
                                {dropDownPayments ? <ExpandLess sx={{fill: '#FFFFFF'}}/> : <ExpandMore sx={{fill: '#FFFFFF'}}/>}
                            </StyledListItem>
                        </StyledButton>
                        <Collapse in={dropDownPayments} timeout="auto" unmountOnExit>
                            <List>
                                <Link to="/paymentList">
                                <StyledButton1 onClick={() => handleButtonClick1(1)} selected1={selectedButton1 === 1}>
                                        <StyledText1 selected1={selectedButton1===1} sx={{marginLeft: -9}} primary="Payment List"/>
                                    </StyledButton1>
                                </Link>
                                <Link to="/recordDirectPayment">
                                    <StyledButton1 onClick={() => handleButtonClick1(2)} selected1={selectedButton1 === 2} >
                                        <StyledText1 selected1={selectedButton1===2} sx={{marginLeft: 2}} primary="Record Direct Payment"/>
                                    </StyledButton1>
                                </Link> 
                            </List>
                        </Collapse>
                    </List>
                </ColorBox>
            </Drawer>
        </div>
    );
}