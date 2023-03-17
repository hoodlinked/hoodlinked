import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from "react-router-dom";
import {
  useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,
  VStack,
}
from "@chakra-ui/react";

function SignUp(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">

      <FormControl isRequired onSubmit={handleFormSubmit}>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            placeholder="email@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <FormLabel htmlFor="pwd">Password:</FormLabel>
          <Input
            placeholder="********"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Submit
              </Button>
      </FormControl>
    </div>
  );
}

export default SignUp;