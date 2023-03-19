import {
    Card, Text, CardBody, CardFooter, Heading, Button,
    Flex
} from '@chakra-ui/react'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';

import { QUERY_LIBRARIES, QUERY_USER } from "../utils/queries";

function Cards({searchQuery}) {
    const { data } = useQuery(QUERY_LIBRARIES);
    const { userData } = useQuery(QUERY_USER);
    let library;
    let user;

    if (data) {
        library = data.libraries;

        // if (userData) {
        //     user = userData.user;
        //     console.log("---user---")
        // }
    }

    const filteredLibrary = library
    ? library.filter((lib) =>
        lib.users.some((user) =>
          user.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      )
    : null;


    return (
    <>            
            {filteredLibrary && filteredLibrary.length > 0 ? (
                <Flex flexWrap="wrap" justifyContent="center">
                <>
                {filteredLibrary.map((library, index) => (                        <div key={index}>
                            <Card 
                              borderWidth="1px"
                              minW="md"
                              maxW="md"
                              minH="lg"
                              maxH="lg"
                              borderColor="gray.200"
                              bg="orange.100"
                              borderRadius="lg"
                              p="4"
                              margin="2rem"
                            >
                                <Heading textAlign="center">
                                    {library.name}
                                </Heading>
                                {/* <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                            alt='Caffe Latte'
                                        /> */}

                                <CardBody >
                                    <Heading
                                        as='h4' size='md'
                                    >
                                        Items in {library.name}:
                                    </Heading>
                                    {library.users.map((user, index) => (
                                        <Text key={index}>
                                            {user.items
                                            .filter((item) =>
                                            item.name
                                              .toLowerCase()
                                              .includes(searchQuery.toLowerCase())
                                            )
                                            .map(({ name }, index) => (
                                                <div key={index}>
                                                    <p>{name}</p>
                                                </div>
                                            ))}
                                        </Text>
                                    ))}
                                </CardBody>

                                <CardFooter>
                                    <Flex justifyContent="center" alignItems="center" width="100%">

                                        <Button 
                                        variant='solid' colorScheme='orange'>
                                            <Link
                                                to={`/`}
                                            >
                                                Login or Sign Up to View Page
                                            </Link>
                                        </Button>
                                    </Flex>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </>
                </Flex>
            ) : (
            <p>No items found.</p>
            )
            }
    </>
    )
}

export default Cards;