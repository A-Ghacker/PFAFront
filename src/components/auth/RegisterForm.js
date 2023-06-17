import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

const LoginLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    organization: '',
  });

  const { name, email, password, phoneNumber, organization } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !email || !password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Send a POST request to the backend API endpoint
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        {
          name,
          email,
          password,
          phoneNumber,
          organization,
        }
      );

      // Handle the response from the server
      console.log(response.data); // You can customize the handling based on your needs

      // Redirect to the LoginForm page
      navigate('/LoginForm');
    } catch (error) {
      // Handle any error that occurred during the request
      console.error('Error during user registration:', error);
      // You can display an error message or perform other error handling logic here
    }
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <AccountCircleIcon sx={{ fontSize: 48, color: '#555' }} />
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
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
          <StyledTextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <StyledTextField
            label="Organization"
            variant="outlined"
            name="organization"
            value={organization}
            onChange={handleChange}
          />
          <StyledButton type="submit" variant="contained">
            Register
          </StyledButton>
        </form>
        <LoginLink to="/LoginForm">Already have an account? Login here</LoginLink>
      </FormContainer>
    </CenteredContainer>
  );
};

export default RegisterForm;
