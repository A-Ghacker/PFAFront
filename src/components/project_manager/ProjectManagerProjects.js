import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'; // Add this import
import InputLabel from '@mui/material/InputLabel'; // Add this import
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const ProjectManagerProjects = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        teamMember: '',
    });



    useEffect(() => {
        fetchProjects();
        fetchUsers();
        fetchTasks();
    }, [tasks]);



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
            const response = await axios.get('http://localhost:5000/api/users')
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/users/tasks/getAllTasks'
            );
            console.log(response.data)
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    const handleShowProjectDetails = (project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);

        // Filter the tasks based on the project ID
        const filteredTasks = tasks.filter((task) => task.project === project._id);
        setTasks(filteredTasks);
    };

    const handleCloseProjectDetails = () => {
        setSelectedProject(null);
        setShowDetailsModal(false);
    };
    const handleOpenAddTaskModal = () => {
        setShowAddTaskModal(true);
    };
    const handleCloseAddTaskModal = () => {
        setShowAddTaskModal(false);
    };

    const handleTaskDataChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleAddTask = async () => {
        try {
            // Make an API request to create the task
            console.log(taskData)
            await axios.post(
                'http://localhost:5000/api/users/tasks',
                { ...taskData, project: selectedProject._id }
            );


            // Update the projects state with the new task added


            // Close the add task modal and reset the task data
            setShowAddTaskModal(false);
            setTaskData({
                name: '',
                description: '',
                teamMember: '',
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };



    return (
        <div>
            <h2>Project Manager Projects</h2>
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
                                        <Typography variant="h6">Begin</Typography>
                                        {tasks
                                            .filter((task) => task.status === 'Begin' && task.project === selectedProject._id)
                                            .map((task) => (
                                                <Typography key={task._id} variant="body1">
                                                    {task.name}
                                                </Typography>
                                            ))}
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
                                        <Typography variant="h6">Still</Typography>
                                        {tasks
                                            .filter((task) => task.status === 'Still' && task.project === selectedProject._id)
                                            .map((task) => (
                                                <Typography key={task._id} variant="body1">
                                                    {task.name}
                                                </Typography>
                                            ))}
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
                                        <Typography variant="h6">End</Typography>
                                        {tasks
                                            .filter((task) => task.status !== 'Begin' && task.status !== 'Still' && task.project === selectedProject._id)
                                            .map((task) => (
                                                <Typography key={task._id} variant="body1">
                                                    {task.name}
                                                </Typography>
                                            ))}
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Button variant="contained" onClick={handleOpenAddTaskModal} sx={{ mt: 2 }}>
                                Add Task
                            </Button>
                            <Button variant="contained" onClick={handleCloseProjectDetails} sx={{ mt: 2 }}>
                                Close
                            </Button>

                        </div>
                    )}
                </Paper>
            </Modal>
            <Modal open={showAddTaskModal} onClose={handleCloseAddTaskModal}>
                <Paper
                    sx={{
                        // Modal styles
                    }}
                >
                    <h3>Add Task</h3>
                    <div>
                        <TextField
                            label="Task Name"
                            fullWidth
                            name="name"
                            value={taskData.name}
                            onChange={handleTaskDataChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            name="description"
                            value={taskData.description}
                            onChange={handleTaskDataChange}
                        />
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel>Team Member</InputLabel>
                            <Select
                                name="teamMember"
                                value={taskData.teamMember}
                                onChange={handleTaskDataChange}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user._id} value={user._id}>{user.name}:{user.role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleCloseAddTaskModal} sx={{ mt: 2 }}>
                            Close
                        </Button>
                        <Button variant="contained" onClick={handleAddTask} sx={{ mt: 2, ml: 2 }}>
                            Add
                        </Button>
                    </div>
                </Paper>
            </Modal>


        </div>
    );
}


export default ProjectManagerProjects