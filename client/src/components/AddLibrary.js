import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import SearchLibraryUser from './SearchLibraryUser';
import SearchLibraryName from './SearchLibraryName';

import {
    CREATE_LIBRARY,
    REMOVE_LIBRARY_USER
} from '../utils/mutations';
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
    Flex,
    Divider,
    Textarea,
} from '@chakra-ui/react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

function AddLibrary() {

    // querying data for libraries user has joined
    const { data } = useQuery(QUERY_USER_LIBRARY);
    let library = [];

    if (data) {
        library = data.findUserLibraries;
    }

    const libraryName = document.getElementById('libraryName')
    const libraryDescription = document.getElementById('libraryDescription')

    const [formState, setFormState] = useState({ name: '', description: '' })
    const [createLibrary] = useMutation(CREATE_LIBRARY);
    const [showForm, setShowForm] = useState(false); // new state variable
    const [showUserSearch, setShowUserSearch] = useState(false);//state varibale for user search
    const [showGroupSearch, setShowGroupSearch] = useState(false);//state varibale for group name search
    const [removeLibraryUser] = useMutation(REMOVE_LIBRARY_USER);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertStates, setAlertStates] = useState(library.map(() => false));

    const onClose = () => setIsAlertOpen(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await createLibrary({
            variables: {
                name: formState.name,
                description: formState.description
            },
        });
        // clearing form fields and reloading page for rendering
        libraryName.value = "";
        libraryDescription.value = "";
        document.location.reload();

    };


    const handleRemoveLibraryUser = async (_id, index) => {
        const mutationResponse = await removeLibraryUser({
            variables: { libraryId: _id }
        });

        const updatedAlertStates = [...alertStates];
        updatedAlertStates[index] = false;
        setAlertStates(updatedAlertStates);
        document.location.reload();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }


    const handleDelete = async (_id, index) => {
        await handleRemoveLibraryUser(_id, index);
        onClose();
    };


    const cancelRef = React.useRef();

    const handleAlertOpen = (index) => {
        const updatedAlertStates = [...alertStates];
        updatedAlertStates[index] = true;
        setAlertStates(updatedAlertStates);
    };

    const handleAlertClose = (index) => {
        const updatedAlertStates = [...alertStates];
        updatedAlertStates[index] = false;
        setAlertStates(updatedAlertStates);
    };


    return (
        <>
            <Box borderWidth="1px" borderColor="gray.200" bgGradient='linear(to-r, orange.500, orange.300)' borderRadius="lg" p="4" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" margin="2rem 0">
                {library ? (
                    <>
                        {/* mapping all libraries logged in user has joined */}
                        {library.map(({ _id, name, description }, index) => (
                            <Box bg="white" margin="1rem 0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="3" width={{ base: "100%", sm: "48%", md: "30%" }}>
                                {/* linking every library to library page */}
                                <Flex flexDirection="column" alignItems="center">
                                    <Heading as="h5" size="md" mb="2" key={index} className="my-2">
                                        <p>{name}</p>
                                    </Heading>
                                    <Text>
                                        {description}
                                    </Text>
                                    <Flex flexDirection="column" mt={8} alignItems="center">
                                        <Link
                                            to={`/library/${_id}`}
                                        >
                                            <Button
                                                m={1}
                                                fontSize="sm"
                                                p="20px"
                                                h="20px"
                                                bg="orange.200"
                                            >
                                                View Group
                                            </Button>
                                        </Link>
                                        <Button
                                            m={1}
                                            fontSize="sm"
                                            p="20px"
                                            h="20px"
                                            colorScheme="orange"
                                            onClick={() => handleAlertOpen(index)}
                                        >
                                            Leave Group
                                        </Button>
                                    </Flex>

                                    <AlertDialog
                                        isOpen={alertStates[index]}
                                        // leastDestructiveRef={cancelRef}
                                        onClose={() => handleAlertClose(index)}
                                    >
                                        <AlertDialogOverlay>
                                            <AlertDialogContent>
                                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                    Leave Group
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                    Are you sure you want to leave this group?
                                                </AlertDialogBody>

                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={() => { handleAlertClose(index); onClose(); }}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme='red' onClick={() => handleDelete(_id)} ml={3}>
                                                        Leave
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                </Flex>
                            </Box>
                        ))}
                    </>
                ) :
                    null
                }
            </Box>


            {/* New button to toggle the form */}
            <Button onClick={() => setShowForm(!showForm)} variant="solid" colorScheme="orange" margin="1rem 0">
                {showForm ? 'Hide form' : 'New Group +'}
            </Button>

            {/* Show the form only if showForm is true */}
            {showForm && (
                <Box borderWidth="1px" borderColor="gray.200" bg='orange.100' borderRadius="lg" p="4">
                    <VStack align="stretch">
                        <Heading as="h5" size="md" mb="2">
                            Create a new group for people in your community to join. Groups allow users to post all their items.
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
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="name">
                                    Group Description:
                                </FormLabel>
                                <Textarea
                                    placeholder="What's your group all about? Who's in it?"
                                    name="description"
                                    type="Textarea"
                                    id="libraryDescription"
                                    bg="white"
                                    value={formState.description}
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
                <Divider margin="1rem 0" />
            <Heading>
                Search for Groups to Join
            </Heading>
            <Divider margin="1rem 0" />
            <Box>
                <Heading size="md">
                    Want to join a group with a user?
                </Heading>
                <Button onClick={() => setShowUserSearch(!showUserSearch)} variant="solid" colorScheme="orange" margin="1rem 0">
                    {showUserSearch ? 'Hide User Search' : 'Search Groups by User'}
                </Button>
                {showUserSearch && (
                    <SearchLibraryUser />
                )}

                <Heading size="md">
                    Know the name of the group you want to join?
                </Heading>
                <Button onClick={() => setShowGroupSearch(!showGroupSearch)} variant="solid" colorScheme="orange" margin="1rem 0">
                    {showGroupSearch ? 'Hide Name Search' : 'Search Groups by Name'}
                </Button>
                {showGroupSearch && (
                    <SearchLibraryName />
                )}
            </Box>
        </>
    )
}

export default AddLibrary;