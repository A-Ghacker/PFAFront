import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Business from '@mui/icons-material/Business';
import Lock from '@mui/icons-material/Lock';    



const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
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

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/update/${userId}`, user);
            console.log('Response:', response.data); // Check the response data
            setUser((prevUser) => ({ ...prevUser, ...response.data }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    let roleText = '';
    if (user.role === '0') {
        roleText = 'Administrator';
    } else if (user.role === '1') {
        roleText = 'Project Management';
    } else if (user.role === '2') {
        roleText = 'Team Member';
    } else if (user.role === '3') {
        roleText = 'Client';
    }

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
                    <HowToRegIcon /> Role: {roleText}
                </Typography>

                <Typography variant="body1" component="p" gutterBottom>
                    <ConstructionIcon /> Permissions: {user.permissions}
                </Typography>

                {isEditing ? (
                    <>
                        <TextField
                            label="New Name"
                            defaultValue={user.name}
                            onChange={(event) => setUser({ ...user, name: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="New Email"
                            defaultValue={user.email}
                            onChange={(event) => setUser({ ...user, email: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="New Phone Number"
                            defaultValue={user.phoneNumber}
                            onChange={(event) => setUser({ ...user, phoneNumber: event.target.value })}
                            fullWidth
                            margin="normal"
                        />
                    </>
                ) : (
                    <Typography variant="body1" component="p" gutterBottom>
                            <Lock /> Password: ************
                    </Typography>
                )}

                {isEditing ? (
                    <Button variant="contained" color="primary" onClick={handleSaveProfile} fullWidth>
                        Save Profile
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleEditProfile} fullWidth>
                        Edit Profile
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default ProfilePage;
