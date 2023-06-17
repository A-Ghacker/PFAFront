import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Typography,
    TextField,
    Button,
    Modal,
    MenuItem,
    Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DataGrid } from '@mui/x-data-grid';

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #ddd;
    }
    &:hover fieldset {
      border-color: #aaa;
    }
    &.Mui-focused fieldset {
      border-color: #555;
    }
  }
  .MuiOutlinedInput-input {
    padding: 10px;
  }
  .MuiInputLabel-outlined {
    transform: translate(14px, 12px) scale(1);
    pointer-events: none;
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
  }
  margin-bottom: 10px;
  width: 100%;

  & + & {
    margin-top: 10px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1976d2;
  color: #fff;
  &:hover {
    background-color: #1565c0;
  }
`;

const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  background-color: #fff;
`;

const UserListComponent = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        organization: '',
        role: '',
    });
    const { name, email, password, phoneNumber, role } = formData;
    const [usersCategory, setUsersCategory] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                const usersWithId = response.data.map((user) => ({ ...user, id: uuidv4() }));
                setUsers(usersWithId);
                setFilteredUsers(usersWithId);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchUsersCategory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/employeeCategory/${userId}`
                );
                setUsersCategory(response.data);
            } catch (error) {
                console.error('Error fetching users category:', error);
            }
        };

        fetchUsers();
        fetchUsersCategory();
    }, [userId,editUser]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { ...formData, organization: localStorage.getItem('organization') });
            setUsers([...users, response.data]);
            setFilteredUsers([...users, response.data]);
            setUser(response.data);
            setIsModalOpen(false);
            setFormData({
                name: '',
                email: '',
                password: '',
                phoneNumber: '',
                organization: '',
                role: '',
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        console.log(user)
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/users/update/${editUser._id}`,
                { name: editUser.name, email: editUser.email, phoneNumber: editUser.phoneNumber }
            );
            const updatedUsers = users.map((user) =>
                user._id === response.data._id ? response.data : user
            );
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            setEditUser(null);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            organization: '',
            role: '',
        });
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditUser(null);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredData = users.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phoneNumber.includes(query) ||
                user.organization.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
        );
        setFilteredUsers(filteredData);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
        { field: 'organization', headerName: 'Organization', width: 100 },
        { field: 'role', headerName: 'Role', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <Button color="primary" size="small" onClick={() => handleEditUser(params.row)}>
                        Edit
                    </Button>
                    <Button
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteUser(params.row._id)}
                    >
                        Delete
                    </Button>
                </strong>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom>
                User List
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button variant="contained" onClick={() => setIsModalOpen(true)} startIcon={<AccountCircleIcon />}>
                    Add User
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Box>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>


            {/* Create User Modal */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <CenteredContainer>
                    <ModalContent>
                        <Typography variant="h6" gutterBottom>
                            Create User
                        </Typography>
                        <StyledTextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                        <StyledTextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <StyledTextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <StyledTextField
                            label="Phone Number"
                            variant="outlined"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleInputChange}
                        />
                        <StyledTextField
                            select
                            label="Role"
                            variant="outlined"
                            name="role"
                            value={role}
                            onChange={handleInputChange}
                        >
                            {usersCategory.map((category) => (
                                <MenuItem key={category._id} value={category.category}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                        <StyledButton
                            variant="contained"
                            onClick={handleCreateUser}
                            disabled={!name || !email || !password || !phoneNumber || !role}
                        >
                            Create
                        </StyledButton>
                    </ModalContent>
                </CenteredContainer>
            </Modal>

            {/* Edit User Modal */}
            {editUser && (
                <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
                    <CenteredContainer>
                        <ModalContent>
                            <Typography variant="h6" gutterBottom>
                                Edit User
                            </Typography>
                            <StyledTextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={editUser.name}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            />
                            <StyledTextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            />

                            <StyledTextField
                                label="Phone Number"
                                variant="outlined"
                                name="phoneNumber"
                                value={editUser.phoneNumber}
                                onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                            />

                            <StyledButton
                                variant="contained"
                                onClick={handleUpdateUser}
                                disabled={
                                    !editUser.name || !editUser.email || !editUser.role
                                }
                            >
                                Update
                            </StyledButton>
                        </ModalContent>
                    </CenteredContainer>
                </Modal>
            )}
        </Box>
    );
};

export default UserListComponent;
