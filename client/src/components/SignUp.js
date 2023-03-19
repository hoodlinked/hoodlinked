import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from "react-router-dom";
import {
  useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,
  VStack,Box
}
  from "@chakra-ui/react";

function SignUp(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      document.location.href ='/dashboard'
      // navigate('/dashboard')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box borderWidth="1px" borderColor="gray.200" bg='orange.100' borderRadius="lg" p="4" mb="4">
      <form onSubmit={handleFormSubmit}>
        <FormControl isRequired >
          <FormLabel htmlFor="username">Username:</FormLabel>
          <Input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            bg="white"
            onChange={handleChange}
          />
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            placeholder="email@domain.com"
            name="email"
            type="email"
            id="email"
            bg="white"
            onChange={handleChange}
          />
          <FormLabel htmlFor="pwd">Password:</FormLabel>
          <Input
            placeholder="********"
            name="password"
            type="password"
            id="pwd"
            bg="white"
            onChange={handleChange}
          />
                    {/* gives error messages if username or email already exists */}
          {error ? (
            <div>
              <p className="error-text">That username and email combination already exists</p>
            </div>
          ) : null}
          <Button
            type="submit"
            variant="solid"
            colorScheme="orange"
            width="full"
            marginTop={5}
          >
            Submit
          </Button>
        </FormControl>
      </form>
      </Box>
  );
}

export default SignUp;