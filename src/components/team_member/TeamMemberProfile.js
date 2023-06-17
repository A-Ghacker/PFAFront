import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Business from '@mui/icons-material/Business';
import Lock from '@mui/icons-material/Lock';   

const TeamMemberProfile = () => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                console.log('Fetched user:', response.data); // Check the fetched user data
                if (response && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}
        >
            <Grid
                item
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    padding: 24,
                }}
            >
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    User Profile
                </Typography>

                <Grid container justifyContent="center" style={{ marginTop: 24 }}>
                    <Avatar alt="User Avatar" src="/path/to/avatar.png" style={{ width: 150, height: 150 }} />
                </Grid>

                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Profile Information
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <PersonIcon /> ID: {user._id}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    <PersonIcon /> Name: {user.name}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <Email /> Email: {user.email}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <Phone /> Phone Number: {user.phoneNumber}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <Business /> Organization: {user.organization}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <HowToRegIcon /> Role: {user.role}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <ConstructionIcon /> Permissions: {user.permissions}
                </Typography>


                <Typography variant="body1" component="p" gutterBottom>
                    <Lock /> Password: ************
                </Typography>



            </Grid>
        </Grid>
    );
}


export default TeamMemberProfile