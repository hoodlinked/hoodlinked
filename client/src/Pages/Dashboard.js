import {
  Heading, 
  Box,
  Text,
  Flex, Avatar, Divider
} from '@chakra-ui/react'

import Item from '../components/Item';
import AddLibrary from '../components/AddLibrary';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function Dashboard() {

  const { data } = useQuery(QUERY_USER);
  console.log(data);
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
            <Heading mt="4" mb="2">{user.username}</Heading>
            <Text fontSize="xl">{user.email}</Text>
          </Box>
        </Box>
      <Box w="75%" bg="white" p="4">
        <Heading mb="4">My Items</Heading>
          <Item />
        <Divider margin="3rem 0"/>
        <Heading mb="4">My Libraries</Heading>
          <AddLibrary />
      </Box>
      </Flex>

    ) :
        <Box>
          <Heading mb={4}>You're not logged in!</Heading>
          <Text fontSize='xl'>
            Login or sign-up to view the Dashboard
          </Text>
        </Box>}

    </>
  )
}

