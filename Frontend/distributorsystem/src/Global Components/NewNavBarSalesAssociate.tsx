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
    background: 'linear-gradient(to right bottom, #004AAD, #5DE0E6)',
    // backgroundColor:'#2D85E7',
    width: '80px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    transition: "ease-in-out 0.3s",
    overflow: 'hidden',
    ':hover': {
        width: '360px',
        height: '100vh',
    },

})

{/** Styled typo for app name */ }
const AppNameTypography = styled(Typography)({
    marginTop: '-65px',
    marginBottom: '-70px',
    marginLeft: '-78%',
    marginRight: '-68%',
    alignItems: 'center',
    fontFamily: 'Inter, Sans-serif',
    fontSize: '35px'
})
{/** Styled item labels in drawer */ }
const StyledText = styled(ListItemText)<StyledButtonProps>(({ selected }) => ({
    marginTop: 10,
    marginLeft: 20,
    color: selected ? '#2D85E7' : '#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Inclusive Sans, sans-serif',
    '& .MuiTypography-body1': {
        fontSize: '15px',
    },

}))

{/** Styled list items in the drawer */ }
const StyledListItem = styled(ListItem)({
    marginLeft: '-35px',
    marginBottom: 8,
})


const StyledButton = styled(Button)<StyledButtonProps>(({ selected }) => ({
    marginLeft: -1,
    width: 390,
    height: 60,
    ':hover': {
        backgroundColor: 'rgb(135, 186, 243, 0.5)',
    },
    backgroundColor: selected ? '#f5f5f5' : '',
    borderRadius: selected ? '100px 0px 0px 100px' : '0px 0px 0px 0px ',
}))
const StyledButton1 = styled(Button)<StyledButtonProps1>(({ selected1 }) => ({
    marginLeft: -1,
    width: 390,
    height: 60,
    ':hover': {
        backgroundColor: 'rgb(135, 186, 243, 0.5)',
    },
    backgroundColor: selected1 ? '#f5f5f5' : '',
    borderRadius: selected1 ? '100px 0px 0px 100px' : '0px 0px 0px 0px ',
}))
{/** Styled item labels in drawer */ }

const StyledText1 = styled(ListItemText)<StyledButtonProps1>(({ selected1 }) => ({
    marginTop: 10,
    marginLeft: 20,
    color: selected1 ? '#2D85E7' : '#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Inclusive Sans, sans-serif',
    '& .MuiTypography-body1': {
        fontSize: '15px',
    },

}))


export default function NewNavBarSalesAssociate(props: navProps) {
    const route = useLocation();
    const navigate = useNavigate();
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
    const getIconColor = (buttonId: number): string => {
        return buttonId === selectedButton ? '#2D85E7' : '#FFFFFF';
    }

    {/** For Products Drop Down */ }
    function handleDropDownProducts() {
        setDropDownProducts(!dropDownProducts);
        setDropDownProfiles(false);
        setDropDownPayments(false);
        handleButtonClick(2)
    }
    const handleCloseDropDownList = () => {
        setDropDownProfiles(false);
        setDropDownPayments(false);
        setDropDownProducts(false);
    }
    const handleButtonClick = (buttonId: number) => {
        setSelectedButton(buttonId === selectedButton ? buttonId : buttonId);

    }
    const handleButtonClick1 = (buttonId1: number) => {
        setSelectedButton1(buttonId1 === selectedButton1 ? null : buttonId1);
    }
    const homeHandler=()=>{
        navigate(`/salesAssociateDashboard`)
       }
    return (
        <div>
            <Drawer open={true} variant="permanent">
                <ColorBox onMouseLeave={handleCloseDropDownList}>
                    <AppNameTypography><img src={logo7} onClick={homeHandler} style={{cursor:'pointer', height: '230px', width: 'auto' }} /></AppNameTypography>
                    <List>
                        {/** Home */}
                        <Link to="/salesAssociateDashboard">
                            <StyledButton onClick={() => handleButtonClick(1)} selected={selectedButton === 1} focusRipple>
                                <StyledListItem>
                                    <ListItemIcon sx={{ left: 200 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(1)} className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText selected={selectedButton === 1} primary="Home" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Products */}
                        <StyledButton selected={selectedButton === 2}onClick={handleDropDownProducts}>
                            <StyledListItem>
                                <ListItemIcon>
                                    <svg xmlns="http://ww w.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(2)} className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                                    </svg>
                                </ListItemIcon>
                                <StyledText selected={selectedButton === 2} primary="Products" />
                                {dropDownProducts ? <ExpandLess sx={{ fill: '#FFFFFF' }} /> : <ExpandMore sx={{ fill: '#FFFFFF' }} />}
                            </StyledListItem>
                        </StyledButton>
                        <Collapse in={dropDownProducts} timeout="auto" unmountOnExit>
                            <List>
                                <Link to="/productDistributionList">
                                    <StyledButton1 onClick={() => handleButtonClick1(1)} selected1={selectedButton1 === 1}>
                                        <StyledText1 selected1={selectedButton1 === 1} sx={{ marginLeft: 5 }} primary="Product Distribution List" />
                                    </StyledButton1>
                                </Link>
                                <Link to="/distributorOrderForm">
                                    <StyledButton1 onClick={() => handleButtonClick1(2)} selected1={selectedButton1 === 2}>
                                        <StyledText1 selected1={selectedButton1 === 2} sx={{ marginLeft: 3 }} primary="Distributor Order Form" />
                                    </StyledButton1>
                                </Link>
                            </List>
                        </Collapse>

                        {/** Collector Assignment */}
                        <Link to="/collectorAssignment">
                            <StyledButton onClick={() => handleButtonClick(3)} selected={selectedButton === 3} >
                                <StyledListItem>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(3)} className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                                            <path d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clipRule="evenodd" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText selected={selectedButton === 3} primary="Collector Assignment" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Schedule */}
                        <Link to="/schedules/null">
                        <StyledButton  onClick={() => handleButtonClick(4)} selected={selectedButton === 4} >
                            <StyledListItem>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={getIconColor(4)} className="w-6 h-6" style={{marginLeft: 23, width: 25, height: 25}}>
                                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                    </svg>
                                </ListItemIcon>
                                <StyledText selected={selectedButton === 4} primary="Schedule" />
                            </StyledListItem>
                        </StyledButton>
                        </Link>
                    </List>
                </ColorBox>
            </Drawer>
        </div>
    );
}