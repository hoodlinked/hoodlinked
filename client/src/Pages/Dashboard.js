import {
  Heading,
  Box,
  Text,
  Flex, Avatar, Divider, Button, Link, Image
} from '@chakra-ui/react'

import Item from '../components/Item';
import React, { useState, useRef, useEffect } from "react";
import { useBreakpointValue } from '@chakra-ui/react';
import AddLibrary from '../components/AddLibrary';
import Home from '../Pages/Home'
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';




export default function Dashboard() {

  const { data } = useQuery(QUERY_USER);
  const isLargerThan768 = useBreakpointValue({ base: false, md: true });

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const signUpRef = useRef();

  useEffect(() => {
    if (showSignUpForm && signUpRef.current) {
      setTimeout(() => {
        signUpRef.current.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  }, [showSignUpForm, signUpRef]);

  let user;

  if (data) {
    user = data.user;
  }


  return (
    <>

      {user ? (
        <Flex direction="row" height="100%">
          {!isLargerThan768 && (
            <>
              <Box w="100%" bg="white" p="4">
                <Heading mb="4">My Items</Heading>
                <Item />
                <Divider margin="3rem 0" />
                <Heading mb="4">My Libraries</Heading>
                <AddLibrary />
              </Box>
            </>    
          )}

          {isLargerThan768 && (
            <>
              <Box w="25%" bg="orange.100" minW="fit-content">
                <Box p="4">
                  <Avatar size="lg" src={user.avatarUrl} />
                  <Heading size="md" mt="4" mb="2">Hello,</Heading>
                  <Heading>{user.username}!</Heading>
                  <Text fontSize="md">{user.email}</Text>
                </Box>
              </Box>
              <Box w="75%" bg="white" p="4">
                <Heading mb="4">My Items</Heading>
                <Item />
                <Divider margin="3rem 0" />
                <Heading mb="4">My Libraries</Heading>
                <AddLibrary />
              </Box>
            </>
          )}
        </Flex>
      ) : (
        <Home />
      )}


    </>
  )
}