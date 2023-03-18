import {
    Container, Card, Text, CardBody, CardFooter, Image, Stack, Heading, Divider, Button, ButtonGroup,
    Flex, Center, SimpleGrid
} from '@chakra-ui/react'

import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { QUERY_LIBRARIES, QUERY_USER } from "../utils/queries";

function CardsContext () {
    const { data } = useQuery(QUERY_LIBRARIES);
    const { userData } = useQuery(QUERY_USER);
    let library;
    let user;

    if (data) {
        library = data.libraries;
        console.log("---library---")
        console.log(library)
    }

    return (
        <Container>
            <Flex>
                <SimpleGrid>
                    {library ? (
                        <>
                            {library.map((library, index) => (
                                <div key={index}>
                                    <Card>
                                        <Heading bg="white" margin="1rem 0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" width={{ base: "100%", sm: "48%", md: "30%" }}>
                                            <p>{library.name}</p>
                                        </Heading>
                                        <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                            alt='Caffe Latte'
                                        />
                                        <Stack align='center' >
                                            
                                            <CardBody >
                                                <Heading as='h4' size='md'>
                                                    Items in {library.name}:
                                                </Heading>
                                            {library.users.map((user, index) => (
                                                <Text key={index}>
                                                    {/* <p>{user.username}</p> */}
                                                    {user.items.map(({ name }, index) => (
                                                        <div key={index}>
                                                            <p>{name}</p>
                                                        </div>
                                                    ))}
                                                </Text>
                                            ))}
                                                <Text py='2'>
                                                    {library._id}
                                                </Text>
                                            </CardBody>

                                            <CardFooter>
                                                <Button variant='solid' colorScheme='blue'>
                                                    <a href="mailto:xxxxiheartyouxxxxx@example.com">Join this Group</a>
                                                </Button>
                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </div>
                            ))}
                        </>
                    ) :
                        null
                    }
                </SimpleGrid>
            </Flex>
        </Container >
    )
}

export default CardsContext;