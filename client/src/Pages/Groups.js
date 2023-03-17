import {
  Heading,
  Box,
  Text,
  Stack
} from '@chakra-ui/react'

import Cards from '../components/Cards'


export default function Dashboard() {
  return (
    <>
      <Box>
      <Stack spacing="6" align="center">
        <Box margin="1rem">
          <Heading 
          mb={4} 
          fontFamily="Rubik Iso" 
          fontWeight="extrabold">
            Welcome to Groups!
          </Heading>
          <Text fontSize='xl' align="center">
            Current open Communities
          </Text>
      </Box>

      <Box w="100%">
        <Cards />
      </Box>
    </Stack>
  </Box>

    </>



  )
}
