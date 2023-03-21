import {
    Heading,
    Card,
    CardHeader,
    CardBody,
    Stack,
    StackDivider,
    Box,
    Text,
    Button,
} from '@chakra-ui/react';

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER_ITEMS } from '../utils/queries';

export default function User() {
    const { userId } = useParams();

    const { data } = useQuery(QUERY_USER_ITEMS, {
        variables: { userId: userId }
    });
    let user;
    let email;
    let username;

    if (data) {
        user = data.userItems
        email = user.email
        username = user.username
    }

    return (
        <>
            {user ? (
                <>
                    <Card>
                        <CardHeader>
                            <Heading mb="4">
                                {user.username}'s Page
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Heading size='md'> 
                                {user.username}'s Items: 
                                </Heading>
                                {user.items.map(({ name, description }, index) => (
                                    <Box key={index}>
                                        <Heading size='sm'>
                                            {name}
                                        </Heading>
                                        <Text>{description}</Text>
                                        <Button variant="solid" colorScheme="orange" margin="1rem 0">
                                            <a target="_blank" href={`mailto:${email}?&subject=Is%20Your%20${name}%20available?&body=Hi%20${username},%20I%20am%20interested%20in%20borrowing%20your%20${name}%20let%20me%20know%20if%20it%20is%20available!`}>Email about this item</a>
                                        </Button>
                                    </Box>
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>
                </>
            ) :
                null
            }
        </>
    )
}