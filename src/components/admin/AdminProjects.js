import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        createdBy: localStorage.getItem('userId'),
        projectManager: '',
    });
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/projects/getAllProjects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            const filteredUsers = response.data.filter((user) => user.role === 'Project Manager');
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/projects/${projectId}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
    };

    const handleAddProject = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/projects', newProject);
            setNewProject({
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                createdBy: localStorage.getItem('userId'),
                projectManager: '',
            });
            setShowAddModal(false);
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleShowProjectDetails = (project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const handleCloseProjectDetails = () => {
        setSelectedProject(null);
        setShowDetailsModal(false);
    };

    return (
        <div>
            <h2>Admin Projects</h2>

            <Button variant="contained" onClick={() => setShowAddModal(true)}>
                Add Project
            </Button>

            <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90%',
                        overflow: 'auto',
                        p: 4,
                    }}
                >
                    <h3>Add Project</h3>
                    <FormGroup>
                        <TextField label="Name" name="name" value={newProject.name} onChange={handleInputChange} />
                        <TextField
                            label="Description"
                            name="description"
                            value={newProject.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={newProject.startDate}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={newProject.endDate}
                            onChange={handleInputChange}
                        />
                        <TextField label="Created By" name="createdBy" value={newProject.createdBy} onChange={handleInputChange} />
                        <TextField
                            select
                            label="Project Manager"
                            name="projectManager"
                            value={newProject.projectManager}
                            onChange={handleInputChange}
                        >
                            {users.map((user) => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormGroup>
                    <Button variant="contained" onClick={handleAddProject} sx={{ mt: 2 }}>
                        Add
                    </Button>
                    <Button variant="contained" onClick={() => setShowAddModal(false)} sx={{ mt: 1, ml: 1 }}>
                        Cancel
                    </Button>
                </Paper>
            </Modal>

            {projects.length === 0 ? (
                <p>No projects available</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {projects.map((project, index) => (
                        <Paper
                            key={project._id}
                            sx={{
                                width: 'calc(33.33% - 16px)',
                                margin: '8px',
                                padding: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <Typography variant="h6">{project.name}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                                <Typography variant="body2">Project Manager: {project.projectManager}</Typography>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={() => handleShowProjectDetails(project)}
                                    sx={{ backgroundColor: 'green' }}
                                >
                                    Show
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => deleteProject(project._id)}
                                    sx={{ backgroundColor: 'red', marginLeft: '8px' }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Paper>
                    ))}
                </div>
            )}

            <Modal open={showDetailsModal} onClose={handleCloseProjectDetails}>
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '600px',
                        maxHeight: '90%',
                        overflow: 'auto',
                        p: 4,
                        background: '#fff',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                    }}
                >
                    {selectedProject && (
                        <div>
                            <h3>Project Details</h3>
                            
                            <Typography variant="body1">Name: {selectedProject.name}</Typography>
                            <Typography variant="body1">Description: {selectedProject.description}</Typography>
                            <Typography variant="body1">Start Date: {selectedProject.startDate}</Typography>
                            <Typography variant="body1">End Date: {selectedProject.endDate}</Typography>
                            <Typography variant="body1">Created By: {selectedProject.createdBy}</Typography>
                            <Typography variant="body1">Project Manager: {selectedProject.projectManager}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Paper
                                        sx={{
                                            padding: '16px',
                                            backgroundColor: '#f44336',
                                            color: '#fff',
                                        }}
                                    >
                                        Begin
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper
                                        sx={{
                                            padding: '16px',
                                            backgroundColor: '#2196f3',
                                            color: '#fff',
                                        }}
                                    >
                                        Still
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper
                                        sx={{
                                            padding: '16px',
                                            backgroundColor: '#4caf50',
                                            color: '#fff',
                                        }}
                                    >
                                        End
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Button variant="contained" onClick={handleCloseProjectDetails} sx={{ mt: 2 }}>
                                Close
                            </Button>
                        </div>
                    )}
                </Paper>
            </Modal>



        </div>
    );
};

export default AdminProjects;
