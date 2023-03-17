import {
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'

import Cards from '../components/Cards'


export default function Dashboard() {
  return (
    <>
      <Box maxW='32rem'>
        <Heading mb={4}>Welcome to Groups!</Heading>
        <Text fontSize='xl'>
          A tool-share app for sharing items with your communities
        </Text>
      </Box>
      <Cards />
    </>

  )
}
