import {
    AppBar,
    Box, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, MenuItem,
    Typography, Button, Stack, Container, Grid, Paper
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, router } from "@inertiajs/react";

const drawerWidth = 240;

function Sidebar({ user, header, children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {user.roles[0].name === "admin" && (<ListItem disablePadding>
                    <ListItemButton component={Link} href={route('admin.dashboard')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>)}
                {user.roles[0].name === "admin" && (<ListItem disablePadding>
                    <ListItemButton component={Link} href={route('admin.service.index')}>
                        <ListItemIcon>
                            <MailIcon />
                     </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItemButton>
                </ListItem>)}
                {user.roles[0].name === "admin" && (<ListItem disablePadding>
                    <ListItemButton component={Link} href={route('admin.employee.index')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Employees" />
                    </ListItemButton>
                </ListItem>)}
                {(user.roles[0].name === "admin" || user.roles[0].name === "employee") && (<ListItem disablePadding>
                    <ListItemButton component={Link} href="#">
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Appointments" />
                    </ListItemButton>
                </ListItem>)}
            </List>
        </div>
    );

    // profile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user.roles[0].name === "employee" && (
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        router.get(route('employee.profile'));
                    }}
                >
                    Profile
                </MenuItem>)
            }
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    router.post(route('logout'));
                }}
            >
                Log Out
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: "100%"},
                    zIndex: {sm: 1300, xs: 1100}
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" noWrap component="div">
                        Booking system
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Box sx={{display: "flex", alignItems:"center"}}>
                            <Button
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                <AccountCircle />
                                <Typography noWrap component="div" sx={{textDecoration: "none"}}>
                                    {user.name}
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box width={'100%'} justifyContent={'center'} p={2}>
                <Toolbar />
                <Paper elevation={1}>
                    <Grid item xs={12} md={12} p={2} bgcolor={'#f3f4f6'}>
                        <Typography variant="h6" noWrap component="div">
                            {header}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} p={2}>
                        {children}
                    </Grid>
                </Paper>
                <Grid container justifyContent='left' alignItems='center'>

                </Grid>
            </Box>
        </Box>
    );
}

export default Sidebar;
