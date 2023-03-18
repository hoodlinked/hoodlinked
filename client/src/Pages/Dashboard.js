import {
  Heading,
  Box,
  Text,
  Flex, Avatar, Divider, Button, Link, Image
} from '@chakra-ui/react'

import Item from '../components/Item';
import React, { useState, useRef, useEffect } from "react";
import AddLibrary from '../components/AddLibrary';
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';




export default function Dashboard() {

  const { data } = useQuery(QUERY_USER);

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
          <Box w="25%" bg="gray.100">
            <Box p="4">
              <Avatar size="lg" src={user.avatarUrl} />
              <Heading mt="4" mb="2">Hello, {user.username}!</Heading>
              <Text fontSize="xl">{user.email}</Text>
            </Box>
          </Box>
          <Box w="75%" bg="white" p="4">
            <Heading mb="4">My Items</Heading>
            <Item />
            <Divider margin="3rem 0" />
            <Heading mb="4">My Libraries</Heading>
            <AddLibrary />
          </Box>
        </Flex>

      ) : (

        <>
          <Flex flexDirection="column" alignItems="center" my="4rem" p="3rem">
            <Image src="hoodlinked-logo.png" alt="Hoodlinked Logo" width="200px" height="200px" mb="2rem" />
            <Text fontSize="3xl" fontWeight="bold" mb="2rem" textAlign="center">
              Welcome to Hoodlinked!
            </Text>
            <Text fontSize="xl" mb="2rem" textAlign="center">
              Hoodlinked is a community-based sharing app that allows you to share and exchange items with people in your local area. Join a local group and start sharing today!
            </Text>
            <Button onClick={() => setShowSignUpForm(!showSignUpForm)} variant="solid" colorScheme="orange" margin="1rem 0">
              {showSignUpForm ? 'Hide form' : 'Sign up for free'}
            </Button>
            {showSignUpForm && (
              <SignUp />
            )}

            <Link onClick={() => setShowLoginForm(!showLoginForm)} fontSize="lg" color="gray.500" mb="2rem">
              Already have an account? Log in
            </Link>
            {showLoginForm && (
              <LoginForm />
            )}
          </Flex>

        </>
      )}

    </>
  )
}