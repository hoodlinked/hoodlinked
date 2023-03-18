import {
  Heading,
  Box,
  Text,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,

} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import Dashboard from './Dashboard';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from "../utils/queries";

export default function Home() {
  // const navigate = useNavigate();
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log("---user---")
    console.log(user)
  }


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Rubik Iso" fontWeight="extrabold" color="teal" textAlign="center"
        >
          Welcome to Hoodlinked!
        </Text>
      </Box>
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
      ) : 
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      }
      
    </Container>
  );
}
