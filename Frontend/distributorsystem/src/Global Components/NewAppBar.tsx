import styled from '@emotion/styled';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import profilepicture from "../Global Components/Images/profilepicture.png"
import { IDealerDocument, IDistributorDocument, IEmployeeDocument } from '../RestCalls/Interfaces';
import axios from 'axios';
const settings = ['Profile', 'Dashboard', 'Logout'];
const dealerSettings = ['Profile', 'Logout'];
const employeeSettings = ['Profile', 'Dashboard', 'Logout'];
const userFromStorage = JSON.parse(localStorage.getItem("user")!);


type navProps = {
    moduleName: string;
    moduleContent: string
}

const AppbarStyle = styled(AppBar)({
    height: 80,
    backgroundColor: ' rgba(255, 255, 255, 0.3)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '0px solid rgba(255, 255, 255, 0.7)'
})

const NavNameTypography = styled(Typography)({
    color: '#203949',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 23
})

const NavContentTypography = styled(Typography)({
    color: '#203949',
    textAlign: 'left',
    fontSize: 12,
})

const NameTypography = styled(Typography)({
    color: '#203949',
    textAlign: 'right',
    fontWeight: '550',
    marginRight: 13
})
const TypeTypography = styled(Typography)({
    color: '#203949',
    textAlign: 'right',
    fontSize: 12,
    marginRight: 16
})



export default function NewAppBar(props: navProps) {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [employeeDocuments, setEmployeeDocuments] = useState<IEmployeeDocument[]>([]);
    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);
    const [distributorDocuments, setDistributorDocuments] = useState<IDistributorDocument[]>([]);
    const { objectId } = useParams();

    function getAllDistributorDocuments() {
        axios.get<IDistributorDocument[]>(`http://localhost:8080/distributorDocument/findAllDocumentsByDistributorId/${userFromStorage.distributor!.distributorid}`)
            .then((response) => {
                setDistributorDocuments(response.data);
            })
            .catch((error) => {


            });
    };

    function getAllDealerDocuments() {
        axios.get<IDealerDocument[]>(`http://localhost:8080/dealerdocument/findAllDocumentsByDealerId/${userFromStorage.dealer!.dealerid}`)
            .then((response) => {
                setDealerDocuments(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving dealer documents. Please try again.");
            });
    };

    function getAllEmployeeDocuments() {
        if (userFromStorage && userFromStorage.tableName === 'Sales Associate and Cashier') {
            axios.get<IEmployeeDocument[]>(`http://localhost:8080/employeeDocument/findAllDocumentsByEmployeeId/${userFromStorage.salesAssociateAndCashier!.employeeid}`)
                .then((response) => {
                    setEmployeeDocuments(response.data);
                })
                .catch((error) => {


                });
        }
        else if (userFromStorage && userFromStorage.tableName === 'Cashier') {
            axios.get<IEmployeeDocument[]>(`http://localhost:8080/employeeDocument/findAllDocumentsByEmployeeId/${userFromStorage.cashier!.employeeid}`)
                .then((response) => {
                    setEmployeeDocuments(response.data);
                })
                .catch((error) => {


                });
        }
        else if (userFromStorage && userFromStorage.tableName === 'Sales Associate') {
            axios.get<IEmployeeDocument[]>(`http://localhost:8080/employeeDocument/findAllDocumentsByEmployeeId/${userFromStorage.salesAssociate!.employeeid}`)
                .then((response) => {
                    setEmployeeDocuments(response.data);
                })
                .catch((error) => {


                });
        }
    };

    useEffect(() => {
        if (userFromStorage && userFromStorage.tableName === 'Sales Associate and Cashier') {
            if (userFromStorage.salesAssociateAndCashier.employeeid !== null) {
                getAllEmployeeDocuments();
            }
        }
        else if (userFromStorage && userFromStorage.tableName === 'Cashier') {
            if (userFromStorage.cashier.employeeid !== null) {
                getAllEmployeeDocuments();
            }
        }
        else if (userFromStorage && userFromStorage.tableName === 'Sales Associate') {
            if (userFromStorage.salesAssociate.employeeid !== null) {
                getAllEmployeeDocuments();
            }
        }
        else if (userFromStorage && userFromStorage.tableName === 'Dealer') {
            getAllDealerDocuments();
        }
        else if (userFromStorage && userFromStorage.tableName === 'Distributor'){
            getAllDistributorDocuments();
        }

    }, [objectId, employeeDocuments, dealerDocuments, distributorDocuments]);
    //ilisanan ngari para sa each userfromstorage
    const getProfilePic = (tableName: string) => {
        const profilePic = employeeDocuments.find(image => image.name === userFromStorage[tableName]?.lastname + '_profilepicture');

        if (profilePic && profilePic.type && profilePic.content) {
            return `data:${profilePic.type} ;base64,${profilePic.content}`;
        }

        return profilepicture;

    }

    const distributorProfilePic = distributorDocuments.find(image => image.name === userFromStorage.distributor.lastname + '_profilepicture');
    const distributorImageSource = distributorProfilePic ? `data:${distributorProfilePic?.type} ;base64,${distributorProfilePic?.content}`
        : profilepicture

    const dealerProfilePic = dealerDocuments.find(image => image.name === userFromStorage.dealer.lastname + '_profilepicture');
    const dealerImageSource = dealerProfilePic ? `data:${dealerProfilePic?.type} ;base64,${dealerProfilePic?.content}`
        : profilepicture

    const bothImageSource = getProfilePic('salesAssociateAndCashier')

    const salesAssociateImageSource = getProfilePic('salesAssociate')

    const cashierImageSource = getProfilePic('cashier')


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingsClick = (choice: string) => {
        console.log(choice)
        const objectId = userFromStorage.distributor.distributorid;
        if (choice === 'Dashboard')
            navigate("/dashboard")
        else if (choice === 'Profile') {
            navigate(`/distributorProfileDetails/${objectId}`)
            console.log("hey");
        }
        else {
            localStorage.clear();
            navigate("/SignIn")
        }
    }
    const handleSettingsClickDealer = (choice: string) => {
        console.log(choice)
        const objectId = userFromStorage.dealer.dealerid;
        if (choice === 'Profile') {
            navigate(`/dealerProfileDetails/${objectId}`)
            console.log("hey");
        }
        else {
            localStorage.clear();
            navigate("/SignIn")
        }
    }
    const handleSettingsClickCashier = (choice: string) => {
        console.log(choice)
        const objectId = userFromStorage.cashier.employeeid;
        if (choice === 'Dashboard')
            navigate("/cashierDashboard")
        else if (choice === 'Profile') {
            navigate(`/employeeProfileDetails/${objectId}`)
            console.log("cashier");
        }
        else {
            localStorage.clear();
            navigate("/SignIn")
        }
    }
    const handleSettingsClickSales = (choice: string) => {
        console.log(choice)
        const objectId = userFromStorage.salesAssociate.employeeid;
        if (choice === 'Dashboard')
            navigate("/salesAssociateDashboard")
        else if (choice === 'Profile') {
            navigate(`/employeeProfileDetails/${objectId}`)
            console.log("sales");
        }
        else {
            localStorage.clear();
            navigate("/SignIn")
        }
    }
    const handleSettingsClickBoth = (choice: string) => {
        console.log(choice)
        const objectId = userFromStorage.salesAssociateAndCashier.employeeid;
        if (choice === 'Dashboard')
            navigate("/sales&cashierDashboard")
        else if (choice === 'Profile') {
            navigate(`/employeeProfileDetails/${objectId}`)
            console.log("cashier");
        }
        else {
            localStorage.clear();
            navigate("/SignIn")
        }
    }
    return (
        <div>
            <header>
                <AppbarStyle>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{ flexGrow: 2.5, marginLeft: 15, paddingTop: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <NavNameTypography>
                                        {props.moduleName}
                                    </NavNameTypography>
                                    <NavContentTypography>
                                        {props.moduleContent}
                                    </NavContentTypography>
                                </div>
                            </Box>
                            <Box sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' }, paddingTop: 1 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
                                    {userFromStorage && userFromStorage!.tableName === "Distributor" && (
                                        <NameTypography>
                                            {userFromStorage.distributor.firstname + " " + userFromStorage.distributor.lastname}
                                        </NameTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Dealer" && (
                                        <NameTypography>
                                            {userFromStorage.dealer.firstname + " " + userFromStorage.dealer.lastname}
                                        </NameTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Sales Associate" && (
                                        <NameTypography>
                                            {userFromStorage.salesAssociate.firstname + " " + userFromStorage.salesAssociate.lastname}
                                        </NameTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Cashier" && (
                                        <NameTypography>
                                            {userFromStorage.cashier.firstname + " " + userFromStorage.cashier.lastname}
                                        </NameTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Sales Associate and Cashier" && (
                                        <NameTypography>
                                            {userFromStorage.salesAssociateAndCashier.firstname + " " + userFromStorage.salesAssociateAndCashier.lastname}
                                        </NameTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Distributor" && (
                                        <TypeTypography>
                                            Distributor
                                        </TypeTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Dealer" && (
                                        <TypeTypography>
                                            Dealer
                                        </TypeTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Sales Associate" && (
                                        <TypeTypography>
                                            Sales Associate
                                        </TypeTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Cashier" && (
                                        <TypeTypography>
                                            Cashier
                                        </TypeTypography>
                                    )}
                                    {userFromStorage && userFromStorage!.tableName === "Sales Associate and Cashier" && (
                                        <TypeTypography>
                                            Sales Associate and Cashier
                                        </TypeTypography>
                                    )}
                                    {/* {userFromStorage.distributor.firstname + " " + userFromStorage.distributor.lastname}
                                     */}

                                </div>
                                <Tooltip title='Open Profile'>
                                    <IconButton onClick={handleOpenUserMenu}>
                                        {userFromStorage && userFromStorage!.tableName == 'Sales Associate and Cashier' && (
                                            <Avatar alt={userFromStorage.salesAssociateAndCashier.firstname+" "+userFromStorage.salesAssociateAndCashier.lastname} src={bothImageSource} />
                                        )}
                                        {userFromStorage && userFromStorage!.tableName == 'Sales Associate' && (
                                            <Avatar alt={userFromStorage.salesAssociate.firstname+" "+userFromStorage.salesAssociate.lastname} src={salesAssociateImageSource} />
                                        )}
                                        {userFromStorage && userFromStorage!.tableName == 'Cashier' && (
                                            <Avatar alt={userFromStorage.cashier.firstname+" "+userFromStorage.cashier.lastname} src={cashierImageSource} />
                                        )}
                                        {userFromStorage && userFromStorage!.tableName == 'Dealer' && (
                                            <Avatar alt={userFromStorage.dealer.firstname+" "+userFromStorage.dealer.lastname} src={dealerImageSource} />
                                        )}
                                         {userFromStorage && userFromStorage!.tableName == 'Distributor' && (
                                            <Avatar alt={userFromStorage.distributor.firstname+" "+userFromStorage.distributor.lastname} src={distributorImageSource} />
                                        )}
                                    </IconButton>
                                </Tooltip>
                                {userFromStorage && userFromStorage!.tableName === "Distributor" && (
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        {settings.map((setting) => (
                                            <MenuItem onClick={() => handleSettingsClick(setting)}>
                                                <NameTypography>
                                                    <Typography textAlign='center'>{setting}</Typography>
                                                </NameTypography>
                                            </MenuItem>

                                        ))}
                                    </Menu>
                                )}

                                {userFromStorage && userFromStorage!.tableName === "Dealer" && (
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        {dealerSettings.map((setting) => (
                                            <MenuItem onClick={() => handleSettingsClickDealer(setting)}>
                                                <Typography textAlign='center'>{setting}</Typography>
                                            </MenuItem>

                                        ))}
                                    </Menu>
                                )}
                                {userFromStorage && userFromStorage!.tableName === "Sales Associate" && (
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        {employeeSettings.map((setting) => (
                                            <MenuItem onClick={() => handleSettingsClickSales(setting)}>
                                                <NameTypography>
                                                    <Typography textAlign='center'>{setting}</Typography>
                                                </NameTypography>
                                            </MenuItem>

                                        ))}
                                    </Menu>
                                )}
                                {userFromStorage && userFromStorage!.tableName === "Sales Associate and Cashier" && (
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        {employeeSettings.map((setting) => (
                                            <MenuItem onClick={() => handleSettingsClickBoth(setting)}>
                                                <NameTypography>
                                                    <Typography textAlign='center'>{setting}</Typography>
                                                </NameTypography>
                                            </MenuItem>

                                        ))}
                                    </Menu>
                                )}
                                {userFromStorage && userFromStorage!.tableName === "Cashier" && (
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        {employeeSettings.map((setting) => (
                                            <MenuItem onClick={() => handleSettingsClickCashier(setting)}>
                                                <NameTypography>
                                                    <Typography textAlign='center'>{setting}</Typography>
                                                </NameTypography>
                                            </MenuItem>

                                        ))}
                                    </Menu>
                                )}









                            </Box>
                        </Toolbar>
                    </Container>
                </AppbarStyle>
            </header>
        </div>
    );
}