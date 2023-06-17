import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  animation: ${fadeInAnimation} 0.5s ease-in;
  /* Center the button */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const RegisterLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Send a POST request to the backend API endpoint
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      // Handle the response from the server
      const { token, role, name, userId, organization } = response.data;
      console.log('Login successful! token:', token);
      // You can store the token in localStorage or a state variable for future use
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('userId', userId);
      localStorage.setItem('organization', organization);
      // Redirect the user to the desired page upon successful login
      window.location.href = '/profile'; // Replace '/dashboard' with the appropriate route

    } catch (error) {
      // Handle any error that occurred during the request
      console.error('Error during user login:', error);
      // You can display an error message or perform other error handling logic here
    }
  };


  return (
    <CenteredContainer>
      <FormContainer>
        <AccountCircleIcon sx={{ fontSize: 48, color: '#555' }} />
        <h1>User Login</h1>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            required
          />
          <StyledButton type="submit" variant="contained">
            Login
          </StyledButton>
        </form>
        <RegisterLink to="/RegisterForm">Don't have an account? Register here</RegisterLink>
      </FormContainer>
    </CenteredContainer>
  );
};

export default LoginForm;
