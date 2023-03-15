import {
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'

import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'


export default function Home() {
  return (
    <div>
      <Box maxW='32rem'>
        <Heading mb={4}>Welcome to Hoodlinked!</Heading>
        <Text fontSize='xl'>
          A tool-share app for sharing items with your communities
        </Text>
      </Box>
      <LoginForm />
      <SignUp />
    </div>

  )
}
