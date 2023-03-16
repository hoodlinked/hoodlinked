import {
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'

import Item from '../components/Item';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function Dashboard() {

  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <Box maxW='32rem'>
        <Heading mb={4}>Welcome to Dashboard!</Heading>
        <Text fontSize='xl'>
          Manage your groups and items from the Dashboard
        </Text>
      </Box>

      {user ? (
        <Box maxW='32rem'>
          <Heading mb={4}>You're logged in!</Heading>
          <Text fontSize='xl'>
            Dashboard
          </Text>
          <Item/>
        </Box>
      ) :
        <Box maxW='32rem'>
          <Heading mb={4}>You're not logged in!</Heading>
          <Text fontSize='xl'>
            Login or sign-up to view the Dashboard
          </Text>
        </Box>}

    </>
  )
}
