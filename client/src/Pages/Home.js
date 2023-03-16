import {
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import Dashboard from './Dashboard';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Box maxW='32rem'>
        <Heading mb={4}>Welcome to Hoodlinked!</Heading>
        <Text fontSize='xl'>
          A tool-share app for sharing items with your communities
        </Text>
      </Box>
      <LoginForm onClick={() => {
           navigate("/Dashboard");
        }}/>
      <SignUp onClick={() => {
          navigate("/Dashboard");
        }}/>
    </div>

  )
}
