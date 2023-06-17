import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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



const TeamMemberSideNav = () => {

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
                    <ListItem button component={Link} to="/profileTeamMember" className={classes.listItem}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/TeamMemberProjects" className={classes.listItem}>
                        <ListItemIcon>
                            <AccountCircleIcon />
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
    )
}

export default TeamMemberSideNav