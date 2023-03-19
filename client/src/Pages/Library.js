import {
    Heading,
    Button,
    Stack,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    StackDivider,
    Box,
    Text,
    Flex
} from '@chakra-ui/react';

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import AddLibraryUser from '../components/AddLibraryUser';

import { QUERY_LIBRARY } from '../utils/queries';

export default function Library() {
    const { libraryId } = useParams();


    const { data } = useQuery(QUERY_LIBRARY, {
        variables: { libraryId: libraryId }
    });
    let library;

    if (data) {
        library = data.library
        console.log(data);
        console.log(library)

    }

    return (
        <>



            {library ? (
                <Flex flexWrap="wrap" justifyContent="center">
                <>

                    <Card mt={10} bg="orange.100">
                        <CardHeader>
                            <Heading color="orange.500" textAlign="center">
                                {library.name}
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                {library.users.map((user) => (
                                    <Box key={user._id}>
                                        <Heading textAlign="center" size='md'>
                                            <Link to={`/user/${user._id}`}>{user.username}</Link>'s items
                                        </Heading>
                                        {user.items.map(({ name, description }, index) => (
                                            <Box
                                            m={5}
                                             key={index}>
                                                <Heading size='sm'>
                                                    {name}
                                                </Heading>
                                                <Text>{description}</Text>
                                            </Box>
                                        ))}
                                        <Stack spacing={4} direction='row' align='center'>
                                            <Button variant="solid" colorScheme="orange" margin="1rem 0" _hover={{ color: "gray.600" }}>
                                                <a target="_blank" href={`mailto:${user.email}`}>Email {user.username}</a>
                                            </Button>
                                            <Button variant="solid" colorScheme="orange" margin="1rem 0" _hover={{ color: "gray.600" }}>
                                                <Link to={`/user/${user._id}`} _hover={{ color: "gray.600" }}>
                                                    Go to {user.username}'s page
                                                </Link>
                                            </Button>
                                            <AddLibraryUser />
                                        </Stack>
                                    </Box>
                                ))}

                            </Stack>
                        </CardBody>
                    </Card>

                </>
                </Flex>
            ) :
                null
            }



        </>
    )
}