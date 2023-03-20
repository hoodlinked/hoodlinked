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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data } = useQuery(QUERY_USER);
    console.log(data);
    let user;

    if (data) {
        user = data.user;
    }

    const handleLogout = () => {
        Auth.logout()
        document.location.href='/'
    }

    const handleLogin = () => {
        window.location.href = '/';
    }

    return (
        <>
            {!isLargerThan768 && (
                <Flex justifyConent="space-between" bg='orange.500' w='100%' p={4} color='white'>
                    <Button as={HamburgerIcon} variant="unstyled" w={8} h={8} onClick={() => setIsDrawerOpen(true)} _hover={{ cursor: 'pointer' }} />
                        <Flex alignItems="center" flexGrow={1} justifyContent="center">
                            <Link href="/" display="flex" >
                                <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ marginRight: '1rem' }} />
                                <Heading style={{ fontSize: '1.5rem' }} textTransform="uppercase" >Hoodlinked</Heading>
                            </Link>
                        </Flex>
                </Flex>
            )}

            <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)}>
                <DrawerOverlay>
                    <DrawerContent bgGradient='linear(to-r, orange.300, orange.500)' color="white">
                        <DrawerCloseButton />
                        <Link href="/">
                            <Flex alignItems="center" justifyContent="left" px="1rem">
                                <FontAwesomeIcon icon={faPeopleArrows} size="2x" />
                                <DrawerHeader style={{ fontSize: '1.5rem' }} textTransform="uppercase">Hoodlinked</DrawerHeader>
                            </Flex>
                        </Link>


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
                                    <Flex flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
                                        <Box>
                                            <Heading mb={4} textAlign="center">You're not logged in!</Heading>
                                            <Text fontWeight="medium" textTransform="uppercase" color="white" textAlign="center">
                                                <Link color="white" textDecoration="underline" _hover={{ color: "gray.600" }} href='/'>
                                                    Login or sign-up to view the Dashboard
                                                </Link>
                                            </Text>
                                        </Box>
                                    </Flex>
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
                                        <Link href="/">
                                            <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ marginRight: '1rem' }} />
                                        </Link>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href='/dashboard' style={{ marginRight: '1rem' }} fontWeight='medium' textTransform="uppercase" _hover={{ color: 'gray.600' }}>Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href='/groups' style={{ marginRight: '1rem' }} fontWeight='medium' textTransform="uppercase" _hover={{ color: 'gray.600' }}>Groups</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </Flex>
                                </Breadcrumb>

                                <Flex alignItems="center" >
                                    <Text fontSize="md" style={{ marginRight: '.3rem' }} >Welcome,</Text>
                                    <Text fontWeight="bold" style={{ marginRight: '1rem' }}>{user.username}!</Text>
                                    <Button bg="white" color="orange" onClick={handleLogout}>Logout</Button>
                                </Flex>


                            </>
                        ) : (
                            <>
                                <Flex alignItems="center" justifyContent="center">
                                    <Link href="/">
                                        <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ marginRight: '1rem' }} />
                                        <Text color="white" fontSize="xl" fontWeight="bold">HOODLINKED</Text>
                                    </Link>
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
