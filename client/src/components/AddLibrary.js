import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { CREATE_LIBRARY } from '../utils/mutations';
import { QUERY_USER_LIBRARY } from '../utils/queries';
import {
    Box,
    Heading,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react'

function AddLibrary() {

    // querying data for libraries user has joined
    const { data } = useQuery(QUERY_USER_LIBRARY);
    let library;

    if (data) {
        library = data.findUserLibraries;
        console.log(library)
    }

    const libraryName = document.getElementById('libraryName')

    const [formState, setFormState] = useState({ name: '' })
    const [createLibrary] = useMutation(CREATE_LIBRARY);
    const [showForm, setShowForm] = useState(false); // new state variable

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await createLibrary({
            variables: {
                name: formState.name
            },
        });
        // clearing form fields and reloading page for rendering
        libraryName.value = "";
        document.location.reload();

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    return (
        <>

            <Box borderWidth="1px" borderColor="gray.200" bgGradient='linear(to-r, orange.500, orange.300)' borderRadius="lg" p="4" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" margin="2rem 0">
                {library ? (
                    <>
                        {/* mapping all libraries logged in user has joined */}
                        {library.map(({ _id, name }, index) => (
                            <Box bg="white" margin="1rem 0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" width={{ base: "100%", sm: "48%", md: "30%" }}>
                                <Link
                                    to={`/library/${_id}`}
                                >
                                    <div key={index} className="my-2">
                                        {/* linking every library to library page */}

                                        <p>{name}</p>

                                    </div>
                                </Link>
                            </Box>
                        ))}
                    </>
                ) :
                    null
                }
            </Box>


            {/* New button to toggle the form */}
            <Button onClick={() => setShowForm(!showForm)} variant="solid" colorScheme="orange" margin="1rem 0">
                {showForm ? 'Hide form' : 'New Library +'}
            </Button>

            {/* Show the form only if showForm is true */}
            {showForm && (
                <Box borderWidth="1px" borderColor="gray.200" bg='orange.100' borderRadius="lg" p="4">
                    <VStack align="stretch">
                        <Heading as="h5" size="md" mb="2">
                            Create a new group for people in your community to join
                        </Heading>
                        <form onSubmit={handleFormSubmit}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="name">
                                    Group Name:
                                </FormLabel>
                                <Input
                                    placeholder="My Group"
                                    name="name"
                                    type="text"
                                    id="libraryName"
                                    bg="white"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="solid"
                                colorScheme="orange"
                                marginTop={5}
                            >Add Group</Button>
                        </form>
                    </VStack>
                </Box>)}
        </>
    )
}

export default AddLibrary;