import {
  Heading,
  Box,
  Text,
  Flex,
  Link,
  Image,
  Button

} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import React, { useState , useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import Dashboard from './Dashboard';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from "../utils/queries";

export default function Home() {
  // const navigate = useNavigate();
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
      {/* logic for showing the cards page - with context has option for user to join/view library page */}
      
      {user ? (
        <Box>
          <Heading mb={4}>You're already logged in!</Heading>
          <Text fontSize='xl'>
            <Link color="teal" textDecoration="underline" href='/dashboard'>
              navigate to your Dashboard to see your items and libraries
            </Link>
          </Text>
        </Box>
      ) : (
        <>
        <Flex flexDirection="column" alignItems="center" my="4rem">
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
  );
}
