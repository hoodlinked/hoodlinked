import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import auth from '../utils/auth';
import { useNavigate } from "react-router-dom";
import {
  useToast, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement,
  VStack, Box
}
  from "@chakra-ui/react";



const LoginForm = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      auth.login(token);
      document.location.href ='/dashboard'
      // navigate('/dashboard')
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    // <div className="container my-1">
    <Box borderWidth="1px" borderColor="gray.200" bg='orange.100' borderRadius="lg" p="4">

      <form onSubmit={handleFormSubmit}>
        <FormControl isRequired >
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            placeholder="email@domain.com"
            name="email"
            type="email"
            id="email"
            bg="white"
            onChange={handleChange}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormLabel htmlFor="pwd">Password:</FormLabel>
          <Input
            placeholder="********"
            name="password"
            type="password"
            id="pwd"
            bg="white"
            onChange={handleChange}
          />
          {/* gives error messages if password or email do not match */}
          {error ? (
            <div>
              <p className="error-text">The email and password provided do not match our databse; please try again</p>
            </div>
          ) : null}
          <Button
            type="submit"
            variant="solid"
            colorScheme="orange"
            width="full"
            marginTop={5}
          >
            Login
          </Button>
        </FormControl>
      </form>

    {/* </div> */}
    </Box>
  );
}

export default LoginForm;