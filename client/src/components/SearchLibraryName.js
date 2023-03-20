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

function SearchLibraryName() {

    const [searchQuery, setSearchQuery] = useState('');

    const { data } = useQuery(QUERY_LIBRARIES);
    let library;

    if (data) {
        library = data.libraries;
        console.log(library)
    }

    const filteredLibrary = library
        ? library.filter((lib) =>
            lib.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : null;


    return (
        <>
            <Heading
                textAlign="center"
                mb="4"
                mt="8">
                Find a Group Name
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
                            placeholder="Search names"
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
                        {filteredLibrary
                            .filter((library) =>
                                library.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLocaleLowerCase())
                            )
                            .map(({ name, _id }, index) => (
                                <Card
                                    borderWidth="1px"
                                    // minW="md"
                                    // maxW="md"
                                    // minH="md"
                                    // maxH="md"
                                    borderColor="gray.200"
                                    bg="orange.100"
                                    borderRadius="lg"
                                    p="4"
                                    margin="2rem"
                                    key={index}
                                >
                                    <Heading textAlign="center">
                                        {name}
                                    </Heading>
                                    {/* <CardBody >
                                        {library.users
                                            .filter((user) =>
                                                user.username
                                                    .toLowerCase()
                                                    .includes(searchQuery.toLowerCase())
                                            )
                                            .map(({ username }, index) => (
                                                <Heading
                                                    as='h6' size='sm' key={index}>
                                                    {username}
                                                </Heading>
                                            ))}
                                    </CardBody> */}
                                    <CardFooter>
                                        <Flex justifyContent="center" alignItems="center" width="100%">
                                            <Button variant='solid' colorScheme='orange'>
                                                <Link
                                                    to={`/library/${_id}`}
                                                >
                                                    Group Page
                                                </Link>
                                            </Button>
                                        </Flex>
                                    </CardFooter>
                                </Card>
                            ))

                        }
                    </>
                </Flex>
            ) :
                <p>No groups found by that name.</p>
            }

        </>

    )
}

export default SearchLibraryName;