import styled from '@emotion/styled';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Dashboard', 'Logout'];

const distributorFromStorage = JSON.parse(localStorage.getItem("distributor")!);


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


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingsClick = (choice: string) => {
        console.log(choice)
        const objectId = distributorFromStorage.distributorid;
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
                                    <NameTypography>
                                        {distributorFromStorage.firstname + " " + distributorFromStorage.lastname}
                                    </NameTypography>
                                    <TypeTypography>
                                        Distributor
                                    </TypeTypography>
                                </div>
                                <Tooltip title='Open Profile'>
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
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
                                        <MenuItem>
                                            <Typography textAlign='center' onClick={() => handleSettingsClick(setting)}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppbarStyle>
            </header>
        </div>
    );
}