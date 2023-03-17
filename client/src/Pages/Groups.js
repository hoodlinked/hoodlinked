import {
  Heading,
  Box,
  Text,
  Flex
} from '@chakra-ui/react'

import Cards from '../components/Cards'


export default function Dashboard() {
  return (
    <div>
      <Box maxW='32rem' align="center">
        <Heading mb={4} fontFamily="Rubik Iso" fontWeight="extrabold" >Welcome to Groups!</Heading>
        <Text fontSize='xl'>
          Current open Communities
        </Text>
      </Box>
      <Cards />
    </div>



  )
}
