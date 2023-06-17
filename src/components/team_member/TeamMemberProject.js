import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDrop,useDrag } from 'react-dnd';
import { Paper, Typography } from '@mui/material';

const TeamMemberProject = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchProjects();
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

    const fetchTasks = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get('http://localhost:5000/api/users/tasks/getAllTasks');
            const filteredTasks = response.data.filter(task => task.teamMember === userId);
            setTasks(filteredTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

   

    const updateTaskStatus = async (task, newStatus) => {
        try {
            // Make an API call to update the task status on the server
            const response = await axios.put(`http://localhost:5000/api/users/tasks/${task._id}`, { status: newStatus });
            // Assuming the server responds with the updated task
            const updatedTask = response.data;

            // Update the tasks state with the updated task status
            setTasks(tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };


    const [{ canDrop, isOver }, dropBegin] = useDrop(() => ({
        accept: 'task',
        drop: (item) => updateTaskStatus(item.task, 'Begin'),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    }));

    const [{ canDrop: canDropStill, isOver: isOverStill }, dropStill] = useDrop(() => ({
        accept: 'task',
        drop: (item) => updateTaskStatus(item.task, 'Still'),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    }));

    const [{ canDrop: canDropEnd, isOver: isOverEnd }, dropEnd] = useDrop(() => ({
        accept: 'task',
        drop: (item) => updateTaskStatus(item.task, 'End'),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div>
            <h2>Team Member Project</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                    ref={dropBegin}
                    style={{
                        width: '30%',
                        backgroundColor: canDrop && isOver ? 'lightblue' : 'green',
                        padding: '10px',
                    }}
                >
                    <h3>Begin</h3>
                    {tasks.map(task => task.status === 'Begin' && (
                        <TaskItem
                            key={task._id}
                            task={task}
                            projects={projects}
                            updateTaskStatus={updateTaskStatus}
                        />
                    ))}
                </div>
                <div
                    ref={dropStill}
                    style={{
                        width: '30%',
                        backgroundColor: canDropStill && isOverStill ? 'lightblue' : 'yellow',
                        padding: '10px',
                    }}
                >
                    <h3>Still</h3>
                    {tasks.map(task => task.status === 'Still' && (
                        <TaskItem
                            key={task._id}
                            task={task}
                            projects={projects}
                            updateTaskStatus={updateTaskStatus}
                        />
                    ))}
                </div>
                <div
                    ref={dropEnd}
                    style={{
                        width: '30%',
                        backgroundColor: canDropEnd && isOverEnd ? 'lightblue' : 'red',
                        padding: '10px',
                    }}
                >
                    <h3>End</h3>
                    {tasks.map(task => task.status === 'End' && (
                        <TaskItem
                            key={task._id}
                            task={task}
                            projects={projects}
                            updateTaskStatus={updateTaskStatus}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const TaskItem = ({ task, projects, updateTaskStatus }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { task },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const getProjectName = (projectId) => {
        const project = projects.find(project => project._id === projectId);
        return project ? project.name : 'Unknown Project';
    };

    return (
        <Paper
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                marginBottom: '10px',
                padding: '10px',
            }}
        >
            <Typography>Name: {task.name}</Typography>
            <Typography>Description: {task.description}</Typography>
            <Typography>Project: {getProjectName(task.project)}</Typography>
            {/* Render other task details as needed */}
        </Paper>
    );
};

export default TeamMemberProject;
