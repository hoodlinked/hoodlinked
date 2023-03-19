import {
  Heading,
  Box,
  Text,
  Flex,
  Link,
  Image,
  Button

} from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react'
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
  const isLargerThan768 = useBreakpointValue({ base: false, md: true });
  
  const [displayedForm, setDisplayedForm] = useState(null);

  // const [showSignUpForm, setShowSignUpForm] = useState(false);
  // const [showLoginForm, setShowLoginForm] = useState(false);
  
  const toggleSignUpForm = () => {
    if (displayedForm === 'signup') {
      setDisplayedForm(null);
    } else {
      setDisplayedForm('signup');
    }
  };

  const toggleLoginForm = () => {
    if (displayedForm === 'login') {
      setDisplayedForm(null);
    } else {
      setDisplayedForm('login');
    }
  };
  
  const signUpRef = useRef();

  useEffect(() => {
    if (displayedForm === 'signup' && signUpRef.current) {
      setTimeout(() => {
        signUpRef.current.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  }, [displayedForm]);


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

      {!isLargerThan768 && (
        <>
          <Flex>
          <Image src="/assets/PastelHero.png" alt="Hero Image" width="100%" />
          </Flex>
          <Flex flexDirection="column" alignItems="center" my="4rem">
          
          <Text fontSize="3xl" fontWeight="bold" mb="2rem" textAlign="center">
            Welcome to Hoodlinked!
          </Text>
          <Text fontSize="xl" mb="2rem" textAlign="center" px={[8, 16]}>
            Hoodlinked is a community-based sharing app that allows you to share and exchange items with people in your local area. Join a local group and start sharing today!
          </Text>
          <Button onClick={toggleSignUpForm} variant="solid" colorScheme="orange" margin="1rem 0">
            {displayedForm === "signup" ? 'Hide form' : 'Sign up for free'}
          </Button>
            {displayedForm === "signup" && (
            <SignUp />
          )}

          <Link onClick={toggleLoginForm} fontSize="lg" color="gray.500" mb="2rem">
            Already have an account? Log in
          </Link>
            {displayedForm === "login" && (
            <LoginForm />
          )}
        </Flex>
        </>
      )}

      {isLargerThan768 && (
        <>
        <Flex flexDirection="column" alignItems="center" my="4rem">
        <Text fontSize="3xl" fontWeight="bold" mb="2rem" textAlign="center">
          Welcome to Hoodlinked!
        </Text>
        <Text fontSize="xl" mb="2rem" textAlign="center" px={[12, 20]}>
          Hoodlinked is a community-based sharing app that allows you to share and exchange items with people in your local area. Join a local group and start sharing today!
        </Text>
        <Button onClick={toggleSignUpForm} variant="solid" colorScheme="orange" margin="1rem 0">
          {displayedForm === "signup" ? 'Hide form' : 'Sign up for free'}
        </Button>
          {displayedForm === "signup" && (
          <SignUp />
        )}

        <Link onClick={toggleLoginForm} fontSize="lg" color="gray.500" mb="2rem">
          Already have an account? Log in
        </Link>
        {displayedForm === "login" && (
          <LoginForm />
        )}
        </Flex>
        <Flex>
        <Image src="/assets/PastelHero.png" alt="Hero Image" width="100%" />
        </Flex>
        </>
        )}
      </>
    )}  
    </>
  );
}
