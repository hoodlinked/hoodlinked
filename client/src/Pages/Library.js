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
                <>
                    <Card>
                        <CardHeader>
                            <Heading>
                                {library.name}
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                {library.users.map((user) => (
                                    <Box key={user._id}>
                                        <Heading size='md'>
                                            Items from <Link to={`/user/${user._id}`}>{user.username}</Link>
                                        </Heading>
                                        {user.items.map(({ name, description }, index) => (
                                            <Box key={index}>
                                                <Heading size='sm'>
                                                    {name}
                                                </Heading>
                                                <Text>{description}</Text>
                                            </Box>
                                        ))}
                                        <Stack spacing={4} direction='row' align='center'>
                                            <Button variant="solid" colorScheme="orange" margin="1rem 0">
                                                <a target="_blank" href={`mailto:${user.email}`}>Email {user.username}</a>
                                            </Button>
                                            <Button variant="solid" colorScheme="orange" margin="1rem 0">
                                                <Link to={`/user/${user._id}`}>
                                                    Go to {user.username}'s page
                                                </Link>
                                            </Button>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>

                    <AddLibraryUser />
                </>
            ) :
                null
            }
        </>
    )
}