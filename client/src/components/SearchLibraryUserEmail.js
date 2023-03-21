import {
    Card, Text, CardBody, CardFooter, Heading, Button,
    Flex,
    Center,
    Box,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react'

import { SearchIcon } from "@chakra-ui/icons";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';

import { QUERY_LIBRARIES, QUERY_USER } from "../utils/queries";

function SearchLibraryUserEmail() {

    const [searchQuery, setSearchQuery] = useState('');

    const { data } = useQuery(QUERY_LIBRARIES);
    let library;

    if (data) {
        library = data.libraries;
    }

    const filteredLibrary = library
        ? library.filter((lib) =>
            lib.users.some((user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : null;


    return (
        <>
            <Heading
                textAlign="center"
                mb="4"
                mt="8">
                Find a User
            </Heading>

            <Center>
                <Box my={4} px={4} maxW="lg" >
                    <InputGroup >
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.500" />}
                        />
                        <Input
                            type="text"
                            placeholder="Search user email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderRadius={0}
                            _hover={{ borderColor: "gray.300" }}
                            _focus={{ borderColor: "orange.400", boxShadow: "none" }}
                        />
                    </InputGroup>
                </Box>
            </Center>

            {filteredLibrary && filteredLibrary.length > 0 ? (
                <Flex flexWrap="wrap" justifyContent="center">
                    <>
                        {filteredLibrary.map((library, index) => (<div key={index}>
                            <Card
                                borderWidth="1px"
                                // minW="md"
                                // maxW="md"
                                // minH="lg"
                                // maxH="lg"
                                borderColor="gray.200"
                                bg="orange.100"
                                borderRadius="lg"
                                p="4"
                                margin="2rem"
                            >
                                <Heading textAlign="center">
                                    {library.name}
                                </Heading>
                                <CardBody >
                                    <Heading
                                        as='h4' size='md'
                                    >
                                        User emails in {library.name}:
                                    </Heading>
                                    {library.users
                                        .filter((user) =>
                                            user.email
                                                .toLowerCase()
                                                .includes(searchQuery.toLowerCase())
                                        )
                                        .map(({ email }, index) => (
                                            <Heading
                                                as='h6' size='sm' key={index}>
                                                {email}
                                            </Heading>
                                        ))}
                                </CardBody>

                                <CardFooter>
                                    <Flex justifyContent="center" alignItems="center" width="100%">
                                        <Button variant='solid' colorScheme='orange'>
                                            <Link
                                                to={`/library/${library._id}`}
                                            >
                                                Group Page
                                            </Link>
                                        </Button>
                                    </Flex>
                                </CardFooter>
                            </Card>
                        </div>
                        ))}
                    </>
                </Flex>
            ) :
                <p>No groups found with that user.</p>
            }

        </>

    )
}

export default SearchLibraryUserEmail;