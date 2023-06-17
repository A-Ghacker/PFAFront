import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';

const Container = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled(Typography)`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
`;

const Form = styled('div')`
  margin-top: 20px;
`;

const FormGroupContainer = styled(Box)`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled('div')`
  margin-bottom: 10px;
`;

const Label = styled('label')`
  display: block;
  font-weight: bold;
`;

const Input = styled(TextField)`
  width: 100%;
`;

const CreateButton = styled(Button)`
  background-color: #4caf50;
  color: #fff;
`;

const CategoryCrudComponent = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ category: '', description: '' });
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/employeeCategory/${userId}`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleCreateCategory = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/employeeCategory', {
                userId,
                ...newCategory,
            });
            setCategories((prevCategories) => [...prevCategories, response.data]);
            setNewCategory({ category: '', description: '' });
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/employeeCategory/${categoryId}`);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== categoryId)
            );
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <Container>
            <Heading variant="h2">Categories</Heading>

            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Form>
                        <FormGroupContainer>
                            <FormGroup>
                                <Label>Name:</Label>
                                <Input
                                    type="text"
                                    name="category"
                                    value={newCategory.category}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Description:</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={newCategory.description}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </FormGroup>

                            <CreateButton variant="contained" onClick={handleCreateCategory}>
                                Create
                            </CreateButton>
                        </FormGroupContainer>
                    </Form>
                </Grid>

                <Grid item xs={10}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.category}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>
                                            <DeleteButton
                                                variant="contained"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteCategory(category._id)}
                                            >
                                                Delete
                                            </DeleteButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CategoryCrudComponent;
