import { Box, Button, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from "@mui/material"

import { ExpandLess, ExpandMore, Height, StarBorder } from '@mui/icons-material/';
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
// import logo from "./logo.png"
import logo1 from ".Images/logo1.png"
import logo2 from ".Images/logo2.png"
import logo3 from ".Images/logo3.png"
import logo4 from "./Images/logo4.png"

{/** Functions for page routing */ }
type navProps = {
    moduleName: String;
}



{/** Styled box for background color of drawer */ }
const ColorBox = styled(Box)({
    backgroundColor: "#2D85E7",
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    height: '1000%',
    transition: "ease-in-out 0.3s",
    overflow: 'hidden',
    ':hover': {
        width: '360px',
        height: '1000%',
    }
})

{/** Styled typo for app name */ }
const AppNameTypography = styled(Typography)({
    marginTop: '-30px',
    marginBottom: '-80px',
    marginLeft: '-59.5%',
    marginRight: '-55%',
    alignItems: 'center',
    fontFamily: 'Inter, Sans-serif',
    fontSize: '35px'
})
{/** Styled item labels in drawer */ }
const StyledText = styled(ListItemText)({
    marginTop: 10,
    marginLeft: 20,
    color: '#FFFFFF',
    fontSize: '20px',
    fontFamily: 'Inclusive Sans, sans-serif',
    ':hover': {
        opacity: 1,
    },
    '& .MuiTypography-body1': {
        fontSize: '15px',
    },

})

{/** Styled list items in the drawer */ }
const StyledListItem = styled(ListItem)({
    marginBottom: 8,
})

const StyledButton = styled(Button)({
    marginLeft: -19,
    width: 390,
    height: 60,
    ':hover': {
        backgroundColor: '#87BAF3',
    }
})


export default function NewNavBarSalesAssociate(props: navProps) {
    const route = useLocation();
    {/** For Payments Drop Down */ }
    const [dropDownPayments, setDropDownPayments] = useState(false);
    const [dropDownProfiles, setDropDownProfiles] = useState(false);
    const [dropDownProducts, setDropDownProducts] = useState(false);

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


    return (
        <div>
            <Drawer open={true} variant="permanent">
                <ColorBox onMouseLeave={handleCloseDropDownList}>
                    <AppNameTypography><img src={logo4} style={{ height: '230px', width: '410px' }} /></AppNameTypography>
                    <List>
                        {/** Home */}
                        <Link to="/dashboard">
                            <StyledButton focusRipple>
                                <StyledListItem>
                                    <ListItemIcon sx={{ left: 200 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText primary="Home" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Employee Profile */}
                        <Link to="/employeeProfile">
                            <StyledButton focusRipple>
                                <StyledListItem>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText primary="Employee Profile" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Products */}
                        <StyledButton onClick={handleDropDownProducts}>
                            <StyledListItem>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                                    </svg>
                                </ListItemIcon>
                                <StyledText primary="Products" />
                                {dropDownProducts ? <ExpandLess sx={{ fill: '#FFFFFF' }} /> : <ExpandMore sx={{ fill: '#FFFFFF' }} />}
                            </StyledListItem>
                        </StyledButton>
                        <Collapse in={dropDownProducts} timeout="auto" unmountOnExit>
                            <List>
                                <Link to="/productDistributionList">
                                    <StyledButton>
                                        <StyledText sx={{ marginLeft: 10 }} primary="Product Distribution List" />
                                    </StyledButton>
                                </Link>
                                <Link to="/distributorOrderForm">
                                    <StyledButton>
                                        <StyledText sx={{ marginLeft: 9 }} primary="Distributor Order Form" />
                                    </StyledButton>
                                </Link>
                            </List>
                        </Collapse>

                        {/** Collector Assignment */}
                        <Link to="/collectorAssignment">
                            <StyledButton>
                                <StyledListItem>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6" style={{ marginLeft: 23, width: 25, height: 25 }}>
                                            <path d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                                            <path d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clipRule="evenodd" />
                                        </svg>
                                    </ListItemIcon>
                                    <StyledText primary="Collector Assignment" />
                                </StyledListItem>
                            </StyledButton>
                        </Link>

                        {/** Schedule */}
                        <Link to="/schedules/null">
                        <StyledButton>
                            <StyledListItem>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF" className="w-6 h-6" style={{marginLeft: 23, width: 25, height: 25}}>
                                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                                        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                    </svg>
                                </ListItemIcon>
                                <StyledText primary="Schedule" />
                            </StyledListItem>
                        </StyledButton>
                        </Link>
                    </List>
                </ColorBox>
            </Drawer>
        </div>
    );
}