import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    useBreakpointValue,
    Flex,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Stack,
    Link,
    Text,
    Box,
    Heading
} from '@chakra-ui/react'
import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons'


export default function Nav() {
  const isLargerThan768 = useBreakpointValue({ base: false, md: true });
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false);

  const { data } = useQuery(QUERY_USER);
  console.log(data);
  let user;

  if (data) {
    user = data.user;
  }

  const handleLogout = () =>{
    Auth.logout()
 }

 const handleLogin = () => {
    window.location.href = '/';
 }

  return (
    <>
        {!isLargerThan768 && (
            <Flex alignItems="center" justifyContent="space-between" bg='orange.500' w='100%' p={4} color='white'>
                <Button as={HamburgerIcon} variant="unstyled" w={8} h={8} onClick={() => setIsDrawerOpen(true)} />
            </Flex>
        )}

        <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)}>
        <DrawerOverlay>
            <DrawerContent bgGradient='linear(to-r, orange.300, orange.500)' color="white">
            <DrawerCloseButton />

            <Flex alignItems="center" justifyContent="left" px="1rem">
            <FontAwesomeIcon icon={faPeopleArrows} size="2x"/>
            <DrawerHeader style={{ fontSize: '1.5rem' }}>Hoodlinked</DrawerHeader>
            </Flex>
           

            {
            user ? (
                    <>
                    <DrawerBody>
                        <Stack spacing={4}>
                            <Text>Welcome, {user.username}!</Text>
                            <Link href="/dashboard" fontWeight="medium" textTransform="uppercase" color="white" _hover={{ color: "gray.600" }}>Dashboard</Link>
                            <Link href="/groups" fontWeight="medium" textTransform="uppercase" color="white" _hover={{ color: "gray.600" }}>Groups</Link>
                            <Button bg="white" color="orange" onClick={handleLogout}>Logout</Button>
                        </Stack>
                    </DrawerBody>
        
                            
                    </>
                ) : 
                (
                    <Box>
                      <Heading mb={4}>You're not logged in!</Heading>
                      <Text fontSize='xl'>
                        <Link color="white" textDecoration="underline"  href='/'>
                        Login or sign-up to view the Dashboard
                        </Link>
                      </Text>
                    </Box>
                ) 
            }
                
            </DrawerContent>
        </DrawerOverlay>
        </Drawer>
        
        {isLargerThan768 && (
            <Flex alignItems="center" justifyContent="space-between" bg='orange.500' w='100%' p={4} color='white'>
                {
                    user ? (
                        <>
                        
                        <Breadcrumb spacing="8px" >
                        <Flex alignItems="center" >
                        <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ marginRight: '1rem' }}/>
                            <BreadcrumbItem mar>
                                <BreadcrumbLink href='/dashboard' style={{ marginRight: '1rem' }}fontWeight='medium' textTransform="uppercase" _hover={{ color: 'gray.600' }}>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/groups' style={{ marginRight: '1rem' }} fontWeight='medium' textTransform="uppercase" _hover={{ color: 'gray.600' }}>Groups</BreadcrumbLink>
                            </BreadcrumbItem>
                            </Flex>
                        </Breadcrumb>
                            <Text>Welcome, {user.username}!</Text>
                            <Button bg="white" color="orange" onClick={handleLogout}>Logout</Button>
                            
                        </>
                    ) : (
                        <>
                        <Flex alignItems="center" justifyContent="center">
                            <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ marginRight: '1rem' }}/>
                            <Text color="white" fontSize="xl" fontWeight="bold">HOODLINKED</Text>
                        </Flex>
                        <Button bg="white" color="orange" onClick={handleLogin}>Login or Sign Up</Button>
                        </>
                    ) 
                }
            </Flex>
        )}
  </>
 )
}
