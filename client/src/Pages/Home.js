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

} from '@chakra-ui/react'
import {Container} from '@chakra-ui/react'
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import Dashboard from './Dashboard';


export default function Home() {
  const navigate = useNavigate();



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
      <Text fontSize="4xl" fontFamily="Work sans">
      Welcome to Hoodlinked!
      </Text>
    </Box>
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
  </Container>
);
}
