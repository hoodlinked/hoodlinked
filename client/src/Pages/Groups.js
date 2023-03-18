import {
    Container, Card, Text, CardBody, CardFooter, Image, Stack, Heading, Button,
    Flex, SimpleGrid
} from '@chakra-ui/react'

// import React, { useState } from 'react';

import {  useQuery } from '@apollo/client';

import { QUERY_LIBRARIES } from "../utils/queries";

function Cards() {
    const { data } = useQuery(QUERY_LIBRARIES);
    let library;

    if (data) {
        library = data.libraries;
        console.log(library)
    }
    return (
        <Container>
            <Flex>
                <SimpleGrid>
                    {library ? (
                        <>
                            {library.map(({ name }, index) => (
                                <Card>
                                    <Heading bg="white" margin="1rem 0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" width={{ base: "100%", sm: "48%", md: "30%" }}>

                                        <div key={index} className="my-2">
                                            <p>{name}</p>
                                        </div>
                                    </Heading>
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                        alt='Caffe Latte'
                                    />
                                    <Stack align='center' >
                                        <CardBody >

                                            <Text py='2'>
                                                Maybe put member(user) count here?
                                            </Text>
                                        </CardBody>

                                        <CardFooter>
                                            <Button variant='solid' colorScheme='blue'>
                                                <a href="mailto:xxxxiheartyouxxxxx@example.com">Join this Group</a>
                                            </Button>
                                        </CardFooter>
                                    </Stack>
                                </Card>
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


export default Cards;