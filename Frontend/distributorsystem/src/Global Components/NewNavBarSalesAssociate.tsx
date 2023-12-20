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

{/** Styled list items in the drawer */}
const StyledListItem = styled(ListItem)({
    marginLeft:'-35px',
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


export default function NewNavBarDealer(props: navProps) {
    const navigate = useNavigate();
    const route = useLocation();
    {/** For Payments Drop Down */ }
    const [dropDownPayments, setDropDownPayments] = useState(false);
    const [dropDownProfiles, setDropDownProfiles] = useState(false);
    const [dropDownProducts, setDropDownProducts] = useState(false);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [selectedButton1, setSelectedButton1] = useState<number | null>(null);

    function handleDropDownPayments() {
        setDropDownPayments(!dropDownPayments);
        setDropDownProfiles(false);
        setDropDownProducts(false);
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

    const handleButtonClick =(buttonId:number)=>{
        setSelectedButton(buttonId===selectedButton ? buttonId : buttonId);

        if(buttonId === 7){
            localStorage.clear();
            navigate("/SignIn")
        }

            
    }
    const getIconColor = (buttonId: number): string => {
        return buttonId === selectedButton ? '#2D85E7' : '#FFFFFF';
    }
    const homeHandler=()=>{
        navigate(`/dealerOrderForm`)
       }
    return (
        <div>
            <Drawer open={true} variant="permanent">
                <ColorBox onMouseLeave={handleCloseDropDownList}>
                    <AppNameTypography><img src={logo7} style={{ height: '230px', width: '410px' }} /></AppNameTypography>
                    <List>
                        {/** Dealer Order Form */}
                        <Link to="/dealerOrderForm">
                            <StyledButton onClick={() => handleButtonClick(1)} selected={selectedButton === 1}  focusRipple>
                                <StyledListItem>
                                    <ListItemIcon sx={{ left: 200 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(1)} className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                                    </svg>
                                    </ListItemIcon>
                                    <StyledText selected={selectedButton===1} primary="Dealer Order Form" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>
                    </List>
                </ColorBox>
            </Drawer>
        </div>
    );
}