import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: '#333',
        color: '#fff',
    },
    drawerContainer: {
        overflow: 'auto',
        padding: '16px', // Adjust the value as needed
    },
    listItem: {
        marginBottom: '8px', // Adjust the value as needed
    },
    logoutButton: {
        marginTop: 'auto',
        backgroundColor: '#f44336',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#d32f2f',
        },
    },
}));

const SideNav = () => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button component={Link} to="/dashboard" className={classes.listItem}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile" className={classes.listItem}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/users" className={classes.listItem}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button component={Link} to="/users/category" className={classes.listItem}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users Category" />
                    </ListItem>
                    <ListItem button component={Link} to="/projects" className={classes.listItem}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItem>
                </List>
                <Divider />
                <Button
                    className={classes.logoutButton}
                    variant="contained"
                    startIcon={<AccountCircleIcon />}
                    onClick={() => {
                        // Handle logout functionality
                        // For example, clear local storage and navigate to the login page
                        localStorage.clear();
                        window.location.href = '/LoginForm'; // Assuming the login page route is '/login'
                    }}
                >
                    Logout
                </Button>
            </div>
        </Drawer>
    );
};

export default SideNav;
