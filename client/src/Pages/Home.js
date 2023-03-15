import { 
  Heading, 
  Box,
  Text,
  Button,
} from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
<Box maxW='32rem'>
      <Heading mb={4}>Modern online and offline payments for Africa</Heading>
      <Text fontSize='xl'>
        Paystack helps businesses in Africa get paid by anyone, anywhere in the
        world
      </Text>
      <Button size='lg' colorScheme='green' mt='24px'>
        Create a free account
      </Button>
    </Box>
    </div>
    
  )
}
